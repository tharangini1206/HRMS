import {

  getEmployeeSalaryRepository,

  getStatutoryConfigRepository,

  getSalaryComponentsRepository,

  checkPayrollExistsRepository,

  createPayrollRepository,

  getPayrollGenerationsRepository,

  getPayrollGenerationByIdRepository,

  getPayrollGenerationsByUserRepository,

  markPayrollPaidRepository,

  updatePayrollStatusRepository,

  deletePayrollGenerationRepository,

  getPayrollAttendanceRepository,


} from "../repositories/payroll-generation.repository";

/**
 * Generate Payroll
 */

export const generatePayrollService = async (

  body: any,

  processedBy: string

) => {

  /**
   * Check Duplicate Payroll
   */

  const existingPayroll =
    await checkPayrollExistsRepository(

      body.user_id,

      body.month_year

    );

  if (existingPayroll) {

    throw new Error(

      "Payroll already generated for this employee for this month."

    );

  }

  /**
   * Employee Salary
   */

  const employeeSalary =
    await getEmployeeSalaryRepository(

      body.user_id

    );

  /**
   * Statutory Configuration
   */

  const statutoryConfig =
    await getStatutoryConfigRepository();

  /**
   * Salary Components
   */

  const salaryComponents =
    await getSalaryComponentsRepository(

      body.user_id,

      body.month_year

    );

  /**
   * Attendance
   */

  const month =
    new Date(body.month_year).getMonth() + 1;

  const year =
    new Date(body.month_year).getFullYear();

  const attendance =
    await getPayrollAttendanceRepository(

      body.user_id,

      month,

      year

    );

  const workingDays =
    attendance.workingDays;

  const presentDays =
    attendance.presentDays;

  const absentDays =
    attendance.absentDays;

  const halfDays =
    attendance.halfDays;

  /**
   * Salary
   */

  const fixedGross =
    Number(employeeSalary.fixed_gross_monthly);

  const dailyGross =
    Number(employeeSalary.daily_gross);

  const annualIncomeTax =
    Number(employeeSalary.annual_income_tax);

  /**
   * Percentages
   */

  const basicPercentage =
    Number(statutoryConfig.basic_percentage);

  const hraPercentage =
    Number(statutoryConfig.hra_percentage);

  const specialAllowancePercentage =
    Number(

      statutoryConfig.special_allowance_percentage

    );

  const bonusPercentage =
    Number(statutoryConfig.bonus_percentage);

  const gratuityPercentage =
    Number(statutoryConfig.gratuity_percentage);

  const pfEmployeePercentage =
    Number(

      statutoryConfig.pf_employee_percentage

    );

  const pfEmployerPercentage =
    Number(

      statutoryConfig.pf_employer_percentage

    );

  const esiEmployeePercentage =
    Number(

      statutoryConfig.esi_employee_percentage

    );

  const esiEmployerPercentage =
    Number(

      statutoryConfig.esi_employer_percentage

    );

  const professionalTax =
    Number(

      statutoryConfig.professional_tax

    );
    /**
   * Earnings
   */

  const basic =
    fixedGross *
    (basicPercentage / 100);

  const hra =
    basic *
    (hraPercentage / 100);

  const specialAllowance =
    basic *
    (specialAllowancePercentage / 100);

  const bonus =
    fixedGross *
    (bonusPercentage / 100);

  const gratuity =
    fixedGross *
    (gratuityPercentage / 100);

  /**
   * Custom Components
   */

  let customEarnings = 0;

  let customDeductions = 0;

  salaryComponents.forEach(

    (component: any) => {

      /**
       * Earnings
       */

      if (

        component.component_type === "earnings"

      ) {

        if (

          component.is_percentage

        ) {

          customEarnings +=

            fixedGross *

            (

              Number(

                component.percentage_value

              ) / 100

            );

        }

        else {

          customEarnings +=

            Number(

              component.amount

            );

        }

      }

      /**
       * Statutory
       */

      if (

        component.component_type === "statutory"

      ) {

        if (

          component.is_percentage

        ) {

          customEarnings +=

            fixedGross *

            (

              Number(

                component.percentage_value

              ) / 100

            );

        }

        else {

          customEarnings +=

            Number(

              component.amount

            );

        }

      }

      /**
       * Deductions
       */

      if (

        component.component_type === "deductions"

      ) {

        if (

          component.is_percentage

        ) {

          customDeductions +=

            fixedGross *

            (

              Number(

                component.percentage_value

              ) / 100

            );

        }

        else {

          customDeductions +=

            Number(

              component.amount

            );

        }

      }

    }

  );

  /**
   * Total Earnings
   */

  const totalEarnings =

    basic +

    hra +

    specialAllowance +

    bonus +

    gratuity +

    customEarnings;

      /**
   * PF
   */

  const pfEmployee =
    basic *
    (pfEmployeePercentage / 100);

  const pfEmployer =
    basic *
    (pfEmployerPercentage / 100);

  /**
   * ESI
   */

  const esiEmployee =
    basic *
    (esiEmployeePercentage / 100);

  const esiEmployer =
    basic *
    (esiEmployerPercentage / 100);

  /**
   * Income Tax
   */

  const incomeTax =
    Math.round(annualIncomeTax / 12);

  /**
   * LOP
   */

  const lopDays =

    absentDays +

    (halfDays * 0.5);

  const lopDeduction =

    lopDays *

    dailyGross;

  /**
   * TDS
   */

  const tdsDeduction = incomeTax;

  /**
   * Other Deductions
   */

  const otherDeductions = 0;

  /**
   * Total Deductions
   */

  const totalDeductions =

    pfEmployee +

    pfEmployer +

    esiEmployee +

    esiEmployer +

    professionalTax +

    customDeductions +

    tdsDeduction +

    otherDeductions +

    lopDeduction;

  /**
   * Gross Pay
   */

  const grossPay =
    totalEarnings;

  /**
   * Net Pay
   */

  const netPay =

    grossPay -

    totalDeductions;

      /**
   * Save Payroll
   */

  return await createPayrollRepository({

    user_id: body.user_id,

    month_year: body.month_year,

    fixed_gross: fixedGross,

    basic,

    hra,

    special_allowance: specialAllowance,

    bonus,

    gratuity,

    pf_employee: pfEmployee,

    pf_employer: pfEmployer,

    esi_employee: esiEmployee,

    esi_employer: esiEmployer,

    professional_tax: professionalTax,

    income_tax: incomeTax,

    tds_deduction: tdsDeduction,

    lop_deduction: lopDeduction,

    other_deductions: otherDeductions,

    custom_earnings: customEarnings,

    custom_deductions: customDeductions,

    total_earnings: totalEarnings,

    total_deductions: totalDeductions,

    gross_pay: grossPay,

    net_pay: netPay,

    working_days: workingDays,

    present_days: presentDays,

    absent_days: absentDays,

    lop_days: lopDays,

    status: "processed",

    processed_by: processedBy,

    processed_at: new Date().toISOString()

  });

};

