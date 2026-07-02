import { supabase } from "../config/supabase";

/**
 * Create Resignation
 */
export const createResignationRepository = async (
  body: any
) => {

  return await supabase
    .from("resignations")
    .insert([body])
    .select();

};

/**
 * Get All Resignations
 */
export const getAllResignationsRepository = async () => {

  return await supabase
    .from("resignations")
    .select("*");

};

/**
 * Get Resignation By Id
 */
export const getResignationByIdRepository = async (
  id: string
) => {

  return await supabase
    .from("resignations")
    .select("*")
    .eq("id", id)
    .single();

};

/**
 * Manager Approval
 */
export const managerApprovalRepository = async (
  id: string,
  body: any
) => {

  return await supabase
    .from("resignations")
    .update(body)
    .eq("id", id)
    .select();

};

/**
 * HR Approval
 */
export const hrApprovalRepository = async (
  id: string,
  body: any
) => {

  return await supabase
    .from("resignations")
    .update(body)
    .eq("id", id)
    .select();

};

/**
 * Cancel Resignation
 */
export const cancelResignationRepository = async (
  id: string
) => {

  return await supabase
    .from("resignations")
    .update({
      status: "Cancelled"
    })
    .eq("id", id)
    .select();

};