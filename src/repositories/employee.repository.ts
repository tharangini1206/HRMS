import { supabase } from "../config/supabase";

/**
 * Create Employee
 */
export const createEmployeeRepository = async (
  body: any
) => {

  /**
   * Step 1
   * Create user in Supabase Authentication
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
    throw new Error("Failed to create auth user");
  }

  /**
   * Step 2
   * Insert into public.users
   */

  const { data, error } =
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

          emergency_contact_name: body.emergency_contact_name,

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

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Get All Employees
 */

export const getEmployeesRepository = async () => {

  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", {
        ascending: false
      });

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Get Employee By Id
 */

export const getEmployeeByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .eq("public_id", id)
      .is("deleted_at", null)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Update Employee
 */

export const updateEmployeeRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("users")
      .update({
        ...body,
        updated_at: new Date().toISOString()
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
 * Soft Delete Employee
 */

export const deleteEmployeeRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("users")
      .update({

        deleted_at:
          new Date().toISOString(),

        status:
          "inactive"

      })
      .eq("public_id", id)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};