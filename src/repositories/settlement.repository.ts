import { supabase } from "../config/supabase";

/**
 * Calculate Settlement
 */
export const calculateSettlementRepository = async (
  body: any
) => {

  return await supabase
    .from("settlements")
    .insert([body])
    .select();

};

/**
 * Settlement Details
 */
export const getSettlementRepository = async (
  employeeId: string
) => {

  return await supabase
    .from("settlements")
    .select("*")
    .eq("employee_id", employeeId)
    .single();

};

/**
 * HR Approval
 */
export const approveSettlementRepository = async (
  employeeId: string
) => {

  return await supabase
    .from("settlements")
    .update({
      status: "Approved"
    })
    .eq("employee_id", employeeId)
    .select();

};