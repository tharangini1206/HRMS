import { Request, Response, NextFunction } from "express";

import {

  generateBulkPayslipsService,

  getBulkPayslipsService,

  getBulkPayslipByIdService,

  deleteBulkPayslipService

} from "../services/bulk-payslip.service";

import { sendResponse } from "../utils/response";

type AuthRequest = Request & {

  user?: any;

};

/**
 * Generate Bulk Payslips
 */

export const generateBulkPayslips = async (

  req: AuthRequest,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await generateBulkPayslipsService(

        req.body.month_year,

        req.user.id

      );

    return sendResponse(

      res,

      201,

      "Bulk payslips generated successfully.",

      result

    );

  }

  catch (error) {

    next(error);

  }

};

/**
 * Get All Bulk Payslips
 */

export const getBulkPayslips = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getBulkPayslipsService();

    return sendResponse(

      res,

      200,

      "Bulk payslips fetched successfully.",

      result

    );

  }

  catch (error) {

    next(error);

  }

};

/**
 * Get Bulk Payslip By Id
 */

export const getBulkPayslipById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getBulkPayslipByIdService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Bulk payslip fetched successfully.",

      result

    );

  }

  catch (error) {

    next(error);

  }

};

/**
 * Delete Bulk Payslip
 */

export const deleteBulkPayslip = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await deleteBulkPayslipService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Bulk payslip deleted successfully.",

      result

    );

  }

  catch (error) {

    next(error);

  }

};