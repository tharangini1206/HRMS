import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from "../../controllers/department.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  createDepartmentSchema,
  updateDepartmentSchema
} from "../../validations/department.validation";

const router = express.Router();

/**
 * Create Department
 */
router.post(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(createDepartmentSchema),
  createDepartment
);

/**
 * Get All Departments
 */
router.get(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager"]),
  getDepartments
);

/**
 * Get Department By Id
 */
router.get(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager"]),
  getDepartmentById
);

/**
 * Update Department
 */
router.put(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(updateDepartmentSchema),
  updateDepartment
);

/**
 * Delete Department
 */
router.delete(
  "/:id",
  authMiddleware,
  rbac(["super_admin"]),
  deleteDepartment
);

export default router;