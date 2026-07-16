import { supabase } from "../config/supabase";

/**
 * ==========================================
 * Create Tax Configuration
 * ==========================================
 */

export const createTaxConfigurationRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("tax_configuration")
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
 * Get All Tax Configurations
 * ==========================================
 */

export const getTaxConfigurationsRepository = async () => {

  const { data, error } =
    await supabase
      .from("tax_configuration")
      .select("*")
      .order(
        "created_at",
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
 * Get Tax Configuration By Public Id
 * ==========================================
 */

export const getTaxConfigurationByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("tax_configuration")
      .select("*")
      .eq(
        "public_id",
        id
      )
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Update Tax Configuration
 * ==========================================
 */

export const updateTaxConfigurationRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("tax_configuration")
      .update(body)
      .eq(
        "public_id",
        id
      )
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Delete Tax Configuration
 * ==========================================
 */

export const deleteTaxConfigurationRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("tax_configuration")
      .delete()
      .eq(
        "public_id",
        id
      )
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Get Active Tax Configuration
 * ==========================================
 */

export const getActiveTaxConfigurationRepository = async (
  financialYear: string,
  taxRegime: string
) => {

  const { data, error } =
    await supabase
      .from("tax_configuration")
      .select("*")
      .eq(
        "financial_year",
        financialYear
      )
      .eq(
        "tax_regime",
        taxRegime
      )
      .eq(
        "is_active",
        true
      )
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Create Tax Slab
 * ==========================================
 */

export const createTaxSlabRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("tax_slabs")
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
 * Get All Tax Slabs
 * ==========================================
 */

export const getTaxSlabsRepository = async () => {

  const { data, error } =
    await supabase
      .from("tax_slabs")
      .select(`
        *,
        tax_configuration(
          public_id,
          financial_year,
          tax_regime
        )
      `)
      .order(
        "slab_order",
        {
          ascending: true
        }
      );

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Get Tax Slab By Public Id
 * ==========================================
 */

export const getTaxSlabByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("tax_slabs")
      .select(`
        *,
        tax_configuration(
          public_id,
          financial_year,
          tax_regime
        )
      `)
      .eq(
        "public_id",
        id
      )
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Update Tax Slab
 * ==========================================
 */

export const updateTaxSlabRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("tax_slabs")
      .update(body)
      .eq(
        "public_id",
        id
      )
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * ==========================================
 * Delete Tax Slab
 * ==========================================
 */

export const deleteTaxSlabRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("tax_slabs")
      .delete()
      .eq(
        "public_id",
        id
      )
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

export const getTaxSlabsByConfigurationRepository = async (
  taxConfigurationId: number
) => {

  const { data, error } =
    await supabase
      .from("tax_slabs")
      .select("*")
      .eq(
        "tax_configuration_id",
        taxConfigurationId
      )
      .order("slab_order", {
        ascending: true
      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};