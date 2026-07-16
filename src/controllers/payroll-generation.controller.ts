import { Request, Response, NextFunction } from "express";

import {

  generatePayrollService,

  getPayrollGenerationsService,

  getPayrollGenerationByIdService,

  getPayrollGenerationsByUserService,

  approvePayrollService,

  markPayrollPaidService,

  rejectPayrollService,

  deletePayrollGenerationService

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

/**
 * Get Payroll By Id
 */

export const getPayrollGenerationById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollGenerationByIdService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Payroll fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Payrolls By User
 */

export const getPayrollGenerationsByUser = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollGenerationsByUserService(

        String(req.params.userId)

      );

    return sendResponse(

      res,

      200,

      "Employee payrolls fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Approve Payroll
 */

export const approvePayroll = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await approvePayrollService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Payroll approved successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Mark Payroll Paid
 */

export const markPayrollPaid = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await markPayrollPaidService(

        String(req.params.id),

        req.body.payment_id

      );

    return sendResponse(

      res,

      200,

      "Payroll marked as paid successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Reject Payroll
 */

export const rejectPayroll = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await rejectPayrollService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Payroll rejected successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Payroll
 */

export const deletePayrollGeneration = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await deletePayrollGenerationService(

        String(req.params.id)

      );

    return sendResponse(

      res,

      200,

      "Payroll deleted successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};