import express from "express";

import {

  generatePayroll,

  getPayrollGenerations

} from "../../controllers/payroll-generation.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import { rbac } from "../../middlewares/rbac.middleware";

import {

  generatePayrollSchema

} from "../../validations/payroll-generation.validation";

const router = express.Router();

/**
 * Generate Payroll
 */

router.post(

  "/generate",

  authMiddleware,

  rbac(["super_admin", "hr_admin"]),

  validationMiddleware(generatePayrollSchema),

  generatePayroll

);

/**
 * Get All Payrolls
 */

router.get(

  "/",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getPayrollGenerations

);

export default router;