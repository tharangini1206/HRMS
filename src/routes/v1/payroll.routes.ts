import express from "express";

import {

  createPayroll,

  getPayrolls,

  getPayrollById,

  updatePayroll,

  deletePayroll

} from "../../controllers/payroll.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import {

  createPayrollSchema,

  updatePayrollSchema

} from "../../validations/payroll.validation";

import { rbac } from "../../middlewares/rbac.middleware";

const router = express.Router();

/**
 * Create Employee Salary
 */

router.post(

  "/",

  authMiddleware,

  rbac(["super_admin", "hr_admin"]),

  validationMiddleware(createPayrollSchema),

  createPayroll

);

/**
 * Get All Employee Salaries
 */

router.get(

  "/",

  authMiddleware,

  rbac(["super_admin", "hr_admin", "finance"]),

  getPayrolls

);

/**
 * Get Employee Salary By Id
 */

router.get(

  "/:id",

  authMiddleware,

  rbac(["super_admin", "hr_admin", "finance"]),

  getPayrollById

);

/**
 * Update Employee Salary
 */

router.put(

  "/:id",

  authMiddleware,

  rbac(["super_admin", "hr_admin"]),

  validationMiddleware(updatePayrollSchema),

  updatePayroll

);

/**
 * Delete Employee Salary
 */

router.delete(

  "/:id",

  authMiddleware,

  rbac(["super_admin"]),

  deletePayroll

);

export default router;