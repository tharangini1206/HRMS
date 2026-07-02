import { z } from "zod";

/**
 * Generate Payroll Validation
 */

export const generatePayrollSchema = z.object({

  user_id: z.string().uuid(),

  month_year: z.string()

});