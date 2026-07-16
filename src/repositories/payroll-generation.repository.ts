import { supabase } from "../config/supabase";
import { attendanceRepository } from "./attendance.repository";

/**
 * Get Active Employee Salary
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
 * Get Active Statutory Configurations
 */

export const getStatutoryConfigRepository =
async () => {

  const { data, error } =
    await supabase
      .from("statutory_config")
      .select("*")
      .eq("is_active", true);

  if (error) {

    throw new Error(error.message);

  }

  const config: any = {};

  data.forEach((item: any) => {

    config[item.config_name] =
      Number(item.config_value);

  });

  return config;

};

/**
 * Get Active Salary Components
 */

export const getSalaryComponentsRepository =
async (
  userId: string,
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .lte("effective_date", monthYear);

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Check Payroll Exists
 */

export const checkPayrollExistsRepository =
async (

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

export const createPayrollRepository =
async (
  body: any
) => {

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
 * Get Attendance Summary
 */

export const getPayrollAttendanceRepository =
async (

  userId: string,

  month: number,

  year: number

) => {

  return await attendanceRepository.getPayrollAttendance(

    userId,

    month,

    year

  );

};

/**
 * Get All Payrolls
 */

export const getPayrollGenerationsRepository =
async () => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
      .order("month_year", {

        ascending: false

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Payroll By Id
 */

export const getPayrollGenerationByIdRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Payrolls By User
 */

export const getPayrollGenerationsByUserRepository =
async (
  userId: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
      .eq("user_id", userId)
      .order("month_year", {

        ascending: false

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Mark Payroll Paid
 */

export const markPayrollPaidRepository =
async (

  id: string,

  paymentId: string

) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .update({

        status: "paid",

        is_paid: true,

        payment_id: paymentId,

        paid_at: new Date().toISOString(),

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
 * Approve / Reject Payroll
 */

export const updatePayrollStatusRepository = async (

  id: string,

  status: "approved" | "failed"

) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .update({

        status,

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
 * Delete Payroll
 */

export const deletePayrollGenerationRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};