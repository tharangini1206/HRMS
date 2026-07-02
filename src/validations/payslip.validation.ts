import { z } from "zod";

/**
 * Generate Payslip
 */
export const createPayslipSchema = z.object({

  body: z.object({

    employee_id: z.string(),

    month: z.string(),

    year: z.number()

  })

});

/**
 * Get Payslip
 */
export const getPayslipSchema = z.object({

  params: z.object({

    employeeId: z.string()

  })

});

/**
 * Get Payslip By Id
 */
export const getPayslipByIdSchema = z.object({

  params: z.object({

    payslipId: z.string()

  })

});

/**
 * Upload Signed URL
 */
export const uploadPayslipSchema = z.object({

  body: z.object({

    payslipId: z.string(),

    signedUrl: z.string()

  })

});