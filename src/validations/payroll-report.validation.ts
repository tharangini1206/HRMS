import { z } from "zod";

/**
 * Monthly Payroll Report
 */

export const monthYearQuerySchema = z.object({

  month_year: z.string().refine(

    (value) => !isNaN(Date.parse(value)),

    {

      message: "Invalid month_year"

    }

  )

});