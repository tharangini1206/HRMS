import { Request, Response, NextFunction } from "express";
import { loginService , logoutService , refreshTokenService } from "../services/auth.service";
import { sendResponse } from "../utils/response";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    return sendResponse(res, 200, "Login successful", data);
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    await logoutService();

    return sendResponse(
      res,
      200,
      "Logout successful"
    );

  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { refreshToken } = req.body;

    const data =
      await refreshTokenService(
        refreshToken
      );

    return sendResponse(
      res,
      200,
      "Token refreshed",
      data
    );

  } catch (err) {
    next(err);
  }
};