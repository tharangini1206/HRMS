import { Request, Response, NextFunction } from "express";

import {
  createEmployeeService,
  getEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
  deleteEmployeeService
} from "../services/employee.service";

import { sendResponse } from "../utils/response";

/**
 * Create Employee
 */
export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await createEmployeeService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Employee created successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Employees
 */
export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getEmployeesService();

    return sendResponse(
      res,
      200,
      "Employees fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Employee By Id
 */
export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getEmployeeByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Employee
 */
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await updateEmployeeService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Employee updated successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Employee
 */
export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await deleteEmployeeService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee deleted successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};