import { supabase } from "../config/supabase";

/**
 * Get Employee Payslip
 */
export const getPayslipRepository = async (
  employeeId: string
) => {

  return await supabase
    .from("payslips")
    .select("*")
    .eq("employee_id", employeeId)
    .order("created_at", { ascending: false });

};

/**
 * Get Payslip By Id
 */
export const getPayslipByIdRepository = async (
  payslipId: string
) => {

  return await supabase
    .from("payslips")
    .select("*")
    .eq("id", payslipId)
    .single();

};

/**
 * Save Payslip
 */
export const createPayslipRepository = async (
  body: any
) => {

  return await supabase
    .from("payslips")
    .insert([body])
    .select();

};

/**
 * Update Storage URL
 */
export const updatePayslipUrlRepository = async (

  payslipId: string,

  signedUrl: string

) => {

  return await supabase
    .from("payslips")
    .update({

      signed_url: signedUrl

    })
    .eq("id", payslipId)
    .select();

};