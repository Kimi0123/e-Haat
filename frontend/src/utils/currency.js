// Currency utility functions for e-Haat
export const formatCurrency = (amount, currency = "NPR") => {
  if (!amount || isNaN(amount)) return "Rs. 0";

  const formatter = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export const formatPrice = (amount) => {
  if (!amount || isNaN(amount)) return "Rs. 0";

  // For display purposes, format as Rs. 1,000
  const numAmount = parseFloat(amount);
  return `Rs. ${numAmount.toLocaleString("en-NP")}`;
};

export const parsePrice = (priceString) => {
  if (!priceString) return 0;

  // Remove Rs. and commas, then parse
  const cleanPrice = priceString.replace(/[Rs.,\s]/g, "");
  return parseFloat(cleanPrice) || 0;
};

export const CURRENCY_SYMBOL = "Rs.";
export const CURRENCY_CODE = "NPR";
