import { Request, Response, NextFunction } from "express";

import {

  getSalaryStatementService,

  getSalaryHistoryService,

  getMonthlyPayrollSummaryService

} from "../services/salary-statement.service";

import { sendResponse } from "../utils/response";

type AuthRequest = Request & {

  user?: any;

};

/**
 * Get Employee Salary Statement
 */

export const getSalaryStatement = async (

  req: AuthRequest,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getSalaryStatementService(

        String(req.params.userId),

        String(req.params.monthYear)

      );

    return sendResponse(

      res,

      200,

      "Salary statement fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Salary History
 */

export const getSalaryHistory = async (

  req: AuthRequest,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getSalaryHistoryService(

        String(req.params.userId)

      );

    return sendResponse(

      res,

      200,

      "Salary history fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Monthly Payroll Summary
 */

export const getMonthlyPayrollSummary = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getMonthlyPayrollSummaryService(

        String(req.params.monthYear)

      );

    return sendResponse(

      res,

      200,

      "Monthly payroll summary fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};