import { Request, Response, NextFunction } from "express";

import {
  createDepartmentService,
  getDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService
} from "../services/department.service";

import { sendResponse } from "../utils/response";

/**
 * Create Department
 */

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await createDepartmentService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Department created successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Departments
 */

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getDepartmentsService();

    return sendResponse(
      res,
      200,
      "Departments fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Department By Id
 */

export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getDepartmentByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Department fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Department
 */

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await updateDepartmentService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Department updated successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Department
 */

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await deleteDepartmentService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Department deleted successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};