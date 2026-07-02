import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(2, "Role name is required"),

  description: z.string().optional(),

  level: z.number().min(1).default(1)
});

export const updateRoleSchema = z.object({
  name: z.string().min(2).optional(),

  description: z.string().optional(),

  level: z.number().min(1).optional()
});