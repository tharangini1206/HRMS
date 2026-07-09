import { z } from "zod";

/**
 * Create Salary Component Validation
 */

export const createSalaryComponentSchema = z.object({

  user_id: z
    .string()
    .uuid("Valid user id is required"),

  component_name: z
    .string()
    .min(1, "Component name is required"),

  component_type: z.enum([

    "earnings",

    "deductions",

    "tax"

  ]),

  amount: z
    .number()
    .min(0, "Amount cannot be negative"),

  is_percentage: z
    .boolean()
    .default(false),

  percentage_value: z
    .number()
    .min(0)
    .max(100)
    .optional(),

  calculation_basis: z
    .string()
    .optional(),

  effective_date: z
    .string()
    .refine(

      (value) => !isNaN(Date.parse(value)),

      {

        message: "Invalid effective date"

      }

    ),

  is_active: z
    .boolean()
    .optional()

});

/**
 * Update Salary Component Validation
 */

export const updateSalaryComponentSchema =
  createSalaryComponentSchema.partial();