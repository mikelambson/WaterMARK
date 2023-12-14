export const formatNumber = (number?: number): string => {
    // Check if the number is undefined, and return an empty string or handle it as needed
    if (number === undefined) {
      return "";
    }
  
    const numberString = number.toString();
    // Use toFixed to ensure two digits of precision for all real numbers
    return parseFloat(numberString).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };