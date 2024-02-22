// Basic functions that are used throughout the application
import useFlowsStore from '@/lib/store/opsFlowsStore';
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const initializeFlowsStore = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}opsflows`
    );
    const data = response.data
    useFlowsStore.getState().setFlows(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller
  }
};

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

export const getScheduled = async (district?: string) => {
  const address = district ? `${baseUrl}schedule?find:district=${district}&find:status=running,scheduled` : `${baseUrl}schedule?find:status=running,scheduled`;
  try {
    const response = await axios.get(address);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller
  }
}