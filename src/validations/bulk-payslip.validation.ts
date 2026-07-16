import { z } from "zod";

/**
 * Generate Bulk Payslips
 */

export const generateBulkPayslipSchema = z.object({

  month_year: z.string().refine(

    (value) => !isNaN(Date.parse(value)),

    {

      message: "Invalid month_year"

    }

  )

});