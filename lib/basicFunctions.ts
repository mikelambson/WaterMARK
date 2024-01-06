export const formatNumber = (number?: number | null): string => {
  // Check if the number is undefined or null, and return an empty string or handle it as needed
  if (number === undefined || number === null) {
    return "";
  }

  const numberString = number.toString();
  const hasDecimal = numberString.includes('.');

  // Use toFixed to ensure two digits of precision for numbers with a decimal point
  const formattedNumber = hasDecimal
    ? parseFloat(numberString).toFixed(2)
    : parseFloat(numberString).toString();

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
