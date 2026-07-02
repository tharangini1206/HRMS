import { Request, Response, NextFunction } from "express";

import {

  createResignationService,

  getAllResignationsService,

  getResignationByIdService,

  managerApprovalService,

  hrApprovalService,

  cancelResignationService,

  calculateNoticePeriodService,

  getFinalWorkingDayService

} from "../services/resignation.service";

import { sendResponse } from "../utils/response";

/**
 * Employee submits resignation
 */
export const createResignation = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await createResignationService(

        req.body

      );

    return sendResponse(

      res,

      201,

      "Resignation submitted successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * HR gets all resignations
 */
export const getAllResignations = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await getAllResignationsService();

    return sendResponse(

      res,

      200,

      "Resignations fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get resignation by ID
 */
export const getResignationById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await getResignationByIdService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Resignation details fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Manager Approval
 */
export const managerApproval = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await managerApprovalService(

        String(req.params.id),

        req.body

      );

    return sendResponse(

      res,

      200,

      "Manager approval completed",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * HR Approval
 */
export const hrApproval = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await hrApprovalService(

        String(req.params.id),

        req.body

      );

    return sendResponse(

      res,

      200,

      "HR approval completed",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Cancel Resignation
 */
export const cancelResignation = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await cancelResignationService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Resignation cancelled successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Calculate Notice Period
 */
export const calculateNoticePeriod = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await calculateNoticePeriodService(

        req.body

      );

    return sendResponse(

      res,

      200,

      "Notice period calculated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Final Working Day
 */
export const getFinalWorkingDay = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await getFinalWorkingDayService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Final working day fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};