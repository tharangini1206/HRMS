import { z } from "zod";

/**
 * ==========================================
 * Create Tax Configuration
 * ==========================================
 */

export const createTaxConfigurationSchema = z.object({

  financial_year: z
    .string()
    .min(1, "Financial year is required"),

  tax_regime: z
    .enum([
      "old",
      "new"
    ]),

  standard_deduction: z
    .number()
    .min(0),

  rebate_87a_limit: z
    .number()
    .min(0),

  rebate_87a_amount: z
    .number()
    .min(0),

  cess_percentage: z
    .number()
    .min(0),

  effective_date: z
    .string(),

  is_active: z
    .boolean()
    .optional()

});

/**
 * ==========================================
 * Update Tax Configuration
 * ==========================================
 */

export const updateTaxConfigurationSchema =
  createTaxConfigurationSchema.partial();



/**
 * ==========================================
 * Create Tax Slab
 * ==========================================
 */

export const createTaxSlabSchema = z.object({

  tax_configuration_id: z
    .number(),

  slab_order: z
    .number()
    .min(1),

  from_amount: z
    .number()
    .min(0),

  to_amount: z
    .number()
    .nullable()
    .optional(),

  tax_percentage: z
    .number()
    .min(0)
    .max(100)

});

/**
 * ==========================================
 * Update Tax Slab
 * ==========================================
 */

export const updateTaxSlabSchema =
  createTaxSlabSchema
    .partial();