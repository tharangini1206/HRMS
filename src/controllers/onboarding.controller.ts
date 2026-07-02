import { Request, Response, NextFunction } from "express";

import {
  createOnboardingService,
  getOnboardingsService,
  getOnboardingByIdService,
  updateOnboardingService,
  deleteOnboardingService
} from "../services/onboarding.service";

import { sendResponse } from "../utils/response";

/**
 * Create Employee Onboarding
 */

export const createOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await createOnboardingService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Employee onboarded successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Onboardings
 */

export const getOnboardings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getOnboardingsService();

    return sendResponse(
      res,
      200,
      "Employees fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Onboarding By Id
 */

export const getOnboardingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getOnboardingByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Onboarding
 */

export const updateOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await updateOnboardingService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Employee updated successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Onboarding
 */

export const deleteOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await deleteOnboardingService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee deleted successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};