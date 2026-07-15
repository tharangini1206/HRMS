'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { usePayroll } from '@/hooks/usePayroll';
import { PayrollStats } from '@/components/finance/payroll/PayrollStats';
import { PayrollTable } from '@/components/finance/payroll/PayrollTable';
import { PayrollCharts } from '@/components/finance/payroll/PayrollCharts';
import { GeneratePayslipModal } from '@/components/finance/payroll/GeneratePayslipModal';
import { PayslipPdfPreview } from '@/components/finance/Payslip/PayslipPreview';
import type { PayrollRecord, PayrollStatus, PayrollPaymentStatus } from '@/types/payroll';
import { PAYROLL_STATUSES, PAYROLL_PAYMENT_STATUSES } from '@/types/payroll';

export default function PayrollPage() {
  const { payrollQuery, createPayslipMutation, generateMutation, markPaidMutation } = usePayroll();
  const router = useRouter();
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [downloadRecord, setDownloadRecord] = useState<PayrollRecord | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadRef = useRef<HTMLDivElement | null>(null);

  const records = useMemo(() => payrollQuery.data ?? [], [payrollQuery.data]);

  const [DRAFT_STATUS, PROCESSING_STATUS, PROCESSED_STATUS, APPROVED_STATUS, PAID_STATUS] = PAYROLL_STATUSES;
  const [PENDING_PAYMENT_STATUS, SCHEDULED_PAYMENT_STATUS, PAID_PAYMENT_STATUS] = PAYROLL_PAYMENT_STATUSES;

  const summary = useMemo(() => ({
    totalPayroll: records.reduce((sum, record) => sum + record.grossSalary, 0),
    employeesProcessed: records.filter((record) => record.payrollStatus === PROCESSED_STATUS || record.payrollStatus === PAID_STATUS).length,
    pendingPayroll: records.filter((record) => record.payrollStatus === PROCESSING_STATUS).length,
    paidPayroll: records.filter((record) => record.paymentStatus === PAID_PAYMENT_STATUS).length,
  }), [records, PROCESSING_STATUS, PROCESSED_STATUS, PAID_STATUS, PAID_PAYMENT_STATUS]);

  const handleGeneratePayroll = () => {
    setGenerateModalOpen(true);
  };

  const handleCreatePayslip = (record: PayrollRecord) => {
    createPayslipMutation.mutate(record, {
      onSuccess: () => {
        setGenerateModalOpen(false);
        router.push(`/finance/payslip?selectedId=${encodeURIComponent(record.id)}`);
      },
    });
  };

  const handleView = (record: PayrollRecord) => {
    router.push(`/finance/payslip?selectedId=${encodeURIComponent(record.id)}`);
  };

  const handleDownload = (record: PayrollRecord) => {
    setDownloadRecord(record);
    setIsDownloading(true);
  };

  useEffect(() => {
    if (!downloadRecord || !isDownloading || !downloadRef.current) return;

    const downloadPayslipPdf = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const canvas = await html2canvas(downloadRef.current as HTMLElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;

        while (heightLeft > 0) {
          pdf.addPage();
          position = margin - (imgHeight - heightLeft);
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= pageHeight - margin * 2;
        }

        const filename = `Payslip_${downloadRecord.employeeId}_${downloadRecord.month.replace(/\s+/g, '')}.pdf`;
        pdf.save(filename);
      } catch (error) {
        console.error('Payslip PDF generation failed', error);
      } finally {
        setIsDownloading(false);
        setDownloadRecord(null);
      }
    };

    downloadPayslipPdf();
  }, [downloadRecord, isDownloading]);

  if (payrollQuery.isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading payroll dashboard...</div>;
  }

  if (payrollQuery.isError) {
    return <div className="p-6 text-sm text-red-600">Unable to load payroll data right now.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Payroll</p>
        <h1 className="text-3xl font-semibold text-slate-950">Enterprise payroll operations</h1>
        <p className="text-sm text-slate-500">Monitor payroll health, tax exposure, and payout readiness from a finance-grade command center.</p>
      </div>
      <PayrollStats summary={summary} />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
        <div className="space-y-5 text-slate-700">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"></p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Generate Monthly Payroll</h2>
          </div>
          <p className="text-sm leading-7">
            Process employee salaries for the selected payroll period. This will calculate earnings, deductions, statutory contributions, and create payslips for eligible employees.
          </p>
          <button
            type="button"
            onClick={handleGeneratePayroll}
            disabled={generateMutation.isPending}
            className="w-full max-w-xs rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {generateMutation.isPending ? 'Generating...' : 'Generate Payroll'}
          </button>
        </div>
      </div>
      <PayrollCharts />
      <PayrollTable records={records} onView={handleView} onDownload={handleDownload} />
      <div ref={downloadRef} className="pointer-events-none absolute left-[-9999px] top-0 opacity-0" style={{ width: '794px' }}>
        {downloadRecord ? <PayslipPdfPreview record={downloadRecord} /> : null}
      </div>
      <GeneratePayslipModal
        open={generateModalOpen}
        isLoading={createPayslipMutation.isPending}
        onClose={() => setGenerateModalOpen(false)}
        onCreate={handleCreatePayslip}
      />
    </div>
  );
}
