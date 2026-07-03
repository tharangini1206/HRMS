import fs from "fs";

import {

  getPayrollByIdRepository,

  getPayslipRepository,

  createPayslipRepository,

  getEmployeePayslipsRepository,

  getPayslipByIdRepository
  

} from "../repositories/payslip.repository";

import { supabase } from "../config/supabase";

import { generatePayslipTemplate } from "../templates/payslip.template";

import { generatePDF } from "../utils/pdf-generator";

import {

  uploadPayslipToStorage,

  getPayslipSignedUrl

} from "../utils/supabase-storage";

/**
 * Generate Payslip
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

  /**
   * Payroll Exists
   */

  if (!payroll) {

    throw new Error(

      "Payroll not found."

    );

  }

  /**
   * Employee
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

  if (

    existingPayslip

  ) {

    throw new Error(

      "Payslip already generated."

    );

  }

  /**
   * HTML
   */

  const html =
    generatePayslipTemplate(

      payroll,

      employee

    );

  /**
   * PDF
   */

  const fileName =

    `${employee.employee_id}_${payroll.month_year}`;

  const pdfPath =
    await generatePDF(

      html,

      fileName

    );

  /**
   * File Size
   */

  const fileSize =
    fs.statSync(

      pdfPath

    ).size;

  /**
   * Upload Storage
   */

  const storagePath =
    await uploadPayslipToStorage(

      pdfPath,

      fileName

    );

  /**
   * Save Payslip
   */

  const payslip =
    await createPayslipRepository({

      user_id:

        payroll.user_id,

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
   * Signed URL
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
 * Get Employee Payslips
 */

export const getEmployeePayslipsService = async (

  userId: string

) => {

  return await getEmployeePayslipsRepository(

    userId

  );

};

/**
 * Download Payslip
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

    download_url: signedUrl

  };

};