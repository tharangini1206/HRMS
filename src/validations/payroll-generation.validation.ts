import { z } from "zod";

/**
 * Generate Payroll Validation
 */

export const generatePayrollSchema = z.object({

  user_id: z.string().uuid({

    message: "Valid user_id is required"

  }),

  month_year: z.string().refine(

    (value) => !isNaN(Date.parse(value)),

    {

      message: "Invalid month_year"

    }

  )

});

/**
 * Mark Payroll Paid Validation
 */

export const markPayrollPaidSchema = z.object({

  payment_id: z.string().min(

    1,

    {

      message: "Payment ID is required"

    }

  )

});