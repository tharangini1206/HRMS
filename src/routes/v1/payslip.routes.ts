import express from "express";

import {
  generatePayslip,
  getAllPayslips,
  getEmployeePayslips,
  getPayslipById,
  downloadPayslip,
  deletePayslip
} from "../../controllers/payslip.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  generatePayslipSchema
} from "../../validations/payslip.validation";

const router = express.Router();



/**
 * Generate Payslip
 *
 * POST /api/v1/hr/payslips/generate/:payrollId
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
 * Get All Payslips
 *
 * GET /api/v1/hr/payslips
 */

router.get(
  "/",
  authMiddleware,
  rbac([
    "super_admin",
    "hr_admin",
    "finance"
  ]),
  getAllPayslips
);


/**
 * Get Employee Payslips
 *
 * GET /api/v1/hr/payslips/user/:userId
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
 *
 * GET /api/v1/hr/payslips/download/:id
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

/**
 * Get Payslip By Id
 *
 * GET /api/v1/hr/payslips/:id
 */

router.get(
  "/:id",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "finance",
    "super_admin"
  ]),
  getPayslipById
);

/**
 * Delete Payslip
 *
 * DELETE /api/v1/hr/payslips/:id
 */

router.delete(
  "/:id",
  authMiddleware,
  rbac([
    "super_admin",
    "finance"
  ]),
  deletePayslip
);

export default router;