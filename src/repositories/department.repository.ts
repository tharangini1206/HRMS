import { supabase } from "../config/supabase";

/**
 * Create Department
 */

export const createDepartmentRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("departments")
      .insert([
        {
          name: body.name,
          code: body.code,
          description: body.description,
          head_user_id: body.head_user_id,
          parent_department_id: body.parent_department_id,
          location: body.location,
          cost_center_code: body.cost_center_code,
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
 * Get All Departments
 */

export const getDepartmentsRepository = async () => {

  const { data, error } =
    await supabase
      .from("departments")
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
 * Get Department By ID
 */

export const getDepartmentByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("departments")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Update Department
 */

export const updateDepartmentRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("departments")
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
 * Delete Department
 */

export const deleteDepartmentRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("departments")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};