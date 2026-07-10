import { Request, Response, NextFunction } from "express";

import {
  generatePayslipService,
  getEmployeePayslipsService,
  getPayslipDownloadService,
  getAllPayslipsService,
  getPayslipByIdService,
  deletePayslipService
} from "../services/payslip.service";

import { sendResponse } from "../utils/response";

type AuthRequest = Request & {
  user?: any;
};

/**
 * ==========================================
 * Generate Payslip
 * ==========================================
 */

export const generatePayslip = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const payslip =
      await generatePayslipService(
        String(req.params.payrollId),
        req.user.id
      );

    return sendResponse(
      res,
      201,
      "Payslip generated successfully.",
      payslip
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get All Payslips
 * ==========================================
 */

export const getAllPayslips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payslips =
      await getAllPayslipsService();

    return sendResponse(
      res,
      200,
      "Payslips fetched successfully.",
      payslips
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get Employee Payslips
 * ==========================================
 */

export const getEmployeePayslips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payslips =
      await getEmployeePayslipsService(
        String(req.params.userId)
      );

    return sendResponse(
      res,
      200,
      "Employee payslips fetched successfully.",
      payslips
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Get Payslip By Id
 * ==========================================
 */

export const getPayslipById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payslip =
      await getPayslipByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Payslip fetched successfully.",
      payslip
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Download Payslip
 * ==========================================
 */

export const downloadPayslip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const download =
      await getPayslipDownloadService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Payslip download URL generated successfully.",
      download
    );

  } catch (error) {

    next(error);

  }

};

/**
 * ==========================================
 * Delete Payslip
 * ==========================================
 */

export const deletePayslip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payslip =
      await deletePayslipService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Payslip deleted successfully.",
      payslip
    );

  } catch (error) {

    next(error);

  }

};