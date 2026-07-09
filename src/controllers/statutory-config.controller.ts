import { Request, Response, NextFunction } from "express";

import {

  createStatutoryConfigService,

  getStatutoryConfigsService,

  getStatutoryConfigByIdService,

  updateStatutoryConfigService,

  deleteStatutoryConfigService,

  getActiveStatutoryConfigsService

} from "../services/statutory-config.service";

import { sendResponse } from "../utils/response";

/**
 * Create Statutory Configuration
 */

export const createStatutoryConfig = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await createStatutoryConfigService(
        req.body
      );

    return sendResponse(

      res,

      201,

      "Statutory configuration created successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Statutory Configurations
 */

export const getStatutoryConfigs = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getStatutoryConfigsService();

    return sendResponse(

      res,

      200,

      "Statutory configurations fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Statutory Configuration By Id
 */

export const getStatutoryConfigById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getStatutoryConfigByIdService(
        String(req.params.id)
      );

    return sendResponse(

      res,

      200,

      "Statutory configuration fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Statutory Configuration
 */

export const updateStatutoryConfig = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await updateStatutoryConfigService(

        String(req.params.id),

        req.body

      );

    return sendResponse(

      res,

      200,

      "Statutory configuration updated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Statutory Configuration
 */

export const deleteStatutoryConfig = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await deleteStatutoryConfigService(
        String(req.params.id)
      );

    return sendResponse(

      res,

      200,

      "Statutory configuration deleted successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Active Statutory Configurations
 */

export const getActiveStatutoryConfigs = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getActiveStatutoryConfigsService();

    return sendResponse(

      res,

      200,

      "Active statutory configurations fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};