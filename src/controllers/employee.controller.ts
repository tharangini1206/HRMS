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
 * Creates:
 * 1. auth.users
 * 2. public.users
 *
 * Employee onboarding is handled separately.
 */
export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const employee =
      await createEmployeeService(req.body);

    return sendResponse(
      res,
      201,
      "Employee created successfully.",
      employee
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

    const employees =
      await getEmployeesService();

    return sendResponse(
      res,
      200,
      "Employees fetched successfully.",
      employees
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Employee By Public ID
 */
export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const employee =
      await getEmployeeByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee fetched successfully.",
      employee
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Employee
 * Updates only public.users.
 *
 * Employment information is updated
 * through Employee Onboarding module.
 */
export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const employee =
      await updateEmployeeService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Employee updated successfully.",
      employee
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Soft Delete Employee
 */
export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const employee =
      await deleteEmployeeService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Employee deleted successfully.",
      employee
    );

  } catch (error) {

    next(error);

  }

};