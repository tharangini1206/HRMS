import express from "express";

import {

  createTaxConfiguration,
  getTaxConfigurations,
  getTaxConfigurationById,
  updateTaxConfiguration,
  deleteTaxConfiguration,
  createTaxSlab,
  getTaxSlabs,
  getTaxSlabById,
  updateTaxSlab,
  deleteTaxSlab

} from "../../controllers/tax.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {

  createTaxConfigurationSchema,
  updateTaxConfigurationSchema,
  createTaxSlabSchema,
  updateTaxSlabSchema

} from "../../validations/tax.validation";

const router = express.Router();

/**
 * ==========================================
 * Tax Configuration
 * ==========================================
 */

/**
 * Create Tax Configuration
 *
 * POST /api/v1/hr/tax/configuration
 */

router.post(

  "/configuration",

  authMiddleware,

  rbac([
    "super_admin",
    "finance"
  ]),

  validationMiddleware(
    createTaxConfigurationSchema
  ),

  createTaxConfiguration

);

/**
 * Get All Tax Configurations
 *
 * GET /api/v1/hr/tax/configuration
 */

router.get(

  "/configuration",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getTaxConfigurations

);

/**
 * Get Tax Configuration By Id
 *
 * GET /api/v1/hr/tax/configuration/:id
 */

router.get(

  "/configuration/:id",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getTaxConfigurationById

);

/**
 * Update Tax Configuration
 *
 * PUT /api/v1/hr/tax/configuration/:id
 */

router.put(

  "/configuration/:id",

  authMiddleware,

  rbac([
    "super_admin",
    "finance"
  ]),

  validationMiddleware(
    updateTaxConfigurationSchema
  ),

  updateTaxConfiguration

);

/**
 * Delete Tax Configuration
 *
 * DELETE /api/v1/hr/tax/configuration/:id
 */

router.delete(

  "/configuration/:id",

  authMiddleware,

  rbac([
    "super_admin",
    "finance"
  ]),

  deleteTaxConfiguration

);


/**
 * ==========================================
 * Tax Slabs
 * ==========================================
 */

/**
 * Create Tax Slab
 *
 * POST /api/v1/hr/tax/slabs
 */

router.post(

  "/slabs",

  authMiddleware,

  rbac([
    "super_admin",
    "finance"
  ]),

  validationMiddleware(
    createTaxSlabSchema
  ),

  createTaxSlab

);

/**
 * Get All Tax Slabs
 *
 * GET /api/v1/hr/tax/slabs
 */

router.get(

  "/slabs",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getTaxSlabs

);

/**
 * Get Tax Slab By Id
 *
 * GET /api/v1/hr/tax/slabs/:id
 */

router.get(

  "/slabs/:id",

  authMiddleware,

  rbac([
    "super_admin",
    "finance",
    "hr_admin"
  ]),

  getTaxSlabById

);

/**
 * Update Tax Slab
 *
 * PUT /api/v1/hr/tax/slabs/:id
 */

router.put(

  "/slabs/:id",

  authMiddleware,

  rbac([
    "super_admin",
    "finance"
  ]),

  validationMiddleware(
    updateTaxSlabSchema
  ),

  updateTaxSlab

);

/**
 * Delete Tax Slab
 *
 * DELETE /api/v1/hr/tax/slabs/:id
 */

router.delete(

  "/slabs/:id",

  authMiddleware,

  rbac([
    "super_admin",
    "finance"
  ]),

  deleteTaxSlab

);

export default router;