import { Request, Response, NextFunction } from "express";

import {

  createPayrollService,

  getPayrollsService,

  getPayrollByIdService,

  updatePayrollService,

  deletePayrollService

} from "../services/payroll.service";

import { sendResponse } from "../utils/response";

/**
 * Create Employee Salary
 */

export const createPayroll = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await createPayrollService(
        req.body
      );

    return sendResponse(

      res,

      201,

      "Employee salary created successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Employee Salaries
 */

export const getPayrolls = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollsService();

    return sendResponse(

      res,

      200,

      "Employee salaries fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Employee Salary By Id
 */

export const getPayrollById = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollByIdService(
        String(req.params.id)
      );

    return sendResponse(

      res,

      200,

      "Employee salary fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Employee Salary
 */

export const updatePayroll = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await updatePayrollService(

        String(req.params.id),

        req.body

      );

    return sendResponse(

      res,

      200,

      "Employee salary updated successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Employee Salary
 */

export const deletePayroll = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await deletePayrollService(
        String(req.params.id)
      );

    return sendResponse(

      res,

      200,

      "Employee salary deleted successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};