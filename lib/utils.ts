// \lib\utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPhoneNumber = (phoneNumber: any) => {
  // Assuming phone numbers are always 10 digits
  const areaCode = phoneNumber.slice(0, 3);
  const firstPart = phoneNumber.slice(3, 6);
  const secondPart = phoneNumber.slice(6);
  
  return `(${areaCode}) ${firstPart}-${secondPart}`;
};

export const calculateNewScheduleTimestamp = (currentTimestamp: string, duration: number): string => {
  const convertedDate = new Date(currentTimestamp);
  convertedDate.setHours(convertedDate.getHours() + duration);
  return convertedDate.toISOString();
};


