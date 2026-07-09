import { supabase } from "../config/supabase";

/**
 * Create Statutory Configuration
 */

export const createStatutoryConfigRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("statutory_config")
      .insert([
        {

          config_name:
            body.config_name,

          config_value:
            body.config_value,

          description:
            body.description,

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
 * Get All Statutory Configurations
 */

export const getStatutoryConfigsRepository =
async () => {

  const { data, error } =
    await supabase
      .from("statutory_config")
      .select("*")
      .order("config_name", {

        ascending: true

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Statutory Configuration By Id
 */

export const getStatutoryConfigByIdRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("statutory_config")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Update Statutory Configuration
 */

export const updateStatutoryConfigRepository =
async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("statutory_config")
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
 * Delete Statutory Configuration
 */

export const deleteStatutoryConfigRepository =
async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("statutory_config")
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
 * Get Active Statutory Configuration
 */

export const getActiveStatutoryConfigsRepository =
async () => {

  const { data, error } =
    await supabase
      .from("statutory_config")
      .select("*")
      .eq("is_active", true)
      .order("config_name", {

        ascending: true

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};