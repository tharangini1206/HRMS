import { Request, Response, NextFunction } from "express";

import {

  createTaxConfigurationService,
  getTaxConfigurationsService,
  getTaxConfigurationByIdService,
  updateTaxConfigurationService,
  deleteTaxConfigurationService,
  createTaxSlabService,
  getTaxSlabsService,
  getTaxSlabByIdService,
  updateTaxSlabService,
  deleteTaxSlabService

} from "../services/tax.service";

import { sendResponse } from "../utils/response";

/**
 * ==========================================
 * Create Tax Configuration
 * ==========================================
 */

export const createTaxConfiguration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const configuration =
      await createTaxConfigurationService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Tax configuration created successfully.",
      configuration
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get All Tax Configurations
 * ==========================================
 */

export const getTaxConfigurations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const configurations =
      await getTaxConfigurationsService();

    return sendResponse(
      res,
      200,
      "Tax configurations fetched successfully.",
      configurations
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get Tax Configuration By Id
 * ==========================================
 */

export const getTaxConfigurationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const configuration =
      await getTaxConfigurationByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Tax configuration fetched successfully.",
      configuration
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Update Tax Configuration
 * ==========================================
 */

export const updateTaxConfiguration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const configuration =
      await updateTaxConfigurationService(

        String(req.params.id),

        req.body

      );

    return sendResponse(
      res,
      200,
      "Tax configuration updated successfully.",
      configuration
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Delete Tax Configuration
 * ==========================================
 */

export const deleteTaxConfiguration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const configuration =
      await deleteTaxConfigurationService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Tax configuration deleted successfully.",
      configuration
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Create Tax Slab
 * ==========================================
 */

export const createTaxSlab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const slab =
      await createTaxSlabService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Tax slab created successfully.",
      slab
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get All Tax Slabs
 * ==========================================
 */

export const getTaxSlabs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const slabs =
      await getTaxSlabsService();

    return sendResponse(
      res,
      200,
      "Tax slabs fetched successfully.",
      slabs
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get Tax Slab By Id
 * ==========================================
 */

export const getTaxSlabById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const slab =
      await getTaxSlabByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Tax slab fetched successfully.",
      slab
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Update Tax Slab
 * ==========================================
 */

export const updateTaxSlab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const slab =
      await updateTaxSlabService(

        String(req.params.id),

        req.body

      );

    return sendResponse(
      res,
      200,
      "Tax slab updated successfully.",
      slab
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Delete Tax Slab
 * ==========================================
 */

export const deleteTaxSlab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const slab =
      await deleteTaxSlabService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Tax slab deleted successfully.",
      slab
    );

  } catch (error) {

    next(error);

  }

};