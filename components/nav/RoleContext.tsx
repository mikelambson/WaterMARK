"use client";
import { create } from "zustand";
import React, { createContext, useContext, ReactNode } from "react";

interface RoleState {
  userRole: string;
  setUserRole: (role: string) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  userRole: "Anonymous",
  setUserRole: (role: string) => set({ userRole: role }),
}));

const RoleContext = createContext<RoleState | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [userRole, setUserRole] = useState<string>("Watermaster");

  return (
    <RoleContext.Provider value={useRoleStore() }>
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
