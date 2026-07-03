import { z } from "zod";

/**
 * Generate Payroll Validation
 */

export const generatePayrollSchema = z.object({

  user_id: z.string().uuid(),

  month_year: z.string()

});

/**
 * Mark Payroll Paid Validation
 */

export const markPayrollPaidSchema = z.object({

  payment_id: z.string().min(1)

});