import { Request, Response, NextFunction } from "express";

import {

  calculateSettlementService,

  getSettlementService,

  approveSettlementService

} from "../services/settlement.service";

import { sendResponse } from "../utils/response";

/**
 * Calculate Settlement
 */
export const calculateSettlement = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await calculateSettlementService(

        req.body

      );

    return sendResponse(

      res,

      201,

      "Settlement calculated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Settlement Details
 */
export const getSettlement = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await getSettlementService(

        String(req.params.employeeId)

      );

    return sendResponse(

      res,

      200,

      "Settlement fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * HR Approval
 */
export const approveSettlement = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await approveSettlementService(

        String(req.params.employeeId)

      );

    return sendResponse(

      res,

      200,

      "Settlement approved successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};