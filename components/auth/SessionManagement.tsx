"use client";
// components/SessionManagement.js
import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useRoleStore } from '@/components/nav/RoleContext';
import { UserSessionData } from '@/lib/auth/fetchUserSession';
import LoadingAnimation from '@/features/testing/loader/loading.module';

interface SessionProviderProps {
  children: ReactNode;
}

interface SessionContextType {
  userSession: any; // Update with correct user type if needed
  verifySession: () => void;
}

// Create a SessionContext
const SessionContext = createContext<SessionContextType | null>(null);

// Hook to use the SessionContext
export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const { userData, setUser, clearUser, checkSession, setAuthenticated, setRoles, setPermissions, setError} = useAuthStore();
  const { setUserRole } = useRoleStore();
  const router = useRouter();

  // Handle role change
  const handleRoleChange = (role: string) => {
    setUserRole(role);
  };

    const badAuth = (error: any) => {
        handleRoleChange("Anonymous")
        clearUser();
        router.push('/');
        setError(error)
        console.log(error)
    }

  // Handle session authentication
  const handleAuth = (data: UserSessionData | null) => {
    if (data) {
            const dataId: string | null = data.id;
            const validSession = dataId != null;
            const mainRole = validSession ? data.roles[0] as string : "Anonymous";  
            //set the user
            if (validSession) {
                setUser(data); // Zustand store update 
                handleRoleChange(mainRole);
                setRoles(data.roles)
                setPermissions(data.permissions)
                setAuthenticated(validSession)
                setTimeout(() => {
                  setLoading(false)  
                }, 4000);
                
            } else { badAuth("Please Try Again") }
        } else {
            badAuth(data)
            setTimeout(() => {
              setLoading(false)  
            }, 4000);
        }
  };

  // UseMutation to validSession and regenerate session
  const verifySession = useMutation({
    mutationFn: async () => await checkSession(), // API call to validSession session
    onSuccess: (data: UserSessionData | null) => {
      handleAuth(data);
    },
    onError: (error) => {
      console.error('Error verifying session:', error);
      badAuth(error)
    },
  });

  // Verify session on mount using useEffect
  useEffect(() => {
    verifySession.mutate();
  }, []); // Empty dependency array ensures this runs once on mount

  // Provide session data and actions to the rest of the app
  return (
    <SessionContext.Provider value={{ userSession: userData, verifySession: verifySession.mutate }}>
      {isLoading ? <LoadingAnimation /> : children}
    </SessionContext.Provider>
  );
};
