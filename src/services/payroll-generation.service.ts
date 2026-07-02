import {

  getEmployeeSalaryRepository,

  getSalaryComponentsRepository,

  checkPayrollExistsRepository,

  createPayrollRepository,

  getPayrollGenerationsRepository

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
   * Get Employee Salary
   */

  const employeeSalary =
    await getEmployeeSalaryRepository(

      body.user_id

    );

  /**
   * Get Salary Components
   */

  const salaryComponents =
    await getSalaryComponentsRepository(

      body.user_id

    );

  /**
   * Attendance
   * (Temporary until Attendance module is integrated)
   */

  const workingDays = 30;

  const presentDays = 30;

  const absentDays = 0;

  const lopDeduction = 0;

  /**
   * Monthly Salary
   */

  const monthlySalary =
    Number(employeeSalary.monthly_ctc);

  /**
   * Earnings
   */

  const basic =
    (monthlySalary *
      Number(employeeSalary.basic_percentage)) / 100;

  const hra =
    (monthlySalary *
      Number(employeeSalary.hra_percentage)) / 100;

  const specialAllowance =
    Number(employeeSalary.special_allowance);

  const conveyance =
    Number(employeeSalary.conveyance);

  const medical =
    Number(employeeSalary.medical);

  let totalEarnings =
    basic +
    hra +
    specialAllowance +
    conveyance +
    medical;

  /**
   * Deductions
   */

  const pfEmployee =
    (basic *
      Number(employeeSalary.pf_employee_percentage)) / 100;

  const pfEmployer =
    (basic *
      Number(employeeSalary.pf_employer_percentage)) / 100;

  const esiEmployee =
    (monthlySalary *
      Number(employeeSalary.esi_employee_percentage)) / 100;

  const esiEmployer =
    (monthlySalary *
      Number(employeeSalary.esi_employer_percentage)) / 100;

  const professionalTax =
    Number(employeeSalary.professional_tax_monthly);

  const tdsDeduction = 0;

  let otherDeductions = 0;

  /**
   * Salary Components
   */

  salaryComponents.forEach((component: any) => {

    if (component.component_type === "earnings") {

      if (component.component_name !== "Basic Salary" &&
          component.component_name !== "HRA") {

        if (component.is_percentage) {

          totalEarnings +=
            (monthlySalary *
              Number(component.percentage_value)) / 100;

        } else {

          totalEarnings +=
            Number(component.amount);

        }

      }

    }

    if (component.component_type === "deductions") {

      if (component.is_percentage) {

        otherDeductions +=
          (monthlySalary *
            Number(component.percentage_value)) / 100;

      } else {

        otherDeductions +=
          Number(component.amount);

      }

    }

    /**
     * Ignore Statutory Components
     * Already calculated from employee_salary
     */

  });

  /**
   * Total Deductions
   */

  const totalDeductions =
    pfEmployee +
    esiEmployee +
    professionalTax +
    tdsDeduction +
    lopDeduction +
    otherDeductions;

  /**
   * Gross & Net
   */

  const grossPay =
    totalEarnings;

  const netPay =
    grossPay -
    totalDeductions;

  console.log("Processed By :", processedBy);

  /**
   * Save Payroll
   */

  return await createPayrollRepository({

    user_id: body.user_id,

    month_year: body.month_year,

    basic,

    hra,

    special_allowance: specialAllowance,

    conveyance,

    medical,

    total_earnings: totalEarnings,

    pf_employee: pfEmployee,

    pf_employer: pfEmployer,

    esi_employee: esiEmployee,

    esi_employer: esiEmployer,

    professional_tax: professionalTax,

    tds_deduction: tdsDeduction,

    lop_deduction: lopDeduction,

    other_deductions: otherDeductions,

    gross_pay: grossPay,

    net_pay: netPay,

    working_days: workingDays,

    present_days: presentDays,

    absent_days: absentDays,

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