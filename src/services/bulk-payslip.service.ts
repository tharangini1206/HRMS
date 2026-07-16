import {

  getPaidPayrollsRepository,

  getExistingPayslipRepository,

  createBulkPayslipRepository,

  updateBulkPayslipRepository,

  getBulkPayslipsRepository,

  getBulkPayslipByIdRepository,

  deleteBulkPayslipRepository

} from "../repositories/bulk-payslip.repository";

import {

  generatePayslipService

} from "./payslip.service";

/**
 * ==========================================
 * Generate Bulk Payslips
 * ==========================================
 */

export const generateBulkPayslipsService = async (

  monthYear: string,

  generatedBy: string

) => {

  /**
   * Start Timer
   */

  const startTime = Date.now();

  /**
   * Create Bulk History
   */

  const bulk =
    await createBulkPayslipRepository({

      payroll_month:
        new Date(monthYear).toLocaleString(
          "default",
          {
            month: "long"
          }
        ),

      payroll_year:
        new Date(monthYear).getFullYear(),

      generated_by:
        generatedBy,

      remarks:
        "Bulk payslip generation started.",

      total_employees: 0,

      generated_count: 0,

      skipped_count: 0,

      failed_count: 0,

      status: "PROCESSING",

      generated_at:
        new Date().toISOString(),

      started_at:
        new Date().toISOString()

    });

  /**
   * Get Paid Payrolls
   */

  const payrolls =
    await getPaidPayrollsRepository(
      monthYear
    );

  /**
   * No Payrolls
   */

  if (payrolls.length === 0) {

    await updateBulkPayslipRepository(

      bulk.public_id,

      {

        status: "FAILED",

        remarks:
          "No paid payrolls found.",

        completed_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString()

      }

    );

    throw new Error(

      "No paid payrolls found for this month."

    );

  }

  let generated = 0;

  let skipped = 0;

  let failed = 0;

  /**
   * Generate Payslips
   */

  for (const payroll of payrolls) {

    try {

      /**
       * Already Exists
       */

      const existing =
        await getExistingPayslipRepository(

          payroll.user_id,

          payroll.month_year

        );

      if (existing) {

        skipped++;

        continue;

      }

      /**
       * Generate Single Payslip
       */

      await generatePayslipService(

        payroll.public_id,

        generatedBy

      );

      generated++;

    }

    catch (error) {

      failed++;

      console.error(

        `Payslip generation failed for payroll ${payroll.public_id}`,

        error

      );

    }

  }

  /**
   * Time Taken
   */

  const endTime = Date.now();

  const timeTaken = Math.round(

    (endTime - startTime) / 1000

  );

  /**
   * Update Bulk History
   */

  await updateBulkPayslipRepository(

    bulk.public_id,

    {

      total_employees:
        payrolls.length,

      generated_count:
        generated,

      skipped_count:
        skipped,

      failed_count:
        failed,

      remarks:
        "Bulk payslip generation completed.",

      status:
        "COMPLETED",

      completed_at:
        new Date().toISOString(),

      updated_at:
        new Date().toISOString()

    }

  );

  /**
   * Response
   */

  return {

    total_employees:
      payrolls.length,

    generated,

    skipped,

    failed,

    status:
      "COMPLETED",

    time_taken:
      `${timeTaken} seconds`

  };

};

/**
 * ==========================================
 * Get All Bulk Payslips
 * ==========================================
 */

export const getBulkPayslipsService = async () => {

  return await getBulkPayslipsRepository();

};

/**
 * ==========================================
 * Get Bulk Payslip By Id
 * ==========================================
 */

export const getBulkPayslipByIdService = async (
  id: string
) => {

  const bulkPayslip =
    await getBulkPayslipByIdRepository(
      id
    );

  if (!bulkPayslip) {

    throw new Error(
      "Bulk payslip not found."
    );

  }

  return bulkPayslip;

};

/**
 * ==========================================
 * Delete Bulk Payslip
 * ==========================================
 */

export const deleteBulkPayslipService = async (
  id: string
) => {

  /**
   * Check Bulk Payslip
   */

  const bulkPayslip =
    await getBulkPayslipByIdRepository(
      id
    );

  if (!bulkPayslip) {

    throw new Error(
      "Bulk payslip not found."
    );

  }

  /**
   * Delete Record
   */

  return await deleteBulkPayslipRepository(
    id
  );

};