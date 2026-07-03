import express from "express";

import roleRoutes from "./role.routes";
import departmentRoutes from "./department.routes";
import designationRoutes from "./designation.routes";
import authRoutes from "./auth.routes";
import employeeRoutes from "./employee.routes";
import onboardingRoutes from "./onboarding.routes";
import payrollRoutes from "./payroll.routes";
import salaryComponentRoutes from "./salary-component.routes";
import attendanceRoutes from "./attendance.routes";
import payrollGenerationRoutes from "./payroll-generation.routes";
import payslipRoutes from "./payslip.routes";
import salaryStatementRoutes from "./salary-statement.routes";


import resignationRoutes from "./resignation.routes";
import settlementRoutes from "./settlement.routes";
import performanceRoutes from "./performance.routes";
import feedbackRoutes from "./feedback.routes";
import pipRoutes from "./pip.routes";
import helpdeskRoutes from "./helpdesk.routes";
import messageRoutes from "./message.routes";

const router = express.Router();

router.use("/roles",roleRoutes);
router.use("/departments", departmentRoutes);
router.use("/designations", designationRoutes);
router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/onboarding", onboardingRoutes);
router.use("/payroll", payrollRoutes);
router.use("/salary-components", salaryComponentRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/payroll-generation",payrollGenerationRoutes);
router.use("/payslip",payslipRoutes);
router.use("/salary-statements",salaryStatementRoutes);



router.use("/resignation", resignationRoutes);
router.use("/settlement", settlementRoutes);
router.use("/performance", performanceRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/pip", pipRoutes);
router.use("/helpdesk", helpdeskRoutes);
router.use("/messages", messageRoutes);

export default router;