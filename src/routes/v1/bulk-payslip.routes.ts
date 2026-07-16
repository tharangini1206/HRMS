import express from "express";

import {

  generateBulkPayslips,

  getBulkPayslips,

  getBulkPayslipById,

  deleteBulkPayslip

} from "../../controllers/bulk-payslip.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { rbac } from "../../middlewares/rbac.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import {

  generateBulkPayslipSchema

} from "../../validations/bulk-payslip.validation";

const router = express.Router();

/**
 * Generate Bulk Payslips
 */

router.post(

  "/generate",

  authMiddleware,

  rbac([

    "super_admin",

    "finance",

    "hr_admin"

  ]),

  validationMiddleware(

    generateBulkPayslipSchema

  ),

  generateBulkPayslips

);

/**
 * Get All Bulk Payslips
 */

router.get(

  "/",

  authMiddleware,

  rbac([

    "super_admin",

    "finance",

    "hr_admin"

  ]),

  getBulkPayslips

);

/**
 * Get Bulk Payslip By Id
 */

router.get(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin",

    "finance",

    "hr_admin"

  ]),

  getBulkPayslipById

);

/**
 * Delete Bulk Payslip
 */

router.delete(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin"

  ]),

  deleteBulkPayslip

);

export default router;