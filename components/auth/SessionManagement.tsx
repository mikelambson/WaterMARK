"use client";
// components/SessionManagement.js
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useRoleStore } from '@/components/nav/RoleContext';

interface SessionProviderProps {
    children: ReactNode;
}

interface SessionContextType {
    userSession: any; // Update with correct user type if needed
    verifySession: () => Promise<void>;
}

// Create a SessionContext
const SessionContext = createContext<SessionContextType | null>(null);

// Hook to use the SessionContext
export const useSession = () => useContext(SessionContext);

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const { 
        userData, 
        isAuthenticated, 
        roles, 
        permissions, 
        error, 
        checkSession, 
        setUser, 
        clearUser,
        setAuthenticated  } = useAuthStore();
    const [loading, setLoading] = useState(true);  // Handle loading state
    const router = useRouter();
    const { setUserRole } = useRoleStore();

    const handleRoleChange = (role: string) => {
        setUserRole(role); // Update userRole when the role changes
    };

    // Function to check and regenerate session
    const verifySession = async () => {
        try {
            setLoading(true); // Ensure loading state is managed properly
            const result = await checkSession();
            console.log(result)
            setUser(result)
            result && setAuthenticated(true)
            handleRoleChange(result?.roles[0] as string);
           
            if (!result) {
                clearUser();
                router.push('/');
            }
        } catch (error) {
            console.error('Error verifying session:', error);
            clearUser();
            router.push('/');
        } finally {
            setLoading(false);
        }
    };

    // Initial check on page load
    useEffect(() => {
        verifySession(); 
        setTimeout(function() {console.log('List of Variables: ', { 
            userData,
            isAuthenticated,
            roles,
            permissions,
            error,
        })}, 3000);
        
        // Verify session on mount
    }, []);

    // Provide session data and actions to the rest of the app
    return (
        <SessionContext.Provider value={{ userSession: userData, verifySession }}>
            {/* {!loading ? children : <p>Loading...</p>} */}
            {children}
        </SessionContext.Provider>
    );
};


