export const generatePayslipTemplate = (
  payroll: any,
  employee: any
) => {

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

.logo{

    font-size:32px;

    font-weight:bold;

    color:#ff4d4f;

}

.company{

    font-size:28px;

    font-weight:bold;

    color:#000;

}

.title{

    margin-top:20px;

    text-align:center;

    font-size:26px;

    font-weight:bold;

}

.employee{

    margin-top:30px;

}

.employee table{

    width:100%;

}

.employee td{

    padding:8px;

}

.section{

    margin-top:30px;

}

table{

    width:100%;

    border-collapse:collapse;

}

th{

    background:#ff4d4f;

    color:white;

    padding:10px;

}

td{

    border:1px solid #ddd;

    padding:10px;

}

.summary{

    margin-top:25px;

}

.footer{

    margin-top:50px;

    text-align:center;

    color:#888;

    font-size:12px;

}

</style>

</head>

<body>

<div class="header">

<div>

<div class="company">

COFOMO <span style="color:#ff4d4f;">TECH</span>

</div>

<div>

Employee Payroll Management System

</div>

</div>

<div>

<img
src="https://www.cofomotech.com/assets/images/Logo.jpeg"
width="180"
/>

</div>

</div>

<div class="title">

PAYSLIP

</div>

<div class="employee">

<table>

<tr>

<td>

<b>Employee ID</b>

</td>

<td>

${employee.public_id ?? "-"}

</td>

<td>

<b>Month</b>

</td>

<td>

${payroll.month_year}

</td>

</tr>

<tr>

<td>

<b>Name</b>

</td>

<td>

${employee.full_name ?? "-"}

</td>

<td>

<b>Status</b>

</td>

<td>

${payroll.status}

</td>

</tr>

</table>

</div>

<div class="section">

<table>

<tr>

<th>EARNINGS</th>

<th>AMOUNT</th>

<th>DEDUCTIONS</th>

<th>AMOUNT</th>

</tr>

<tr>

<td>Basic</td>

<td>${payroll.basic}</td>

<td>PF Employee</td>

<td>${payroll.pf_employee}</td>

</tr>

<tr>

<td>HRA</td>

<td>${payroll.hra}</td>

<td>ESI Employee</td>

<td>${payroll.esi_employee}</td>

</tr>

<tr>

<td>Special Allowance</td>

<td>${payroll.special_allowance}</td>

<td>Professional Tax</td>

<td>${payroll.professional_tax}</td>

</tr>

<tr>

<td>Conveyance</td>

<td>${payroll.conveyance}</td>

<td>TDS</td>

<td>${payroll.tds_deduction}</td>

</tr>

<tr>

<td>Medical</td>

<td>${payroll.medical}</td>

<td>LOP</td>

<td>${payroll.lop_deduction}</td>

</tr>

<tr>

<td colspan="2"></td>

<td>Other Deductions</td>

<td>${payroll.other_deductions}</td>

</tr>

<tr>

<th>Total Earnings</th>

<th>

${payroll.total_earnings}

</th>

<th>Total Deductions</th>

<th>

${payroll.total_deductions}

</th>

</tr>

</table>

</div>

<div class="summary">

<table>

<tr>

<td>

<b>Gross Pay</b>

</td>

<td>

${payroll.gross_pay}

</td>

</tr>

<tr>

<td>

<b>Net Pay</b>

</td>

<td>

<b style="color:green;">

${payroll.net_pay}

</b>

</td>

</tr>

</table>

</div>

<div class="footer">

This is a system generated payslip.

<br><br>

COFOMO TECH HRMS

</div>

</body>

</html>

`;

};