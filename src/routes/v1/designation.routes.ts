import express from "express";

import {
  createDesignation,
  getDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation
} from "../../controllers/designation.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  createDesignationSchema,
  updateDesignationSchema
} from "../../validations/designation.validation";

const router = express.Router();

/**
 * Create Designation
 */
router.post(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(createDesignationSchema),
  createDesignation
);

/**
 * Get All Designations
 */
router.get(
  "/",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager"]),
  getDesignations
);

/**
 * Get Designation By Id
 */
router.get(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin", "manager"]),
  getDesignationById
);

/**
 * Update Designation
 */
router.put(
  "/:id",
  authMiddleware,
  rbac(["super_admin", "hr_admin"]),
  validationMiddleware(updateDesignationSchema),
  updateDesignation
);

/**
 * Delete Designation
 */
router.delete(
  "/:id",
  authMiddleware,
  rbac(["super_admin"]),
  deleteDesignation
);

export default router;