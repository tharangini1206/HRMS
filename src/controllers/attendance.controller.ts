import { Request, Response, NextFunction } from "express";
import { attendanceService } from "../services/attendance.service";
import { sendResponse } from "../utils/response";

type AuthRequest = Request & {
  user?: any;
};

export const attendanceController = {

  /*
  -------------------------------------------------------
  Punch In
  -------------------------------------------------------
  */

  async punchIn(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.punchIn(
          req.user.id,
          req.body
        );

      return sendResponse(
        res,
        201,
        "Punch in successful.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Punch Out
  -------------------------------------------------------
  */

  async punchOut(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.punchOut(
          req.user.id,
          req.body
        );

      return sendResponse(
        res,
        200,
        "Punch out successful.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Apply Regularization
  -------------------------------------------------------
  */

  async applyRegularization(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.applyRegularization(
          req.user.id,
          req.body
        );

      return sendResponse(
        res,
        201,
        "Regularization request submitted.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  My Regularizations
  -------------------------------------------------------
  */

  async getMyRegularizations(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.getMyRegularizations(
          req.user.id
        );

      return sendResponse(
        res,
        200,
        "Regularizations fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Attendance History
  -------------------------------------------------------
  */

  async getAttendanceHistory(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const page =
        Number(req.query.page || 1);

      const limit =
        Number(req.query.limit || 20);

      const result =
        await attendanceService.getAttendanceHistory(
          req.user.id,
          page,
          limit
        );

      return sendResponse(
        res,
        200,
        "Attendance history fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Attendance By Date
  -------------------------------------------------------
  */

  async getAttendanceByDate(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.getAttendanceByDate(
          req.user.id,
          req.query.date as string
        );

      return sendResponse(
        res,
        200,
        "Attendance fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

    /*
  -------------------------------------------------------
  Monthly Attendance
  -------------------------------------------------------
  */

  async getMonthlyAttendance(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const month =
        Number(req.query.month);

      const year =
        Number(req.query.year);

      const result =
        await attendanceService.getMonthlyAttendance(
          req.user.id,
          month,
          year
        );

      return sendResponse(
        res,
        200,
        "Monthly attendance fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Attendance Calendar
  -------------------------------------------------------
  */

  async getAttendanceCalendar(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.getAttendanceCalendar(
          req.user.id,
          Number(req.query.month),
          Number(req.query.year)
        );

      return sendResponse(
        res,
        200,
        "Attendance calendar fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Attendance Statistics
  -------------------------------------------------------
  */

  async getAttendanceStatistics(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.getAttendanceStatistics(
          req.user.id,
          Number(req.query.month),
          Number(req.query.year)
        );

      return sendResponse(
        res,
        200,
        "Attendance statistics fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Dashboard
  -------------------------------------------------------
  */

  async getAttendanceDashboard(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.getAttendanceDashboard(
          req.user.id
        );

      return sendResponse(
        res,
        200,
        "Attendance dashboard fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Shift Details
  -------------------------------------------------------
  */

  async getShiftDetails(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.getShiftDetails(
          req.user.id
        );

      return sendResponse(
        res,
        200,
        "Shift details fetched successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  },

  /*
  -------------------------------------------------------
  Timesheet Log
  -------------------------------------------------------
  */

  async logTimesheet(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {

      const result =
        await attendanceService.logTimesheet(
          req.user.id,
          req.body
        );

      return sendResponse(
        res,
        201,
        "Timesheet logged successfully.",
        result
      );

    } catch (error) {
      next(error);
    }
  }

};