import { z } from "zod";

/**
 * Generate Payroll Ledger Validation
 */

export const generatePayrollLedgerSchema = z.object({

  user_id: z.string().uuid(),

  date: z.string()

});