"use client";
import { create } from "zustand";
import React, { createContext, useContext, ReactNode } from "react";

interface RoleState {
  userRole: string[];
  setUserRole: (roles: string[]) => void; // Accepts an array of roles
  addUserRole: (role: string) => void;    // Add a role
  removeUserRole: (role: string) => void; // Remove a role
}

export const useRoleStore = create<RoleState>((set) => ({
  userRole: ["Anonymous"],
  setUserRole: (roles: string[]) => set({ userRole: roles }),
  addUserRole: (role: string) =>
    set((state) => ({
      userRole: state.userRole.includes(role) ? state.userRole : [...state.userRole, role],
    })),
  removeUserRole: (role: string) =>
    set((state) => ({
      userRole: state.userRole.filter((r) => r !== role),
    })),
}));

const RoleContext = createContext<RoleState | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <RoleContext.Provider value={useRoleStore()}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
