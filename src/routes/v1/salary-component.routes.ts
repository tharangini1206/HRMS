import express from "express";

import {

  createSalaryComponent,

  getSalaryComponents,

  getSalaryComponentById,

  updateSalaryComponent,

  deleteSalaryComponent,

  getSalaryComponentsByUser

} from "../../controllers/salary-component.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { rbac } from "../../middlewares/rbac.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import {

  createSalaryComponentSchema,

  updateSalaryComponentSchema

} from "../../validations/salary-component.validation";

const router = express.Router();

/**
 * Create Salary Component
 */

router.post(

  "/",

  authMiddleware,

  rbac(["super_admin", "hr_admin"]),

  validationMiddleware(createSalaryComponentSchema),

  createSalaryComponent

);

/**
 * Get All Salary Components
 */

router.get(

  "/",

  authMiddleware,

  rbac(["super_admin", "hr_admin", "finance"]),

  getSalaryComponents

);

/**
 * Get All Salary Components for individual user
 */


router.get(

  "/user/:userId",

  authMiddleware,

  rbac(["super_admin","hr_admin","finance"]),

  getSalaryComponentsByUser

);

/**
 * Get Salary Component By Id
 */

router.get(

  "/:id",

  authMiddleware,

  rbac(["super_admin", "hr_admin", "finance"]),

  getSalaryComponentById

);

/**
 * Update Salary Component
 */

router.put(

  "/:id",

  authMiddleware,

  rbac(["super_admin", "hr_admin"]),

  validationMiddleware(updateSalaryComponentSchema),

  updateSalaryComponent

);

/**
 * Delete Salary Component
 */

router.delete(

  "/:id",

  authMiddleware,

  rbac(["super_admin"]),

  deleteSalaryComponent

);

export default router;