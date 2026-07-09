import express from "express";

import {

  createStatutoryConfig,

  getStatutoryConfigs,

  getStatutoryConfigById,

  updateStatutoryConfig,

  deleteStatutoryConfig,

  getActiveStatutoryConfigs

} from "../../controllers/statutory-config.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { rbac } from "../../middlewares/rbac.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";

import {

  createStatutoryConfigSchema,

  updateStatutoryConfigSchema

} from "../../validations/statutory-config.validation";

const router = express.Router();

/**
 * Create Statutory Configuration
 */

router.post(

  "/",

  authMiddleware,

  rbac(["super_admin", "hr_admin"]),

  validationMiddleware(createStatutoryConfigSchema),

  createStatutoryConfig

);

/**
 * Get All Statutory Configurations
 */

router.get(

  "/",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getStatutoryConfigs

);

/**
 * Get Active Statutory Configurations
 */

router.get(

  "/active",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getActiveStatutoryConfigs

);

/**
 * Get Statutory Configuration By Id
 */

router.get(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin",

    "finance"

  ]),

  getStatutoryConfigById

);

/**
 * Update Statutory Configuration
 */

router.put(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin",

    "hr_admin"

  ]),

  validationMiddleware(updateStatutoryConfigSchema),

  updateStatutoryConfig

);

/**
 * Delete Statutory Configuration
 */

router.delete(

  "/:id",

  authMiddleware,

  rbac([

    "super_admin"

  ]),

  deleteStatutoryConfig

);

export default router;