import express from "express";

import {

  generatePayroll,

  getPayrollGenerations,

  getPayrollGenerationById,

  getPayrollGenerationsByUser,

  markPayrollPaid,

  deletePayrollGeneration


} from "../../controllers/payroll-generation.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import { rbac } from "../../middlewares/rbac.middleware";

import {

  generatePayrollSchema,

  markPayrollPaidSchema

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

/**
 * Get Payrolls By User
 */

router.get(

  "/user/:userId",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getPayrollGenerationsByUser

);

/**
 * Mark Payroll Paid
 */

router.patch(

  "/pay/:id",

  authMiddleware,

  rbac([

    "super_admin",

    "finance"

  ]),

  validationMiddleware(

    markPayrollPaidSchema

  ),

  markPayrollPaid

);


/**
 * Get Payroll By Id
 */

router.get(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getPayrollGenerationById

);


/**
 * Delete Payroll
 */

router.delete(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin"

  ]),

  deletePayrollGeneration

);

export default router;