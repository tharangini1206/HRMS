import { Request, Response, NextFunction } from "express";

import {

  createSalaryComponentService,

  getSalaryComponentsService,

  getSalaryComponentByIdService,

  updateSalaryComponentService,

  deleteSalaryComponentService,

  getSalaryComponentsByUserService

} from "../services/salary-component.service";

import { sendResponse } from "../utils/response";

/**
 * Create Salary Component
 */

export const createSalaryComponent = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await createSalaryComponentService(
        req.body
      );

    return sendResponse(

      res,

      201,

      "Salary component created successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Salary Components
 */

export const getSalaryComponents = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getSalaryComponentsService();

    return sendResponse(

      res,

      200,

      "Salary components fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Salary Component By Id
 */

export const getSalaryComponentById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getSalaryComponentByIdService(
        String(req.params.id)
      );

    return sendResponse(

      res,

      200,

      "Salary component fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Salary Component
 */

export const updateSalaryComponent = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await updateSalaryComponentService(

        String(req.params.id),

        req.body

      );

    return sendResponse(

      res,

      200,

      "Salary component updated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Salary Component
 */

export const deleteSalaryComponent = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await deleteSalaryComponentService(
        String(req.params.id)
      );

    return sendResponse(

      res,

      200,

      "Salary component deleted successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Salary Components By User Id
 */

export const getSalaryComponentsByUser =
async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getSalaryComponentsByUserService(
        String(req.params.userId)
      );

    return sendResponse(

      res,

      200,

      "Salary components fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};