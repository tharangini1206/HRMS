/**
 * ==========================================
 * Format Currency (INR)
 * ==========================================
 */

export const formatCurrency = (
  amount: number
): string => {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2
    }
  ).format(Number(amount));

};