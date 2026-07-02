import { z } from "zod";

/**
 * Calculate Settlement
 */
export const calculateSettlementSchema = z.object({

  body: z.object({

    employee_id: z.string(),

    basic_salary: z.number(),

    bonus: z.number().optional(),

    leave_encashment: z.number().optional(),

    deductions: z.number().optional()

  })

});

/**
 * Settlement Details
 */
export const getSettlementSchema = z.object({

  params: z.object({

    employeeId: z.string()

  })

});

/**
 * HR Approval
 */
export const approveSettlementSchema = z.object({

  params: z.object({

    employeeId: z.string()

  })

});