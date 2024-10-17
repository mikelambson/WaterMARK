"use client";
// components/SessionManagement.js
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useRoleStore } from '@/components/nav/RoleContext';
import { UserSessionData } from '@/lib/auth/fetchUserSession';

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
    let returnUser = {};
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
    const [liveUser, setLiveUser] = useState<UserSessionData>()
    const [loading, setLoading] = useState(true);  // Handle loading state
    const router = useRouter();
    const { setUserRole } = useRoleStore();

    const handleRoleChange = (role: string) => {
        setUserRole(role); // Update userRole when the role changes
    };

    const handleAuth = (data: UserSessionData | null) => {
        if ( data === null ) return;
        returnUser = data;
        setUser(data)
        setLiveUser(data);
    }

    // Function to check and regenerate session
    const verifySession = async () => {
        try {
            setLoading(true); // Ensure loading state is managed properly
            const result = await checkSession();
            handleAuth(result)

           
            const mainRole = result ? result.roles[0] as string : "Anonymous"
            handleRoleChange(mainRole);
           
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

        setTimeout(function() {
            setUser(returnUser as UserSessionData)
            console.log('component state: ', liveUser)
            console.log('List of Variables: ', { 
            returnUser,
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


