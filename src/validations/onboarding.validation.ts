import { z } from "zod";

/**
 * Create Employee Onboarding Validation
 */

export const createOnboardingSchema = z.object({

  /**
   * Existing Employee
   * public.users.public_id
   */

  user_public_id: z
    .string()
    .uuid("Valid User Public ID is required"),

  /**
   * Employment Details
   */

  department_id: z
    .number(),

  role_id: z
    .number(),

  designation_id: z
    .number(),

  manager_id: z
    .string()
    .uuid()
    .optional(),

  hr_manager_id: z
    .string()
    .uuid()
    .optional(),

  hire_date: z
    .string(),

  confirmation_date: z
    .string()
    .optional(),

  resignation_date: z
    .string()
    .optional(),

  last_working_day: z
    .string()
    .optional(),

  employment_type: z.enum([
    "permanent",
    "contract",
    "intern",
    "trainee",
    "consultant"
  ]),

  work_location: z
    .string(),

  shift_start: z
    .string()
    .optional(),

  shift_end: z
    .string()
    .optional(),

  work_days: z
    .string()
    .optional(),

  grace_period_minutes: z
    .number()
    .optional(),

  weekly_working_hours: z
    .number()
    .optional()

});

/**
 * Update Employee Onboarding Validation
 */

export const updateOnboardingSchema =
  createOnboardingSchema
    .omit({
      user_public_id: true
    })
    .partial();