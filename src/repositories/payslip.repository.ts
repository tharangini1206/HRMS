import { supabase } from "../config/supabase";

/**
 * ==========================================
 * Get Payroll By Public Id
 * ==========================================
 */

export const getPayrollByIdRepository = async (
  payrollId: string
) => {

  const { data, error } =
    await supabase
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
 * ==========================================
 * Check Existing Payslip
 * ==========================================
 */

export const getPayslipRepository = async (
  userId: string,
  monthYear: string
) => {

  const { data, error } =
    await supabase
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
 * ==========================================
 * Create Payslip
 * ==========================================
 */

export const createPayslipRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
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
 * ==========================================
 * Get All Payslips
 * ==========================================
 */

export const getAllPayslipsRepository = async () => {

  const { data, error } =
    await supabase
      .from("payslips")
      .select(`
        *,
        payroll(
          gross_pay,
          net_pay,
          total_earnings,
          total_deductions,
          status,
          month_year
        )
      `)
      .order(
        "generated_at",
        {
          ascending: false
        }
      );

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Get Employee Payslips
 * ==========================================
 */

export const getEmployeePayslipsRepository = async (
  userId: string
) => {

  const { data, error } =
    await supabase
      .from("payslips")
      .select(`
        *,
        payroll(
          gross_pay,
          net_pay,
          total_earnings,
          total_deductions,
          status,
          month_year
        )
      `)
      .eq("user_id", userId)
      .order(
        "generated_at",
        {
          ascending: false
        }
      );

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Get Payslip By Public Id
 * ==========================================
 */

export const getPayslipByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("payslips")
      .select(`
        *,
        payroll(
          gross_pay,
          net_pay,
          total_earnings,
          total_deductions,
          status,
          month_year
        )
      `)
      .eq(
        "public_id",
        id
      )
      .single();

  if (error) {

    throw new Error(
      error.message
    );

  }

  return data;

};

/**
 * ==========================================
 * Delete Payslip
 * ==========================================
 */

export const deletePayslipRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("payslips")
      .delete()
      .eq(
        "public_id",
        id
      )
      .select()
      .single();

  if (error) {

    throw new Error(
      error.message
    );

  }

  return data;

};