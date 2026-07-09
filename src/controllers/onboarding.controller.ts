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
 * Creates employment details for an existing employee.
 */
export const createOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const onboarding =
      await createOnboardingService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Employee onboarding completed successfully.",
      onboarding
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Employee Onboardings
 */
export const getOnboardings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const onboardings =
      await getOnboardingsService();

    return sendResponse(
      res,
      200,
      "Employee onboardings fetched successfully.",
      onboardings
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Employee Onboarding By Profile Public ID
 */
export const getOnboardingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const onboarding =
      await getOnboardingByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee onboarding fetched successfully.",
      onboarding
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Employee Onboarding
 */
export const updateOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const onboarding =
      await updateOnboardingService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Employee onboarding updated successfully.",
      onboarding
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Employee Onboarding
 */
export const deleteOnboarding = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const onboarding =
      await deleteOnboardingService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee onboarding deleted successfully.",
      onboarding
    );

  } catch (error) {

    next(error);

  }

};