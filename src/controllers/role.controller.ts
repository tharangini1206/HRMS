import { Request, Response, NextFunction } from "express";

import {
  createRoleService,
  getRolesService,
  getRoleByIdService,
  updateRoleService,
  deleteRoleService
} from "../services/role.service";

import { sendResponse } from "../utils/response";

/**
 * Create Role
 */

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await createRoleService(
        req.body
      );

    return sendResponse(
      res,
      201,
      "Role created successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get All Roles
 */

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getRolesService();

    return sendResponse(
      res,
      200,
      "Roles fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Get Role By ID
 */

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getRoleByIdService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Role fetched successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Update Role
 */

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await updateRoleService(
        String(req.params.id),
        req.body
      );

    return sendResponse(
      res,
      200,
      "Role updated successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};

/**
 * Delete Role
 */

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await deleteRoleService(
        String(req.params.id)
      );

    return sendResponse(
      res,
      200,
      "Role deleted successfully",
      result
    );

  } catch (error) {

    next(error);

  }

};