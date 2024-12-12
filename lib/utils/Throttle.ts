import { useRef } from "react";

/**
 * Throttle hook
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 * @example
 * const throttledFunction = useThrottle(() => console.log("Throttled function"), 1000);
 * throttledFunction(); // Will call the function
 */ 

export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const lastExecuted = useRef<number>(0);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastExecuted.current >= delay) {
      callback(...args);
      lastExecuted.current = now;
    }
  };
};
