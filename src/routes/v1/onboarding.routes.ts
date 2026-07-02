import express from "express";

import {
  createOnboarding,
  getOnboardings,
  getOnboardingById,
  updateOnboarding,
  deleteOnboarding
} from "../../controllers/onboarding.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  createOnboardingSchema,
  updateOnboardingSchema
} from "../../validations/onboarding.validation";

const router = express.Router();

/**
 * Create Employee Onboarding
 */
router.post(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(createOnboardingSchema),
  createOnboarding
);

/**
 * Get All Onboarded Employees
 */
router.get(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager"]),
  getOnboardings
);

/**
 * Get Employee Onboarding By Id
 */
router.get(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager", "employee"]),
  getOnboardingById
);

/**
 * Update Employee Onboarding
 */
router.put(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(updateOnboardingSchema),
  updateOnboarding
);

/**
 * Delete Employee Onboarding
 */
router.delete(
  "/:id",
  authMiddleware,
  rbac(["super_admin"]),
  deleteOnboarding
);

export default router;