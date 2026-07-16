import express from "express";

import {
  getMonthlyPayrollReport,
  getDepartmentPayrollReport,
  getSalaryPaidReport,
  getTaxReport,
  getPayrollStatusReport,
  getLopReport,
  getPayrollDashboardReport,
  getYearlyPayrollReport

} from "../../controllers/payroll-report.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";

const router = express.Router();

/**
 * Monthly Payroll Report
 */

router.get(

  "/monthly",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getMonthlyPayrollReport

);

/**
 * Department Payroll Report
 */

router.get(

  "/department",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getDepartmentPayrollReport

);

/**
 * Total Salary Paid Report
 */

router.get(

  "/salary-paid",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getSalaryPaidReport

);

/**
 * Tax Report
 */

router.get(

  "/tax",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getTaxReport

);

/**
 * Payroll Status Report
 */

router.get(

  "/status",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getPayrollStatusReport

);

/**
 * LOP Report
 */

router.get(

  "/lop",

  authMiddleware,

  rbac([

    "super_admin",

    "finance",

    "hr_admin"

  ]),

  getLopReport

);

/**
 * Payroll Dashboard Report
 */

router.get(

  "/dashboard",

  authMiddleware,

  rbac([

    "super_admin",

    "finance",

    "hr_admin"

  ]),

  getPayrollDashboardReport

);

/**
 * Yearly Payroll Report
 */

router.get(

  "/yearly",

  authMiddleware,

  rbac([

    "super_admin",

    "finance",

    "hr_admin"

  ]),

  getYearlyPayrollReport

);

export default router;