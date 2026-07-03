import { z } from "zod";

/*
-------------------------------------------------------
Punch In
-------------------------------------------------------
*/

export const punchInSchema = z.object({
  workMode: z.enum(["WFO", "WFH", "HYBRID"]),
  lat: z.number(),
  lng: z.number(),
  deviceId: z.string().optional(),
  deviceName: z.string().optional(),
  ipAddress: z.string().optional()
});

/*
-------------------------------------------------------
Punch Out
-------------------------------------------------------
*/

export const punchOutSchema = z.object({
  lat: z.number(),
  lng: z.number()
});

/*
-------------------------------------------------------
Regularization
-------------------------------------------------------
*/

export const regularizationSchema = z.object({
  targetDate: z.string(),
  anomalyType: z.enum([
    "MISSED_PUNCH_IN",
    "MISSED_PUNCH_OUT",
    "BOTH_MISSED",
    "WORK_MODE_CHANGE",
    "OTHER"
  ]),
  managerNote: z.string().min(5),
  correctedPunchIn: z.string().optional(),
  correctedPunchOut: z.string().optional(),
  requestedWorkMode: z
    .enum(["WFO", "WFH", "HYBRID"])
    .optional()
});

/*
-------------------------------------------------------
Timesheet Log
-------------------------------------------------------
*/

export const timesheetSchema = z.object({
  projectAllocations: z.array(
    z.object({
      projectId: z.string().uuid(),
      hoursLogged: z.number().positive()
    })
  ).min(1)
});