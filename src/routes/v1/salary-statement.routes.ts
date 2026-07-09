import express from "express";

import {

  getSalaryStatement,

  getSalaryHistory,

  getMonthlyPayrollSummary

} from "../../controllers/salary-statement.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { rbac } from "../../middlewares/rbac.middleware";

const router = express.Router();

/**
 * Get Employee Salary History
 */

router.get(

  "/history/:userId",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance",

    "employee"

  ]),

  getSalaryHistory

);

/**
 * Get Monthly Payroll Summary
 */

router.get(

  "/summary/:monthYear",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getMonthlyPayrollSummary

);

/**
 * Get Employee Salary Statement
 */

router.get(

  "/:userId/:monthYear",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance",

    "employee"

  ]),

  getSalaryStatement

);

export default router;