import { supabase } from "../config/supabase";

/**
 * Create Employee Onboarding
 */

export const createOnboardingRepository = async (
  body: any
) => {

  /**
   * STEP 1
   * Create Login Account
   */

  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({

      email: body.email,

      password: body.password,

      email_confirm: true

    });

  if (authError) {

    throw new Error(authError.message);

  }

  if (!authData.user) {

    throw new Error("Unable to create auth user");

  }

  /**
   * STEP 2
   * Insert into users table
   */

  const { data: userData, error: userError } =
    await supabase
      .from("users")
      .insert([
        {

          auth_user_id: authData.user.id,

          employee_id: body.employee_id,

          first_name: body.first_name,

          last_name: body.last_name,

          email: body.email,

          phone: body.phone,

          profile_pic_url: body.profile_pic_url,

          date_of_birth: body.date_of_birth,

          gender: body.gender,

          marital_status: body.marital_status,

          current_address: body.current_address,

          permanent_address: body.permanent_address,

          emergency_contact_name:
            body.emergency_contact_name,

          emergency_contact_phone:
            body.emergency_contact_phone,

          emergency_contact_relation:
            body.emergency_contact_relation,

          bank_account_number:
            body.bank_account_number,

          bank_ifsc_code:
            body.bank_ifsc_code,

          pan_number:
            body.pan_number,

          aadhaar_number:
            body.aadhaar_number,

          passport_number:
            body.passport_number,

          status:
            body.status ?? "active"

        }
      ])
      .select()
      .single();

  if (userError) {

    throw new Error(userError.message);

  }

  /**
   * STEP 3
   * Insert into employee_profiles
   */

  const { data: profileData, error: profileError } =
    await supabase
      .from("employee_profiles")
      .insert([
        {

          user_id:
            authData.user.id,

          department_id:
            body.department_id,

          role_id:
            body.role_id,

          designation_id:
            body.designation_id,

          manager_id:
            body.manager_id,

          hr_manager_id:
            body.hr_manager_id,

          hire_date:
            body.hire_date,

          confirmation_date:
            body.confirmation_date,

          resignation_date:
            body.resignation_date,

          last_working_day:
            body.last_working_day,

          employment_type:
            body.employment_type,

          work_location:
            body.work_location,

          shift_start:
            body.shift_start,

          shift_end:
            body.shift_end,

          work_days:
            body.work_days,

          grace_period_minutes:
            body.grace_period_minutes,

          weekly_working_hours:
            body.weekly_working_hours

        }
      ])
      .select()
      .single();

  if (profileError) {

    throw new Error(profileError.message);

  }

  return {

    user: userData,

    profile: profileData

  };

};

/**
 * Get All Employees
 */

export const getOnboardingsRepository = async () => {

  const { data, error } = await supabase
    .from("employee_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Get Employee By Id
 */

export const getOnboardingByIdRepository = async (
  id: string
) => {

  const { data, error } = await supabase
    .from("employee_profiles")
    .select("*")
    .eq("public_id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Update Employee Profile
 */

export const updateOnboardingRepository =
async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("employee_profiles")
      .update({

        ...body,

        updated_at:
          new Date().toISOString()

      })
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Delete Employee Profile
 */

export const deleteOnboardingRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("employee_profiles")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};