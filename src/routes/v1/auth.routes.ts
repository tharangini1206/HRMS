import express from "express";

import {
  login,
  logout,
  refreshToken
} from "../../controllers/auth.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  loginSchema,
  refreshTokenSchema
} from "../../validations/auth.validation";

const router = express.Router();

router.post(
  "/login",
  validationMiddleware(loginSchema),
  login
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.post(
  "/refresh-token",
  validationMiddleware(refreshTokenSchema),
  refreshToken
);

export default router;