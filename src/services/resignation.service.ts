import {

  createResignationRepository,

  getAllResignationsRepository,

  getResignationByIdRepository,

  managerApprovalRepository,

  hrApprovalRepository,

  cancelResignationRepository

} from "../repositories/resignation.repository";

/**
 * Employee Creates Resignation
 */
export const createResignationService = async (
  body: any
) => {

  body.status = "Pending";

  const { data, error } =
    await createResignationRepository(body);

  if (error)
    throw error;

  return data;

};

/**
 * HR Gets All Resignations
 */
export const getAllResignationsService = async () => {

  const { data, error } =
    await getAllResignationsRepository();

  if (error)
    throw error;

  return data;

};

/**
 * Get Resignation
 */
export const getResignationByIdService = async (
  id: string
) => {

  const { data, error } =
    await getResignationByIdRepository(id);

  if (error)
    throw error;

  return data;

};

/**
 * Manager Approval
 */
export const managerApprovalService = async (
  id: string,
  body: any
) => {

  body.manager_status = "Approved";

  const { data, error } =
    await managerApprovalRepository(
      id,
      body
    );

  if (error)
    throw error;

  return data;

};

/**
 * HR Approval
 */
export const hrApprovalService = async (
  id: string,
  body: any
) => {

  body.hr_status = "Approved";

  const { data, error } =
    await hrApprovalRepository(
      id,
      body
    );

  if (error)
    throw error;

  return data;

};

/**
 * Cancel Resignation
 */
export const cancelResignationService = async (
  id: string
) => {

  const { data, error } =
    await cancelResignationRepository(id);

  if (error)
    throw error;

  return data;

};

/**
 * Notice Period
 */
export const calculateNoticePeriodService = async (
  body: any
) => {

  const resignationDate =
    new Date(body.resignation_date);

  const noticeDays =
    body.notice_days || 30;

  const finalWorkingDay =
    new Date(resignationDate);

  finalWorkingDay.setDate(
    finalWorkingDay.getDate() + noticeDays
  );

  return {

    notice_days: noticeDays,

    final_working_day: finalWorkingDay

  };

};

/**
 * Final Working Day
 */
export const getFinalWorkingDayService = async (
  id: string
) => {

  return {

    employee_id: id,

    message: "Waiting for DB integration"

  };

};