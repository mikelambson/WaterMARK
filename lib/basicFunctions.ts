// Basic functions that are used throughout the application
import useFlowsStore from '@/lib/store/opsFlowsStore';
import axios from "axios";
import { parseISO } from 'date-fns';

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
    // Sort the data based on the specified criteria
    data.sort((a: any, b: any) => {
      if (a.order.status === 'running' && b.order.status !== 'running') {
        return -1; // a comes first
      } else if (a.order.status !== 'running' && b.order.status === 'running') {
        return 1; // b comes first
      } else {
        // Both have the same status or no 'running' status, sort by scheduledDate
        return parseISO(a.scheduledDate).getTime() - parseISO(b.scheduledDate).getTime();
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller
  }
}