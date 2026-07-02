import {

  getPayslipRepository,

  getPayslipByIdRepository,

  createPayslipRepository,

  updatePayslipUrlRepository

} from "../repositories/payslip.repository";

/**
 * Employee Payslip History
 */
export const getPayslipService = async (

  employeeId: string

) => {

  const { data, error } =

    await getPayslipRepository(employeeId);

  if (error)

    throw error;

  return data;

};

/**
 * Payslip Details
 */
export const getPayslipByIdService = async (

  payslipId: string

) => {

  const { data, error } =

    await getPayslipByIdRepository(

      payslipId

    );

  if (error)

    throw error;

  return data;

};

/**
 * Generate Payslip
 */
export const createPayslipService = async (

  body: any

) => {

  /**
   * Later
   *
   * PDFKit / Puppeteer
   * will generate PDF
   */

  body.status = "Generated";

  const { data, error } =

    await createPayslipRepository(

      body

    );

  if (error)

    throw error;

  return data;

};

/**
 * Upload Payslip
 */
export const uploadPayslipService = async (

  payslipId: string,

  signedUrl: string

) => {

  const { data, error } =

    await updatePayslipUrlRepository(

      payslipId,

      signedUrl

    );

  if (error)

    throw error;

  return data;

};