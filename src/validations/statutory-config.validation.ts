import { z } from "zod";

/**
 * Create Statutory Configuration Validation
 */

export const createStatutoryConfigSchema = z.object({

  config_name: z.string().min(1, {
    message: "Configuration name is required"
  }),

  config_value: z.number(),

  description: z.string().optional(),

  effective_date: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    {
      message: "Effective Date must be a valid date"
    }
  ),

  is_active: z.boolean().optional()

});

/**
 * Update Statutory Configuration Validation
 */

export const updateStatutoryConfigSchema =
  createStatutoryConfigSchema.partial();