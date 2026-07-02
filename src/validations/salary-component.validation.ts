import { z } from "zod";

/**
 * Create Salary Component Validation
 */

export const createSalaryComponentSchema = z.object({

  user_id: z.string().uuid(),

  component_name: z.string().min(1),

  component_type: z.enum([
    "earnings",
    "deductions",
    "statutory"
  ]),

  amount: z.number().nonnegative(),

  is_percentage: z.boolean().optional(),

  percentage_value: z.number().nullable().optional(),

  calculation_basis: z.string().optional(),

  effective_date: z.string(),

  is_active: z.boolean().optional()

});

/**
 * Update Salary Component Validation
 */

export const updateSalaryComponentSchema =
  createSalaryComponentSchema.partial();