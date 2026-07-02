import express from "express";

import {

  createResignation,

  getAllResignations,

  getResignationById,

  managerApproval,

  hrApproval,

  cancelResignation,

  calculateNoticePeriod,

  getFinalWorkingDay

} from "../../controllers/resignation.controller";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import {

  createResignationSchema,

  managerApprovalSchema,

  hrApprovalSchema,

  cancelResignationSchema,

  noticePeriodSchema

} from "../../validations/resignation.validation";

const router = express.Router();

router.post(
  "/",
  validationMiddleware(createResignationSchema),
  createResignation
);

router.get(
  "/",
  getAllResignations
);

router.get(
  "/:id",
  getResignationById
);

router.put(
  "/manager/:id",
  validationMiddleware(managerApprovalSchema),
  managerApproval
);

router.put(
  "/hr/:id",
  validationMiddleware(hrApprovalSchema),
  hrApproval
);

router.put(
  "/cancel/:id",
  validationMiddleware(cancelResignationSchema),
  cancelResignation
);

router.post(
  "/notice-period",
  validationMiddleware(noticePeriodSchema),
  calculateNoticePeriod
);

router.get(
  "/final-working-day/:id",
  getFinalWorkingDay
);

export default router;