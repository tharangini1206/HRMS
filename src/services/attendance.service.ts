import { attendanceRepository } from "../repositories/attendance.repository";

export const attendanceService = {

  /*
  -------------------------------------------------------
  Punch In
  -------------------------------------------------------
  */

  async punchIn(
    userId: string,
    payload: {
      workMode: string;
      lat: number;
      lng: number;
      deviceId?: string;
      deviceName?: string;
      ipAddress?: string;
    }
  ) {
    return await attendanceRepository.punchIn(userId, payload);
  },

  /*
  -------------------------------------------------------
  Punch Out
  -------------------------------------------------------
  */

  async punchOut(
    userId: string,
    payload: {
      lat: number;
      lng: number;
    }
  ) {
    return await attendanceRepository.punchOut(userId, payload);
  },

  /*
  -------------------------------------------------------
  Apply Regularization
  -------------------------------------------------------
  */

  async applyRegularization(
    userId: string,
    payload: any
  ) {
    return await attendanceRepository.applyRegularization(
      userId,
      payload
    );
  },

  /*
  -------------------------------------------------------
  My Regularizations
  -------------------------------------------------------
  */

  async getMyRegularizations(
    userId: string
  ) {
    return await attendanceRepository.getMyRegularizations(
      userId
    );
  },

  /*
  -------------------------------------------------------
  Attendance History
  -------------------------------------------------------
  */

  async getAttendanceHistory(
    userId: string,
    page: number,
    limit: number
  ) {
    return await attendanceRepository.getAttendanceHistory(
      userId,
      page,
      limit
    );
  },

  /*
  -------------------------------------------------------
  Attendance By Date
  -------------------------------------------------------
  */

  async getAttendanceByDate(
    userId: string,
    date: string
  ) {
    return await attendanceRepository.getAttendanceByDate(
      userId,
      date
    );
  },

  /*
  -------------------------------------------------------
  Monthly Attendance
  -------------------------------------------------------
  */

  async getMonthlyAttendance(
    userId: string,
    month: number,
    year: number
  ) {
    return await attendanceRepository.getMonthlyAttendance(
      userId,
      month,
      year
    );
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
    return await attendanceRepository.getAttendanceCalendar(
      userId,
      month,
      year
    );
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
    return await attendanceRepository.getAttendanceStatistics(
      userId,
      month,
      year
    );
  },

  /*
  -------------------------------------------------------
  Attendance Dashboard
  -------------------------------------------------------
  */

  async getAttendanceDashboard(
    userId: string
  ) {
    return await attendanceRepository.getAttendanceDashboard(
      userId
    );
  },

  /*
  -------------------------------------------------------
  Shift Details
  -------------------------------------------------------
  */

  async getShiftDetails(
    userId: string
  ) {
    return await attendanceRepository.getShiftDetails(
      userId
    );
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

  return await attendanceRepository.logTimesheet(
    userId,
    payload
  );

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

  return await attendanceRepository.getPayrollAttendance(
    userId,
    month,
    year
  );

}
};