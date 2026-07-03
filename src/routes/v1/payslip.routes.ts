import express from "express";

import {

  generatePayslip,

  getEmployeePayslips,

  downloadPayslip

} from "../../controllers/payslip.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import { rbac } from "../../middlewares/rbac.middleware";



const router = express.Router();

/**
 * Generate Payslip
 */

router.post(

  "/generate/:payrollId",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  generatePayslip

);

/**
 * Employee Payslips
 */

router.get(

  "/user/:userId",

  authMiddleware,

  rbac([

    "employee",

    "manager",

    "hr_admin",

    "finance",

    "super_admin"

  ]),

  getEmployeePayslips

);

/**
 * Download Payslip
 */

router.get(

  "/download/:id",

  authMiddleware,

  rbac([

    "employee",

    "manager",

    "hr_admin",

    "finance",

    "super_admin"

  ]),

  downloadPayslip

);

export default router;