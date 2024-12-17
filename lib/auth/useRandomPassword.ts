// useRandomPassword.ts

import { useState, useCallback } from 'react';

export function useRandomPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const generateRandomPassword = useCallback(() => {
    const randomPass = Math.random().toString(36).slice(-8);
    setPassword(randomPass);
    setConfirmPassword("");
  }, []);

  const resetPasswords = useCallback(() => {
    setPassword("");
    setConfirmPassword("");
  }, []);

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    generateRandomPassword,
    resetPasswords,
  };
}
