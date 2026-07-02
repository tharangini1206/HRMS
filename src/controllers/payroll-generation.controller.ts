import { Request, Response, NextFunction } from "express";

import {

  generatePayrollService,

  getPayrollGenerationsService

} from "../services/payroll-generation.service";

import { sendResponse } from "../utils/response";

type AuthRequest = Request & {

  user?: any;

};

/**
 * Generate Payroll
 */

export const generatePayroll = async (

  req: AuthRequest,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await generatePayrollService(

        req.body,

        req.user.id

      );

    return sendResponse(

      res,

      201,

      "Payroll generated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Payrolls
 */

export const getPayrollGenerations = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollGenerationsService();

    return sendResponse(

      res,

      200,

      "Payrolls fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};