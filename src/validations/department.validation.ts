import { z } from "zod";

/**
 * Create Department Validation
 */

export const createDepartmentSchema = z.object({

  name: z
    .string()
    .min(2, "Department name is required"),

  code: z
    .string()
    .min(2, "Department code is required"),

  description: z
    .string()
    .optional(),

  head_user_id: z
    .string()
    .uuid()
    .optional(),

  parent_department_id: z
    .number()
    .optional(),

  location: z
    .string()
    .optional(),

  cost_center_code: z
    .string()
    .optional(),

  is_active: z
    .boolean()
    .optional()

});

/**
 * Update Department Validation
 */

export const updateDepartmentSchema = z.object({

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

  head_user_id: z
    .string()
    .uuid()
    .optional(),

  parent_department_id: z
    .number()
    .optional(),

  location: z
    .string()
    .optional(),

  cost_center_code: z
    .string()
    .optional(),

  is_active: z
    .boolean()
    .optional()

});