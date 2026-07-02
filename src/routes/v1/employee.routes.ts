import express from "express";

import {
  getEmployees,
  createEmployee,
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
 * Get All Employees
 */
router.get(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager"]),
  getEmployees
);

/**
 * Create Employee
 */
router.post(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(createEmployeeSchema),
  createEmployee
);

/**
 * Get Employee By Id
 */
router.get(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager", "employee"]),
  getEmployeeById
);

/**
 * Update Employee
 */
router.put(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(updateEmployeeSchema),
  updateEmployee
);

/**
 * Delete Employee
 */
router.delete(
  "/:id",
  authMiddleware,
  rbac(["super_admin"]),
  deleteEmployee
);

export default router;