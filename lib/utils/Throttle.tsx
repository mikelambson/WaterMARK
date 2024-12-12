import { useRef } from "react";

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
