import { supabase } from "../config/supabase";

/**
 * Create Salary Component
 */

export const createSalaryComponentRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .insert([
        {

          user_id:
            body.user_id,

          component_name:
            body.component_name,

          component_type:
            body.component_type,

          amount:
            body.amount,

          is_percentage:
            body.is_percentage,

          percentage_value:
            body.percentage_value,

          calculation_basis:
            body.calculation_basis,

          effective_date:
            body.effective_date,

          is_active:
            body.is_active ?? true

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
 * Get All Salary Components
 */

export const getSalaryComponentsRepository =
async () => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .select("*");

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Salary Component By Id
 */

export const getSalaryComponentByIdRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Update Salary Component
 */

export const updateSalaryComponentRepository =
async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .update({

        ...body,

        updated_at:
          new Date().toISOString()

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
 * Delete Salary Component
 */

export const deleteSalaryComponentRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Salary Components By User Id
 */

export const getSalaryComponentsByUserRepository =
async (
  userId: string
) => {

  const { data, error } =
    await supabase
      .from("salary_components")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};