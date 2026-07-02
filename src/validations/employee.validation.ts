import { z } from "zod";

/**
 * Create Employee Validation
 */

export const createEmployeeSchema = z.object({

  employee_id: z
    .string()
    .min(2, "Employee ID is required"),

  first_name: z
    .string()
    .min(2, "First name is required"),

  last_name: z
    .string()
    .min(1, "Last name is required"),

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  phone: z
    .string()
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
    .optional(),

  status: z
    .string()
    .default("active")

});

/**
 * Update Employee Validation
 */

export const updateEmployeeSchema =
  createEmployeeSchema
    .omit({
      password: true
    })
    .partial();