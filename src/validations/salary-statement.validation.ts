import { z } from "zod";

/**
 * Employee Salary Statement
 */

export const salaryStatementSchema = z.object({

  userId: z.string().uuid(),

  monthYear: z.string().refine(

    (value) => !isNaN(Date.parse(value)),

    {

      message: "Invalid month_year format"

    }

  )

});

/**
 * Monthly Payroll Summary
 */

export const payrollSummarySchema = z.object({

  monthYear: z.string().refine(

    (value) => !isNaN(Date.parse(value)),

    {

      message: "Invalid month_year format"

    }

  )

});