import { z } from "zod";



export const generatePayslipSchema = z.object({

  payrollId: z
    .string()
    .uuid("Valid Payroll ID is required")

});