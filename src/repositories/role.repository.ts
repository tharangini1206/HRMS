import { supabase } from "../config/supabase";

/**
 * Create Role
 */

export const createRoleRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("roles")
      .insert([
        {
          name: body.name,
          description: body.description,
          level: body.level
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
 * Get All Roles
 */

export const getRolesRepository = async () => {

  const { data, error } =
    await supabase
      .from("roles")
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
 * Get Role By ID
 */

export const getRoleByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("roles")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Update Role
 */

export const updateRoleRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("roles")
      .update({
        ...body,
        updated_at: new Date()
      })
      .eq("id", id)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};

/**
 * Delete Role
 */

export const deleteRoleRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("roles")
      .delete()
      .eq("id", id)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;

};