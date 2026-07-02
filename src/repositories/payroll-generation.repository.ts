import { supabase } from "../config/supabase";

/**
 * Get Employee Salary
 */

export const getEmployeeSalaryRepository = async (
  userId: string
) => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Salary Components
 */

export const getSalaryComponentsRepository = async (
  userId: string
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true);

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Check Payroll Already Generated
 */

export const checkPayrollExistsRepository = async (

  userId: string,

  monthYear: string

) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("id")
      .eq("user_id", userId)
      .eq("month_year", monthYear)
      .maybeSingle();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Insert Payroll
 */

export const createPayrollRepository = async (
  body: any
) => {

  console.log("Repository Payload :", body);

  const { data, error } =
    await supabase
      .from("payroll")
      .insert([body])
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get All Payrolls
 */

export const getPayrollGenerationsRepository = async () => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
      .order("created_at", { ascending: false });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};