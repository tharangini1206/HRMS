import fs from "fs";

import {
  getPayrollByIdRepository,
  getPayslipRepository,
  createPayslipRepository,
  getEmployeePayslipsRepository,
  getPayslipByIdRepository,
  getAllPayslipsRepository,
  deletePayslipRepository
} from "../repositories/payslip.repository";

import { supabase } from "../config/supabase";

import { generatePayslipTemplate } from "../templates/payslip.template";

import { generatePDF } from "../utils/pdf-generator";

import {
  uploadPayslipToStorage,
  getPayslipSignedUrl,
  deletePayslipFromStorage
} from "../utils/supabase-storage";

/**
 * ==========================================
 * Generate Payslip
 * ==========================================
 */

export const generatePayslipService = async (
  payrollId: string,
  generatedBy: string
) => {

  /**
   * Get Payroll
   */

  const payroll =
    await getPayrollByIdRepository(
      payrollId
    );

  if (!payroll) {

    throw new Error(
      "Payroll not found."
    );

  }

  /**
   * Payroll Status Check
   */

  if (
    payroll.status  !== "approved" &&
    payroll.status  !== "paid"
  ) {

    throw new Error(
      "Payslip can be generated only for approved or paid payroll."
    );

  }

  /**
   * Get Employee
   */

  const {
    data: employee,
    error: employeeError
  } = await supabase
    .from("users")
    .select("*")
    .eq(
      "auth_user_id",
      payroll.user_id
    )
    .single();

  if (
    employeeError ||
    !employee
  ) {

    throw new Error(
      "Employee not found."
    );

  }

  /**
   * Already Generated
   */

  const existingPayslip =
    await getPayslipRepository(
      payroll.user_id,
      payroll.month_year
    );

  if (existingPayslip) {

    throw new Error(
      "Payslip already generated."
    );

  }

  /**
   * HTML Template
   */

  const html =
    generatePayslipTemplate(
      payroll,
      employee
    );

  /**
   * File Name
   */

  const fileName =
    `${employee.employee_id}_${payroll.month_year}_${Date.now()}`;

  /**
   * Generate PDF
   */

  const pdfPath =
    await generatePDF(
      html,
      fileName
    );

  /**
   * File Size
   */

  const fileSize =
    fs.statSync(pdfPath).size;

  /**
   * Upload To Storage
   */

  const storagePath =
    await uploadPayslipToStorage(
      pdfPath,
      fileName
    );

  /**
   * Delete Local PDF
   */

  if (fs.existsSync(pdfPath)) {

    fs.unlinkSync(pdfPath);

  }

  /**
   * Save Payslip
   */

  const payslip =
    await createPayslipRepository({

      user_id:
        payroll.user_id,

      payroll_id:
        payroll.id,

      month_year:
        payroll.month_year,

      file_url:
        storagePath,

      file_size:
        fileSize,

      mime_type:
        "application/pdf",

      generated_by:
        generatedBy,

      generated_at:
        new Date().toISOString()

    });

  /**
   * Generate Signed URL
   */

  const signedUrl =
    await getPayslipSignedUrl(
      storagePath
    );

  return {

    payslip,

    download_url:
      signedUrl

  };

};

/**
 * ==========================================
 * Get Employee Payslips
 * ==========================================
 */

export const getEmployeePayslipsService = async (
  userId: string
) => {

  return await getEmployeePayslipsRepository(
    userId
  );

};

/**
 * ==========================================
 * Download Payslip
 * ==========================================
 */

export const getPayslipDownloadService = async (
  payslipId: string
) => {

  /**
   * Get Payslip
   */

  const payslip =
    await getPayslipByIdRepository(
      payslipId
    );

  if (!payslip) {

    throw new Error(
      "Payslip not found."
    );

  }

  /**
   * Signed URL
   */

  const signedUrl =
    await getPayslipSignedUrl(
      payslip.file_url
    );

  return {

    download_url:
      signedUrl

  };

};

/**
 * ==========================================
 * Get All Payslips
 * ==========================================
 */

export const getAllPayslipsService = async () => {

  return await getAllPayslipsRepository();

};

/**
 * ==========================================
 * Get Payslip By Id
 * ==========================================
 */

export const getPayslipByIdService = async (
  id: string
) => {

  const payslip =
    await getPayslipByIdRepository(
      id
    );

  if (!payslip) {

    throw new Error(
      "Payslip not found."
    );

  }

  return payslip;

};

/**
 * ==========================================
 * Delete Payslip
 * ==========================================
 */

export const deletePayslipService = async (
  id: string
) => {

  /**
   * Get Payslip
   */

  const payslip =
    await getPayslipByIdRepository(
      id
    );

  if (!payslip) {

    throw new Error(
      "Payslip not found."
    );

  }

  /**
   * Delete PDF From Storage
   */

  await deletePayslipFromStorage(
    payslip.file_url
  );

  /**
   * Delete Database Record
   */

  return await deletePayslipRepository(
    id
  );

};