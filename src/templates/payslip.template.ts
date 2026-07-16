import { formatCurrency } from "../utils/currency";
import { getCompanyLogo } from "../utils/logo";

export const generatePayslipTemplate = (
  payroll: any,
  employee: any
) => {

    const companyLogo = getCompanyLogo();
    
  return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<style>

body{
    font-family:Arial,sans-serif;
    padding:30px;
    color:#333;
}

.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:2px solid #ff4d4f;
    padding-bottom:20px;
}

.company{
    font-size:28px;
    font-weight:bold;
}

.title{
    margin-top:25px;
    text-align:center;
    font-size:24px;
    font-weight:bold;
}

table{
    width:100%;
    border-collapse:collapse;
}

td{
    padding:8px;
    border:1px solid #ddd;
}

th{
    padding:10px;
    background:#ff4d4f;
    color:white;
    border:1px solid #ddd;
}

.section{
    margin-top:25px;
}

.summary{
    margin-top:30px;
}

.footer{
    margin-top:50px;
    text-align:center;
    font-size:12px;
    color:#777;
}

</style>

</head>

<body>

<div class="header">

<div>

<div style="display:flex;align-items:center;gap:15px;">

<img
src="${companyLogo}"
style="height:70px;width:auto;"
/>

<div>

<h2 style="margin:0;">
COFOMO TECH
</h2>

<div>
Employee Payroll Management System
</div>

</div>

</div>

<div>

Employee Payroll Management System

</div>

</div>

<div>

<h3>PAYSLIP</h3>

</div>

</div>

<div class="section">

<table>

<tr>

<td><b>Employee ID</b></td>

<td>${employee.employee_id}</td>

<td><b>Month</b></td>

<td>${payroll.month_year}</td>

</tr>

<tr>

<td><b>Employee Name</b></td>

<td>${employee.first_name} ${employee.last_name}</td>

<td><b>Status</b></td>

<td>${payroll.status}</td>

</tr>

<tr>

<td><b>Email</b></td>

<td>${employee.email}</td>

<td><b>Phone</b></td>

<td>${employee.phone ?? "-"}</td>

</tr>

</table>

</div>

<div class="section">

<table>

<tr>

<th>Earnings</th>

<th>Amount</th>

<th>Deductions</th>

<th>Amount</th>

</tr>

<tr>

<td>Basic</td>

<td>${formatCurrency(payroll.basic)}</td>

<td>PF Employee</td>

<td>${formatCurrency(payroll.pf_employee)}</td>

</tr>

<tr>

<td>HRA</td>

<td>${formatCurrency(payroll.hra)}</td>

<td>ESI Employee</td>

<td>${formatCurrency(payroll.esi_employee)}</td>

</tr>

<tr>

<td>Special Allowance</td>

<td>${formatCurrency(payroll.special_allowance)}</td>

<td>Professional Tax</td>

<td>${formatCurrency(payroll.professional_tax)}</td>

</tr>

<tr>

<td>Bonus</td>

<td>${formatCurrency(payroll.bonus)}</td>

<td>TDS(Income Tax)</td>

<td>${formatCurrency(payroll.income_tax)}</td>

</tr>

<tr>

<td>Gratuity</td>

<td>${formatCurrency(payroll.gratuity)}</td>

</tr>

<tr>

<td>Custom Earnings</td>

<td>${formatCurrency(payroll.custom_earnings)}</td>

<td>LOP Deduction</td>

<td>${formatCurrency(payroll.lop_deduction)}</td>

</tr>

<tr>

<td></td>

<td></td>

<td>Custom Deductions</td>

<td>${formatCurrency(payroll.custom_deductions)}</td>

</tr>

<tr>

<td></td>

<td></td>

<td>Other Deductions</td>

<td>${formatCurrency(payroll.other_deductions)}</td>

</tr>

<tr>

<th>Total Earnings</th>

<th>${formatCurrency(payroll.total_earnings)}</th>

<th>Total Deductions</th>

<th>${formatCurrency(payroll.total_deductions)}</th>

</tr>

</table>

</div>

<div class="section">

<table>

<tr>

<td><b>Working Days</b></td>

<td>${payroll.working_days}</td>

<td><b>Present Days</b></td>

<td>${payroll.present_days}</td>

</tr>

<tr>

<td><b>Absent Days</b></td>

<td>${payroll.absent_days}</td>

<td><b>LOP Days</b></td>

<td>${payroll.lop_days}</td>

</tr>

</table>

</div>

<div class="summary">

<table>

<tr>

<td><b>Gross Pay</b></td>

<td>${formatCurrency(payroll.gross_pay)}</td>

</tr>

<tr>

<td><b>Net Pay</b></td>

<td>

<b style="color:green;">

${formatCurrency(payroll.net_pay)}

</b>

</td>

</tr>

</table>

</div>

<div class="footer">

This is a system generated payslip.

<br><br>

© COFOMO TECH HRMS

</div>

</body>

</html>

`;

};