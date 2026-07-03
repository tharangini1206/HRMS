import { supabase } from "../config/supabase";

export const attendanceRepository = {

  async punchIn(userId: string, payload: {
    workMode: string;
    lat: number;
    lng: number;
    deviceId?: string;
    deviceName?: string;
    ipAddress?: string;
  }) {

    const today = new Date().toISOString().split("T")[0];

    /*
    -------------------------------------------------------
    Employee
    -------------------------------------------------------
    */

    const { data: employee, error: employeeError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", userId)
      .single();

    if (employeeError || !employee) {
      throw new Error("Employee not found");
    }

    if (
      employee.status === "terminated" ||
      employee.status === "resigned" ||
      employee.status === "inactive"
    ) {
      throw new Error("Employee is not allowed to punch.");
    }

    /*
    -------------------------------------------------------
    Employee Profile
    -------------------------------------------------------
    */

    const { data: profile, error: profileError } = await supabase
      .from("employee_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profileError || !profile) {
      throw new Error("Employee profile not found.");
    }

    if (!profile.shift_start || !profile.shift_end) {
      throw new Error("Shift is not assigned.");
    }

    /*
    -------------------------------------------------------
    Already Punched
    -------------------------------------------------------
    */

    const { data: openLog } = await supabase
      .from("attendance_logs")
      .select("*")
      .eq("user_id", userId)
      .is("punch_out", null)
      .maybeSingle();

    if (openLog) {
      throw new Error("Already punched in.");
    }

    /*
    -------------------------------------------------------
    Approved Leave
    -------------------------------------------------------
    */

    const { data: leave } = await supabase
      .from("leave_requests")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "approved")
      .lte("start_date", today)
      .gte("end_date", today)
      .maybeSingle();

    if (leave) {
      throw new Error("Employee is on approved leave.");
    }

    /*
    -------------------------------------------------------
    Holiday
    -------------------------------------------------------
    */

    const { data: holiday } = await supabase
      .from("holiday_calendar")
      .select("*")
      .eq("date", today)
      .maybeSingle();

    if (holiday) {
      throw new Error("Today is a holiday.");
    }

    /*
    -------------------------------------------------------
    Weekly Off
    -------------------------------------------------------
    */

    if (profile.work_days) {

      const todayName = new Date().toLocaleDateString("en-US", {
        weekday: "long"
      });

      const workingDays = profile.work_days
        .split(",")
        .map((x: string) => x.trim());

      if (!workingDays.includes(todayName)) {
        throw new Error("Today is weekly off.");
      }
    }

    /*
    -------------------------------------------------------
    Shift Window
    -------------------------------------------------------
    */

    const { data: company } = await supabase
      .from("multi_company_settings")
      .select("*")
      .limit(1)
      .single();

    const earlyBuffer = 30;

    const now = new Date();

    const shiftStart = new Date(`${today}T${profile.shift_start}`);

    const shiftEnd = new Date(`${today}T${profile.shift_end}`);

    shiftStart.setMinutes(
      shiftStart.getMinutes() - earlyBuffer
    );

    if (now < shiftStart) {
      throw new Error("Shift has not started yet.");
    }

    if (now > shiftEnd) {
      throw new Error("Shift already ended.");
    }

    /*
    -------------------------------------------------------
    Work Mode
    -------------------------------------------------------
    */

    const employeeMode =
      (profile.work_location || "WFO").toUpperCase();

    if (
      employeeMode === "WFO" &&
      payload.workMode !== "WFO"
    ) {
      throw new Error(
        "Employee can punch only from office."
      );
    }



    /*
    -------------------------------------------------------
    Office Geofence
    -------------------------------------------------------
    */

    if (payload.workMode === "WFO") {

      const officeLat = 12.9716;
      const officeLng = 77.5946;
      const radius = 500;

      const toRad = (value: number) =>
        value * Math.PI / 180;

      const R = 6371000;

      const dLat = toRad(payload.lat - officeLat);
      const dLng = toRad(payload.lng - officeLng);

      const a =
        Math.sin(dLat / 2) *
          Math.sin(dLat / 2) +
        Math.cos(toRad(officeLat)) *
          Math.cos(toRad(payload.lat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);

      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );

      const distance = R * c;

      if (distance > radius) {
        throw new Error(
          "Outside office geofence."
        );
      }
    }

        /*
    -------------------------------------------------------
    Late Calculation
    -------------------------------------------------------
    */

    const graceMinutes = company?.grace_period_minutes ?? 15;

    const lateLimit = new Date(shiftStart);
    lateLimit.setMinutes(lateLimit.getMinutes() + 30 + graceMinutes);

    const isLate = now > lateLimit;

    const lateMinutes = isLate
      ? Math.floor(
          (now.getTime() - lateLimit.getTime()) / 60000
        )
      : 0;

    /*
    -------------------------------------------------------
    Attendance Log
    -------------------------------------------------------
    */

    const { data: attendanceLog, error: attendanceLogError } =
      await supabase
        .from("attendance_logs")
        .insert({
          user_id: userId,
          punch_in: now.toISOString(),
          punch_in_lat: payload.lat,
          punch_in_lng: payload.lng,
          device_id: payload.deviceId,
          device_name: payload.deviceName,
          ip_address: payload.ipAddress,
          status: "active"
        })
        .select()
        .single();

    if (attendanceLogError) {
      throw new Error(attendanceLogError.message);
    }

    /*
    -------------------------------------------------------
    Daily Attendance
    -------------------------------------------------------
    */

    const { data: attendance, error: attendanceError } =
      await supabase
        .from("attendance")
        .insert({
          user_id: userId,
          date: today,
          punch_in: now.toISOString(),
          work_mode: payload.workMode,
          is_late: isLate,
          late_minutes: lateMinutes,
          status: "present"
        })
        .select()
        .single();

    if (attendanceError) {
      throw new Error(attendanceError.message);
    }

    return {
      attendance,
      attendanceLog
    };
  },

  /*
  =======================================================
  Punch Out
  =======================================================
  */

  async punchOut(
    userId: string,
    payload: {
      lat: number;
      lng: number;
    }
  ) {

    const now = new Date();

    /*
    -------------------------------------------------------
    Open Attendance Log
    -------------------------------------------------------
    */

    const { data: attendanceLog } = await supabase
      .from("attendance_logs")
      .select("*")
      .eq("user_id", userId)
      .is("punch_out", null)
      .single();

    if (!attendanceLog) {
      throw new Error("Punch in not found.");
    }

    /*
    -------------------------------------------------------
    Attendance
    -------------------------------------------------------
    */

    const today = now.toISOString().split("T")[0];

    const { data: attendance } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .eq("date", today)
      .single();

    if (!attendance) {
      throw new Error("Attendance not found.");
    }

    if (attendance.punch_out) {
      throw new Error("Already punched out.");
    }

    /*
    -------------------------------------------------------
    Working Hours
    -------------------------------------------------------
    */

    const punchIn = new Date(attendance.punch_in);

    if (now <= punchIn) {
      throw new Error("Invalid punch out time.");
    }

    const totalHours =
      (now.getTime() - punchIn.getTime()) /
      (1000 * 60 * 60);

    /*
    -------------------------------------------------------
    Overtime
    -------------------------------------------------------
    */

    let overtime = 0;

    if (totalHours > 9) {
      overtime = Number(
        (totalHours - 9).toFixed(2)
      );
    }

    /*
    -------------------------------------------------------
    Early Departure
    -------------------------------------------------------
    */

    const profile = await this.getEmployeeProfile(userId);

    const shiftEnd = new Date(
      `${today}T${profile.shift_end}`
    );

    const isEarlyDeparture = now < shiftEnd;

    const earlyMinutes = isEarlyDeparture
      ? Math.floor(
          (shiftEnd.getTime() - now.getTime()) / 60000
        )
      : 0;

    /*
    -------------------------------------------------------
    Update Attendance Log
    -------------------------------------------------------
    */

    const { error: logError } = await supabase
      .from("attendance_logs")
      .update({
        punch_out: now.toISOString(),
        punch_out_lat: payload.lat,
        punch_out_lng: payload.lng
      })
      .eq("id", attendanceLog.id);

    if (logError) {
      throw new Error(logError.message);
    }

    /*
    -------------------------------------------------------
    Update Attendance
    -------------------------------------------------------
    */

    const { data: updatedAttendance, error: attendanceError } =
      await supabase
        .from("attendance")
        .update({
          punch_out: now.toISOString(),
          overtime_hours: overtime,
          is_early_departure: isEarlyDeparture,
          early_departure_minutes: earlyMinutes
        })
        .eq("id", attendance.id)
        .select()
        .single();

    if (attendanceError) {
      throw new Error(attendanceError.message);
    }

    return updatedAttendance;
  },

    /*
  =======================================================
  Apply Regularization
  =======================================================
  */

  async applyRegularization(
    userId: string,
    payload: {
      targetDate: string;
      anomalyType: string;
      managerNote: string;
      correctedPunchIn?: string;
      correctedPunchOut?: string;
      requestedWorkMode?: string;
    }
  ) {

    const today = new Date().toISOString().split("T")[0];

    if (payload.targetDate > today) {
      throw new Error("Future date cannot be regularized.");
    }

    /*
    -------------------------------------------------------
    Attendance Exists
    -------------------------------------------------------
    */

    const { data: attendance } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .eq("date", payload.targetDate)
      .maybeSingle();

    if (!attendance) {
      throw new Error("Attendance not found.");
    }

    /*
    -------------------------------------------------------
    Already Pending Request
    -------------------------------------------------------
    */

    const { data: existing } = await supabase
      .from("regularization_requests")
      .select("id")
      .eq("user_id", userId)
      .eq("date", payload.targetDate)
      .eq("status", "pending")
      .maybeSingle();

    if (existing) {
      throw new Error(
        "Regularization request already pending."
      );
    }

    /*
    -------------------------------------------------------
    Maximum 7 Days
    -------------------------------------------------------
    */

    const target = new Date(payload.targetDate);

    const diffDays = Math.floor(
      (new Date().getTime() - target.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (diffDays > 7) {
      throw new Error(
        "Regularization allowed only within 7 days."
      );
    }

    /*
    -------------------------------------------------------
    Attendance Log
    -------------------------------------------------------
    */

    const { data: log } = await supabase
      .from("attendance_logs")
      .select("id")
      .eq("user_id", userId)
      .gte(
        "punch_in",
        `${payload.targetDate}T00:00:00`
      )
      .lte(
        "punch_in",
        `${payload.targetDate}T23:59:59`
      )
      .maybeSingle();

    /*
    -------------------------------------------------------
    Create Request
    -------------------------------------------------------
    */

    const { data, error } = await supabase
      .from("regularization_requests")
      .insert({
        user_id: userId,
        attendance_log_id: log?.id ?? null,
        date: payload.targetDate,
        punch_in: payload.correctedPunchIn,
        punch_out: payload.correctedPunchOut,
        reason: payload.managerNote,
        requested_work_mode:
          payload.requestedWorkMode,
        current_work_mode:
          attendance.work_mode,
        status: "pending"
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /*
  =======================================================
  My Regularizations
  =======================================================
  */

  async getMyRegularizations(userId: string) {

    const { data, error } = await supabase
      .from("regularization_requests")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /*
  =======================================================
  Attendance History
  =======================================================
  */

  async getAttendanceHistory(
    userId: string,
    page = 1,
    limit = 20
  ) {

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } =
      await supabase
        .from("attendance")
        .select("*", {
          count: "exact"
        })
        .eq("user_id", userId)
        .order("date", {
          ascending: false
        })
        .range(from, to);

    if (error) {
      throw new Error(error.message);
    }

    return {
      total: count,
      page,
      limit,
      data
    };
  },

  /*
  =======================================================
  Attendance By Date
  =======================================================
  */

  async getAttendanceByDate(
    userId: string,
    date: string
  ) {

    const { data, error } =
      await supabase
        .from("attendance")
        .select("*")
        .eq("user_id", userId)
        .eq("date", date)
        .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /*
  =======================================================
  Monthly Attendance
  =======================================================
  */

  async getMonthlyAttendance(
    userId: string,
    month: number,
    year: number
  ) {

    const startDate =
      `${year}-${String(month).padStart(2, "0")}-01`;

    const endDate = new Date(
      year,
      month,
      0
    )
      .toISOString()
      .split("T")[0];

    const { data, error } =
      await supabase
        .from("attendance")
        .select("*")
        .eq("user_id", userId)
        .gte("date", startDate)
        .lte("date", endDate)
        .order("date");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  /*
-------------------------------------------------------
Attendance Calendar
-------------------------------------------------------
*/

async getAttendanceCalendar(
  userId: string,
  month: number,
  year: number
) {

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

  const endDate = new Date(year, month, 0)
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("attendance")
    .select("date,status,work_mode,is_late")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date");

  if (error) {
    throw new Error(error.message);
  }

  return data;
},

/*
-------------------------------------------------------
Attendance Statistics
-------------------------------------------------------
*/

async getAttendanceStatistics(
  userId: string,
  month: number,
  year: number
) {

  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

  const endDate = new Date(year, month, 0)
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate);

  if (error) {
    throw new Error(error.message);
  }

  return data;
},

/*
-------------------------------------------------------
Attendance Dashboard
-------------------------------------------------------
*/

async getAttendanceDashboard(userId: string) {

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
},

/*
-------------------------------------------------------
Shift Details
-------------------------------------------------------
*/

async getShiftDetails(userId: string) {

  const { data, error } = await supabase
    .from("employee_profiles")
    .select("shift_start,shift_end,work_location")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
},

/*
-------------------------------------------------------
Employee Profile
-------------------------------------------------------
*/

async getEmployeeProfile(userId: string) {

  const { data, error } = await supabase
    .from("employee_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
},

/*
-------------------------------------------------------
Pending Regularizations
-------------------------------------------------------
*/

async getPendingRegularizations() {

  const { data, error } = await supabase
    .from("regularization_requests")
    .select(`
      id,
      public_id,
      date,
      punch_in,
      punch_out,
      reason,
      requested_work_mode,
      current_work_mode,
      status,
      created_at,
      users:user_id (
        first_name,
        last_name,
        employee_id,
        email
      )
    `)
    .eq("status", "pending")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    throw error;
  }

  return data;

},

/*
-------------------------------------------------------
Approve / Reject Regularization
-------------------------------------------------------
*/

async updateRegularization(
  regularizationId: string,
  payload: {
    status: "approved" | "rejected";
    reason?: string;
    validatedHours?: number;
  }
) {

  const {

    data: regularization,

    error: regularizationError

  } = await supabase
    .from("regularization_requests")
    .select("*")
    .eq("public_id", regularizationId)
    .single();

  if (regularizationError) {
    throw regularizationError;
  }

  if (!regularization) {
    throw new Error(
      "Regularization request not found."
    );
  }

  const updatePayload: any = {

    status: payload.status,

    approval_date: new Date().toISOString()

  };

  if (payload.status === "rejected") {

    updatePayload.rejection_reason =
      payload.reason || null;

  }

  const {

    data,

    error

  } = await supabase
    .from("regularization_requests")
    .update(updatePayload)
    .eq("public_id", regularizationId)
    .select()
    .single();

  if (error) {

    throw error;

  }

  /*
  -----------------------------------------
  Update Attendance if Approved
  -----------------------------------------
  */

  if (payload.status === "approved") {

    await supabase
      .from("attendance")
      .update({

        is_regularized: true,

        regularization_reason:
          regularization.reason,

        regularized_at:
          new Date().toISOString()

      })
      .eq(
        "user_id",
        regularization.user_id
      )
      .eq(
        "date",
        regularization.date
      );

  }

  return data;

},

/*
-------------------------------------------------------
Team Attendance
-------------------------------------------------------
*/

async getTeamAttendance(
  managerId: string
) {

  const {

    data: employees,

    error: employeeError

  } = await supabase
    .from("employee_profiles")
    .select(`
      user_id,
      users!inner(
        employee_id,
        first_name,
        last_name,
        email
      )
    `)
    .eq("manager_id", managerId);

  if (employeeError) {

    throw employeeError;

  }

  if (!employees?.length) {

    return [];

  }

  const userIds = employees.map(
    (item: any) => item.user_id
  );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const {

    data: attendance,

    error: attendanceError

  } = await supabase
    .from("attendance")
    .select("*")
    .in("user_id", userIds)
    .eq("date", today);

  if (attendanceError) {

    throw attendanceError;

  }

  return employees.map((employee: any) => {

    const attendanceRecord = attendance?.find(
      (record: any) =>
        record.user_id === employee.user_id
    );

    return {

      employeeId:
        employee.users.employee_id,

      firstName:
        employee.users.first_name,

      lastName:
        employee.users.last_name,

      email:
        employee.users.email,

      attendance:
        attendanceRecord || null

    };

  });

},

/*
-------------------------------------------------------
Team Work Modes
-------------------------------------------------------
*/

async getTeamWorkModes(
  managerId: string,
  date?: string
) {

  const targetDate =
    date ||
    new Date()
      .toISOString()
      .split("T")[0];

  const {

    data: employees,

    error: employeeError

  } = await supabase
    .from("employee_profiles")
    .select("user_id")
    .eq("manager_id", managerId);

  if (employeeError) {

    throw employeeError;

  }

  if (!employees?.length) {

    return [];

  }

  const userIds = employees.map(
    (item: any) => item.user_id
  );

  const {

    data,

    error

  } = await supabase
    .from("attendance")
    .select(`
      work_mode,
      status,
      punch_in,
      punch_out,
      users:user_id(
        employee_id,
        first_name,
        last_name
      )
    `)
    .in("user_id", userIds)
    .eq("date", targetDate)
    .order("punch_in", {
      ascending: true
    });

  if (error) {

    throw error;

  }

  return data;

},

/*
-------------------------------------------------------
Attendance Flags
-------------------------------------------------------
*/

async getAttendanceFlags(
  managerId: string
) {

  const {

    data: employees,

    error: employeeError

  } = await supabase
    .from("employee_profiles")
    .select("user_id")
    .eq("manager_id", managerId);

  if (employeeError) {

    throw employeeError;

  }

  if (!employees?.length) {

    return [];

  }

  const userIds = employees.map(
    (item: any) => item.user_id
  );

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const {

    data,

    error

  } = await supabase
    .from("attendance")
    .select(`
      public_id,
      date,
      status,
      is_late,
      late_minutes,
      is_early_departure,
      early_departure_minutes,
      is_regularized,
      users:user_id(
        employee_id,
        first_name,
        last_name
      )
    `)
    .in("user_id", userIds)
    .eq("date", today);

  if (error) {

    throw error;

  }

  return data.filter((record: any) =>

    record.is_late ||
    record.is_early_departure ||
    !record.is_regularized

  );

},

/*
-------------------------------------------------------
Approve / Reject Overtime
-------------------------------------------------------
*/

async updateOvertime(
  attendanceId: string,
  payload: {
    status: "approved" | "rejected";
    verifiedHours?: number;
  }
) {

  const {

    data: attendance,

    error: attendanceError

  } = await supabase
    .from("attendance")
    .select("*")
    .eq("public_id", attendanceId)
    .single();

  if (attendanceError) {

    throw attendanceError;

  }

  if (!attendance) {

    throw new Error(
      "Attendance record not found."
    );

  }

  const updatePayload: any = {

    overtime_approved:
      payload.status === "approved",

    overtime_approved_at:
      new Date().toISOString()

  };

  if (
    payload.status === "approved" &&
    payload.verifiedHours !== undefined
  ) {

    updatePayload.overtime_hours =
      payload.verifiedHours;

  }

  const {

    data,

    error

  } = await supabase
    .from("attendance")
    .update(updatePayload)
    .eq("public_id", attendanceId)
    .select()
    .single();

  if (error) {

    throw error;

  }

  return data;

},

/*
-------------------------------------------------------
Holiday Calendar
-------------------------------------------------------
*/

async createHoliday(
  payload: {
    holiday_name: string;
    holiday_date: string;
    description?: string;
    is_optional?: boolean;
  }
) {

  const { data, error } = await supabase
    .from("holidays")
    .insert({
      holiday_name: payload.holiday_name,
      holiday_date: payload.holiday_date,
      description: payload.description ?? null,
      is_optional: payload.is_optional ?? false
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;

},

async updateAttendanceConfig(
  payload: any
) {

  const { data, error } = await supabase
    .from("attendance_settings")
    .update(payload)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;

},
/*
-------------------------------------------------------
Timesheet Log
-------------------------------------------------------
*/

async logTimesheet(
  userId: string,
  payload: {
    projectAllocations: {
      projectId: string;
      hoursLogged: number;
    }[];
  }
) {

  const records = payload.projectAllocations.map(project => ({
    user_id: userId,
    project_id: project.projectId,
    hours_logged: project.hoursLogged,
    work_date: new Date().toISOString().split("T")[0]
  }));

  const { data, error } = await supabase
    .from("timesheet_logs")
    .insert(records)
    .select();

  if (error) {
    throw error;
  }

  return data;

},

/*
-------------------------------------------------------
Payroll Attendance
-------------------------------------------------------
*/

async getPayrollAttendance(
  userId: string,
  month: number,
  year: number
) {

  const startDate =
    `${year}-${String(month).padStart(2, "0")}-01`;

  const endDate = new Date(
    year,
    month,
    0
  )
    .toISOString()
    .split("T")[0];

  const { data, error } =
    await supabase
      .from("attendance")
      .select("status")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate);

  if (error) {
    throw new Error(error.message);
  }

  const workingDays = data.length;

  const presentDays =
    data.filter(
      (x: any) =>
        x.status === "present"
    ).length;

  const absentDays =
    data.filter(
      (x: any) =>
        x.status === "absent"
    ).length;

  const halfDays =
    data.filter(
      (x: any) =>
        x.status === "half_day"
    ).length;

  return {

    workingDays,

    presentDays,

    absentDays,

    halfDays

  };

}
}