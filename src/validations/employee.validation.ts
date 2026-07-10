import { z } from "zod";

/**
 * Create Employee Validation
 * This module creates:
 * 1. auth.users
 * 2. public.users
 *
 * Employee onboarding data is NOT handled here.
 */

export const createEmployeeSchema = z.object({
  /**
   * Users Table
   */

  employee_id: z
    .string()
    .min(2, "Employee ID is required"),

  first_name: z
    .string()
    .min(2, "First Name is required"),

  last_name: z
    .string()
    .min(1, "Last Name is required"),

  email: z
    .string()
    .email("Valid email is required")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),

  profile_pic_url: z
    .string()
    .optional(),

  date_of_birth: z
    .string()
    .optional(),

  gender: z
    .string()
    .optional(),

  marital_status: z
    .string()
    .optional(),

  current_address: z
    .string()
    .optional(),

  permanent_address: z
    .string()
    .optional(),

  emergency_contact_name: z
    .string()
    .optional(),

  emergency_contact_phone: z
    .string()
    .optional(),

  emergency_contact_relation: z
    .string()
    .optional(),

  bank_account_number: z
    .string()
    .optional(),

  bank_ifsc_code: z
    .string()
    .optional(),

  pan_number: z
    .string()
    .optional(),

  aadhaar_number: z
    .string()
    .optional(),

  passport_number: z
    .string()
    .nullable()
    .optional(),

  status: z
    .enum([
      "active",
      "inactive",
      "suspended"
    ])
    .default("active")
});

/**
 * Update Employee Validation
 * Password cannot be updated here.
 */

export const updateEmployeeSchema = createEmployeeSchema
  .omit({
    password: true
  })
  .partial();