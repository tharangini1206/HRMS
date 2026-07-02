import { z } from "zod";

/**
 * Create Designation Validation
 */

export const createDesignationSchema = z.object({

  name: z
    .string()
    .min(2, "Designation name is required"),

  code: z
    .string()
    .min(2, "Designation code is required"),

  description: z
    .string()
    .optional(),

  level: z
    .number()
    .min(1)
    .default(1),

  is_active: z
    .boolean()
    .optional()

});

/**
 * Update Designation Validation
 */

export const updateDesignationSchema = z.object({

  name: z
    .string()
    .min(2)
    .optional(),

  code: z
    .string()
    .min(2)
    .optional(),

  description: z
    .string()
    .optional(),

  level: z
    .number()
    .min(1)
    .optional(),

  is_active: z
    .boolean()
    .optional()

});