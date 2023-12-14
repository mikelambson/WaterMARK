export const formatNumber = (number?: number | null): string => {
  // Check if the number is undefined or null, and return an empty string or handle it as needed
  if (number === undefined || number === null) {
    return "";
  }

  const numberString = number.toString();
  // Use toFixed to ensure two digits of precision for all real numbers
  return parseFloat(numberString).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
