import { z } from "zod";

/**
 * Create Employee Salary Validation
 */

export const createPayrollSchema = z.object({

  user_id: z
    .string()
    .uuid("Valid user_id is required"),

  annual_ctc: z
    .number()
    .positive("Annual CTC must be greater than zero"),

  variable_pay_percentage: z
    .number()
    .min(0, "Variable Pay cannot be less than 0")
    .max(100, "Variable Pay cannot exceed 100")
    .default(0),

  effective_date: z
    .string()
    .refine(
      (value) => !isNaN(Date.parse(value)),
      {
        message: "Effective Date must be a valid date"
      }
    )

});

/**
 * Update Employee Salary Validation
 */

export const updatePayrollSchema =
  createPayrollSchema.partial();