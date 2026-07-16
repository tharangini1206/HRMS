import { Request, Response, NextFunction } from "express";

import {

  getMonthlyPayrollReportService,

  getDepartmentPayrollReportService,

  getSalaryPaidReportService,

  getTaxReportService,

  getPayrollStatusReportService,

  getLopReportService,

  getPayrollDashboardReportService,

  getYearlyPayrollReportService

} from "../services/payroll-report.service";

import { sendResponse } from "../utils/response";

/**
 * Monthly Payroll Report
 */

export const getMonthlyPayrollReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getMonthlyPayrollReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "Monthly payroll report fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Department Wise Payroll Report
 */

export const getDepartmentPayrollReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getDepartmentPayrollReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "Department payroll report fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Salary Paid Report
 */

export const getSalaryPaidReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getSalaryPaidReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "Salary paid report fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Tax Report
 */

export const getTaxReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getTaxReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "Tax report fetched successfully",

      result

    );

  } catch (error) {

    next(error);

  }

};

/**
 * Payroll Status Report
 */

export const getPayrollStatusReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollStatusReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "Payroll status report fetched successfully",

      result

    );

  }

  catch (error) {

    next(error);

  }

};

/**
 * LOP Report
 */

export const getLopReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getLopReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "LOP report fetched successfully",

      result

    );

  }

  catch (error) {

    next(error);

  }

};

/**
 * Payroll Dashboard Report
 */

export const getPayrollDashboardReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getPayrollDashboardReportService(

        String(req.query.month_year)

      );

    return sendResponse(

      res,

      200,

      "Payroll dashboard report fetched successfully",

      result

    );

  }

  catch (error) {

    next(error);

  }

};


/**
 * Yearly Payroll Report
 */

export const getYearlyPayrollReport = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const result =
      await getYearlyPayrollReportService(

        String(req.query.year)

      );

    return sendResponse(

      res,

      200,

      "Yearly payroll report fetched successfully",

      result

    );

  }

  catch (error) {

    next(error);

  }

};