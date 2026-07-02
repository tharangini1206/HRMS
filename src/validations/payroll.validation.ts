import { z } from "zod";

/**
 * Create Payroll Validation
 */

export const createPayrollSchema = z.object({

  user_id: z.string().uuid(),

  annual_ctc: z.number().positive(),

  basic_percentage: z.number().min(0).max(100).optional(),

  hra_percentage: z.number().min(0).max(100).optional(),

  special_allowance: z.number().optional(),

  conveyance: z.number().optional(),

  medical: z.number().optional(),

  pf_employee_percentage: z.number().min(0).max(100).optional(),

  pf_employer_percentage: z.number().min(0).max(100).optional(),

  esi_employee_percentage: z.number().min(0).max(100).optional(),

  esi_employer_percentage: z.number().min(0).max(100).optional(),

  professional_tax_monthly: z.number().optional(),

  gratuity_percentage: z.number().min(0).max(100).optional(),

  bonus_percentage: z.number().min(0).max(100).optional(),

  effective_date: z.string()

});

/**
 * Update Payroll Validation
 */

export const updatePayrollSchema = createPayrollSchema.partial();