import express from "express";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../../controllers/employee.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  createEmployeeSchema,
  updateEmployeeSchema
} from "../../validations/employee.validation";

const router = express.Router();

/**
 * ==========================================
 * Employee Management
 * ==========================================
 *
 * Responsible for:
 * - auth.users
 * - public.users
 *
 * Does NOT manage employee_profiles.
 * Employee onboarding is handled in a
 * separate module.
 */

/**
 * Get All Employees
 */
router.get(
  "/",
  authMiddleware,
  rbac([
    "super_admin",
    "hr_admin",
    "manager"
  ]),
  getEmployees
);

/**
 * Create Employee
 *
 * Creates:
 * - auth.users
 * - public.users
 *
 * Login is available immediately.
 */
router.post(
  "/",
  authMiddleware,
  rbac([
    "super_admin",
    "hr_admin"
  ]),
  validationMiddleware(createEmployeeSchema),
  createEmployee
);

/**
 * Get Employee By Public ID
 */
router.get(
  "/:id",
  authMiddleware,
  rbac([
    "super_admin",
    "hr_admin",
    "manager",
    "employee"
  ]),
  getEmployeeById
);

/**
 * Update Employee
 *
 * Updates only public.users.
 */
router.put(
  "/:id",
  authMiddleware,
  rbac([
    "super_admin",
    "hr_admin"
  ]),
  validationMiddleware(updateEmployeeSchema),
  updateEmployee
);

/**
 * Delete Employee
 */
router.delete(
  "/:id",
  authMiddleware,
  rbac([
    "super_admin"
  ]),
  deleteEmployee
);

export default router;