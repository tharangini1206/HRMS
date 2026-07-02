import { Request, Response, NextFunction } from "express";

import {

  createPayslipService,

  getPayslipService,

  getPayslipByIdService,

  uploadPayslipService

} from "../services/payslip.service";

import { sendResponse } from "../utils/response";

/**
 * Generate Payslip
 */
export const createPayslip = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await createPayslipService(

        req.body

      );

    return sendResponse(

      res,

      201,

      "Payslip generated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Employee Payslip History
 */
export const getPayslip = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await getPayslipService(

        String(req.params.employeeId)

      );

    return sendResponse(

      res,

      200,

      "Payslips fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Payslip Details
 */
export const getPayslipById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =

      await getPayslipByIdService(

        String(req.params.payslipId)

      );

    return sendResponse(

      res,

      200,

      "Payslip fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Upload Signed URL
 */
export const uploadPayslip = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const {

      payslipId,

      signedUrl

    } = req.body;

    const result =

      await uploadPayslipService(

        payslipId,

        signedUrl

      );

    return sendResponse(

      res,

      200,

      "Signed URL updated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};