import { Request, Response, NextFunction } from "express";

import {
  createDesignationService,
  getDesignationsService,
  getDesignationByIdService,
  updateDesignationService,
  deleteDesignationService
} from "../services/designation.service";

import { sendResponse } from "../utils/response";

/**
 * Create Designation
 */

export const createDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await createDesignationService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Designation created successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Designations
 */

export const getDesignations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getDesignationsService();

    return sendResponse(
      res,
      200,
      "Designations fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Designation By Id
 */

export const getDesignationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getDesignationByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Designation fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Designation
 */

export const updateDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await updateDesignationService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Designation updated successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Designation
 */

export const deleteDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await deleteDesignationService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Designation deleted successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};