import { supabase } from "../config/supabase";

/**
 * Get Paid Payrolls By Month
 */

export const getPaidPayrollsRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
      .eq("month_year", monthYear)
      .eq("status", "paid");

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Check Payslip Exists
 */

export const getExistingPayslipRepository = async (

  userId: string,

  monthYear: string

) => {

  const { data, error } =
    await supabase
      .from("payslips")
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
 * Create Bulk Payslip History
 */

export const createBulkPayslipRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("bulk_payslips")
      .insert([body])
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Update Bulk Payslip Status
 */

export const updateBulkPayslipRepository = async (

  id: string,

  body: any

) => {

  const { data, error } =
    await supabase
      .from("bulk_payslips")
      .update(body)
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get All Bulk Payslips
 */

export const getBulkPayslipsRepository = async () => {

  const { data, error } =
    await supabase
      .from("bulk_payslips")
      .select("*")
      .order("created_at", {

        ascending: false

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Bulk Payslip By Id
 */

export const getBulkPayslipByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("bulk_payslips")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Delete Bulk Payslip
 */

export const deleteBulkPayslipRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("bulk_payslips")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};