/**
 * Get All Payrolls
 */

export const getPayrollGenerationsService = async () => {

  return await getPayrollGenerationsRepository();

};

/**
 * Get Payroll By Id
 */

export const getPayrollGenerationByIdService = async (
  id: string
) => {

  return await getPayrollGenerationByIdRepository(
    id
  );

};

/**
 * Get Payrolls By User
 */

export const getPayrollGenerationsByUserService = async (
  userId: string
) => {

  return await getPayrollGenerationsByUserRepository(
    userId
  );

};

/**
 * Mark Payroll Paid
 */

export const markPayrollPaidService = async (

  id: string,

  paymentId: string

) => {

  const payroll =
    await getPayrollGenerationByIdRepository(id);

  if (!payroll) {

    throw new Error(
      "Payroll not found."
    );

  }

  if (payroll.status !== "approved") {

    throw new Error(
      "Only approved payroll can be marked as paid."
    );

  }

  return await markPayrollPaidRepository(

    id,

    paymentId

  );

};

/**
 * Approve Payroll
 */

export const approvePayrollService = async (
  id: string
) => {

  const payroll =
    await getPayrollGenerationByIdRepository(id);

  if (!payroll) {

    throw new Error(
      "Payroll not found."
    );

  }

  if (payroll.status !== "processed") {

    throw new Error(
      "Only processed payroll can be approved."
    );

  }

  return await updatePayrollStatusRepository(

    id,

    "approved"

  );

};

/**
 * Reject Payroll
 */

export const rejectPayrollService = async (
  id: string
) => {

  const payroll =
    await getPayrollGenerationByIdRepository(id);

  if (!payroll) {

    throw new Error(
      "Payroll not found."
    );

  }

  if (payroll.status !== "processed") {

    throw new Error(
      "Only processed payroll can be rejected."
    );

  }

  return await updatePayrollStatusRepository(

    id,

    "failed"

  );

};

/**
 * Delete Payroll
 */

export const deletePayrollGenerationService = async (
  id: string
) => {

  return await deletePayrollGenerationRepository(
    id
  );

};