import { z } from "zod";

/**
 * Create Resignation
 */
export const createResignationSchema = z.object({

  body: z.object({

    employee_id: z.string(),

    resignation_date: z.string(),

    reason: z.string().min(5)

  })

});

/**
 * Manager Approval
 */
export const managerApprovalSchema = z.object({

  params: z.object({

    id: z.string()

  }),

  body: z.object({

    remarks: z.string().optional()

  })

});

/**
 * HR Approval
 */
export const hrApprovalSchema = z.object({

  params: z.object({

    id: z.string()

  }),

  body: z.object({

    remarks: z.string().optional()

  })

});

/**
 * Cancel Resignation
 */
export const cancelResignationSchema = z.object({

  params: z.object({

    id: z.string()

  })

});

/**
 * Notice Period
 */
export const noticePeriodSchema = z.object({

  body: z.object({

    resignation_date: z.string(),

    notice_days: z.number()

  })

});