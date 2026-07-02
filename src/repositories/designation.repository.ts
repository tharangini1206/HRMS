import { supabase } from "../config/supabase";

/**
 * Create Designation
 */

export const createDesignationRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("designations")
      .insert([
        {
          name: body.name,
          code: body.code,
          description: body.description,
          level: body.level,
          is_active: body.is_active
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
 * Get All Designations
 */

export const getDesignationsRepository = async () => {

  const { data, error } =
    await supabase
      .from("designations")
      .select("*")
      .order("level", {
        ascending: true
      });

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Get Designation By ID
 */

export const getDesignationByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("designations")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Update Designation
 */

export const updateDesignationRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("designations")
      .update({
        ...body,
        updated_at: new Date()
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
 * Delete Designation
 */

export const deleteDesignationRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("designations")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};