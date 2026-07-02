import express from "express";

import {

  calculateSettlement,

  getSettlement,

  approveSettlement

} from "../../controllers/settlement.controller";

import {

  validationMiddleware

} from "../../middlewares/validation.middleware";

import {

  calculateSettlementSchema,

  getSettlementSchema,

  approveSettlementSchema

} from "../../validations/settlement.validation";

const router = express.Router();

/**
 * Calculate Settlement
 */
router.post(

  "/calculate",

  validationMiddleware(

    calculateSettlementSchema

  ),

  calculateSettlement

);

/**
 * Settlement Details
 */
router.get(

  "/:employeeId",

  validationMiddleware(

    getSettlementSchema

  ),

  getSettlement

);

/**
 * HR Approval
 */
router.put(

  "/approve/:employeeId",

  validationMiddleware(

    approveSettlementSchema

  ),

  approveSettlement

);

export default router;