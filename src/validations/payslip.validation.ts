import { z } from "zod";

/**
 * Generate Payslip
 */

export const generatePayslipSchema = z.object({

  payroll_id: z.string().uuid()

});