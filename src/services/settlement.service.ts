import {

  calculateSettlementRepository,

  getSettlementRepository,

  approveSettlementRepository

} from "../repositories/settlement.repository";

/**
 * Calculate Settlement
 */
export const calculateSettlementService = async (

  body: any

) => {

  /**
   * Temporary Calculation
   * Replace with actual payroll logic later.
   */

  body.net_amount =

    (body.basic_salary || 0)

    +

    (body.bonus || 0)

    +

    (body.leave_encashment || 0)

    -

    (body.deductions || 0);

  const { data, error } =

    await calculateSettlementRepository(body);

  if (error)
    throw error;

  return data;

};

/**
 * Settlement Details
 */
export const getSettlementService = async (

  employeeId: string

) => {

  const { data, error } =

    await getSettlementRepository(employeeId);

  if (error)
    throw error;

  return data;

};

/**
 * HR Approval
 */
export const approveSettlementService = async (

  employeeId: string

) => {

  const { data, error } =

    await approveSettlementRepository(employeeId);

  if (error)
    throw error;

  return data;

};