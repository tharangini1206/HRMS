import { Router } from "express";

import { attendanceController } from "../../controllers/attendance.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { rbac } from "../../middlewares/rbac.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

import {
  punchInSchema,
  punchOutSchema,
  regularizationSchema,
  timesheetSchema
} from "../../validations/attendance.validation";

const router = Router();

/*
-------------------------------------------------------
Employee Attendance
-------------------------------------------------------
*/

router.post(
  "/punch-in",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  validationMiddleware(punchInSchema),
  attendanceController.punchIn
);

router.post(
  "/punch-out",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  validationMiddleware(punchOutSchema),
  attendanceController.punchOut
);

router.post(
  "/regularization",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  validationMiddleware(regularizationSchema),
  attendanceController.applyRegularization
);

router.get(
  "/regularizations",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getMyRegularizations
);

router.get(
  "/history",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getAttendanceHistory
);

router.get(
  "/by-date",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getAttendanceByDate
);

router.get(
  "/monthly",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getMonthlyAttendance
);

router.get(
  "/calendar",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getAttendanceCalendar
);

router.get(
  "/statistics",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getAttendanceStatistics
);

router.get(
  "/dashboard",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getAttendanceDashboard
);

router.get(
  "/shift-status",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  attendanceController.getShiftDetails
);

router.post(
  "/timesheet/log",
  authMiddleware,
  rbac([
    "employee",
    "manager",
    "hr_admin",
    "super_admin"
  ]),
  validationMiddleware(timesheetSchema),
  attendanceController.logTimesheet
);

export default router;