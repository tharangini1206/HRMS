import { supabase } from "../config/supabase";

/**
 * Get Payroll By Public Id
 */

export const getPayrollByIdRepository = async (
  payrollId: string
) => {

  const { data, error } = await supabase
    .from("payroll")
    .select("*")
    .eq("public_id", payrollId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Check Payslip Already Exists
 */

export const getPayslipRepository = async (
  userId: string,
  monthYear: string
) => {

  const { data, error } = await supabase
    .from("payslips")
    .select("*")
    .eq("user_id", userId)
    .eq("month_year", monthYear)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Save Payslip
 */

export const createPayslipRepository = async (
  body: any
) => {

  const { data, error } = await supabase
    .from("payslips")
    .insert(body)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};



/**
 * Get Employee Payslips
 */

export const getEmployeePayslipsRepository = async (

  userId: string

) => {

  const { data, error } =
    await supabase
      .from("payslips")
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
 * Get Payslip By Public Id
 */

export const getPayslipByIdRepository = async (

  id: string

) => {

  const { data, error } =
    await supabase
      .from("payslips")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};