import express from "express";

import {

  createPayslip,

  getPayslip,

  getPayslipById,

  uploadPayslip

} from "../../controllers/payslip.controller";

import {

  validationMiddleware

} from "../../middlewares/validation.middleware";

import {

  createPayslipSchema,

  getPayslipSchema,

  getPayslipByIdSchema,

  uploadPayslipSchema

} from "../../validations/payslip.validation";

const router = express.Router();

/**
 * Generate Payslip
 */
router.post(

  "/generate",

  validationMiddleware(

    createPayslipSchema

  ),

  createPayslip

);

/**
 * Employee Payslip History
 */
router.get(

  "/employee/:employeeId",

  validationMiddleware(

    getPayslipSchema

  ),

  getPayslip

);

/**
 * Payslip Details
 */
router.get(

  "/:payslipId",

  validationMiddleware(

    getPayslipByIdSchema

  ),

  getPayslipById

);

/**
 * Update Signed URL
 */
router.put(

  "/upload",

  validationMiddleware(

    uploadPayslipSchema

  ),

  uploadPayslip

);

export default router;