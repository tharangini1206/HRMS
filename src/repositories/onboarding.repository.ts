import { supabase } from "../config/supabase";

/**
 * Create Employee Onboarding
 */

export const createOnboardingRepository = async (
  body: any
) => {

  /**
   * STEP 1
   * Find Employee
   */

  const {
    data: user,
    error: userError
  } = await supabase
    .from("users")
    .select("auth_user_id")
    .eq("public_id", body.user_public_id)
    .is("deleted_at", null)
    .single();

  if (userError) {
    throw new Error("Employee not found.");
  }

  /**
   * STEP 2
   * Check Existing Onboarding
   */

  const {
    data: existingProfile
  } = await supabase
    .from("employee_profiles")
    .select("id")
    .eq("user_id", user.auth_user_id)
    .maybeSingle();

  if (existingProfile) {
    throw new Error("Employee onboarding already completed.");
  }

  /**
   * STEP 3
   * Create Employee Profile
   */

  const {
    data,
    error
  } = await supabase
    .from("employee_profiles")
    .insert({

      user_id: user.auth_user_id,

      department_id: body.department_id,

      role_id: body.role_id,

      designation_id: body.designation_id,

      manager_id: body.manager_id,

      hr_manager_id: body.hr_manager_id,

      hire_date: body.hire_date,

      confirmation_date: body.confirmation_date,

      resignation_date: body.resignation_date,

      last_working_day: body.last_working_day,

      employment_type: body.employment_type,

      work_location: body.work_location,

      shift_start: body.shift_start,

      shift_end: body.shift_end,

      work_days: body.work_days,

      grace_period_minutes:
        body.grace_period_minutes,

      weekly_working_hours:
        body.weekly_working_hours

    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Get All Employee Onboardings
 */

export const getOnboardingsRepository = async () => {

  const { data: profiles, error } = await supabase
    .from("employee_profiles")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    throw new Error(error.message);
  }

  const result = [];

  for (const profile of profiles ?? []) {

    const { data: user } = await supabase
      .from("users")
      .select(`
        public_id,
        employee_id,
        first_name,
        last_name,
        email,
        phone,
        status
      `)
      .eq("auth_user_id", profile.user_id)
      .single();

    result.push({
      ...profile,
      user
    });

  }

  return result;

};

/**
 * Get Employee Onboarding By Profile Public ID
 */

export const getOnboardingByIdRepository = async (
  id: string
) => {

  const { data: profile, error } = await supabase
    .from("employee_profiles")
    .select("*")
    .eq("public_id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { data: user } = await supabase
    .from("users")
    .select(`
      public_id,
      employee_id,
      first_name,
      last_name,
      email,
      phone,
      status
    `)
    .eq("auth_user_id", profile.user_id)
    .single();

  return {
    ...profile,
    user
  };

};

/**
 * Update Employee Onboarding
 */

export const updateOnboardingRepository = async (
  id: string,
  body: any
) => {

  const {
    data,
    error
  } = await supabase
    .from("employee_profiles")
    .update({

      department_id: body.department_id,

      role_id: body.role_id,

      designation_id: body.designation_id,

      manager_id: body.manager_id,

      hr_manager_id: body.hr_manager_id,

      hire_date: body.hire_date,

      confirmation_date: body.confirmation_date,

      resignation_date: body.resignation_date,

      last_working_day: body.last_working_day,

      employment_type: body.employment_type,

      work_location: body.work_location,

      shift_start: body.shift_start,

      shift_end: body.shift_end,

      work_days: body.work_days,

      grace_period_minutes:
        body.grace_period_minutes,

      weekly_working_hours:
        body.weekly_working_hours,

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
 * Delete Employee Onboarding
 */

export const deleteOnboardingRepository = async (
  id: string
) => {

  const {
    data,
    error
  } = await supabase
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