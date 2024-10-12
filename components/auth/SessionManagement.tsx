// components/SessionManagement.js
import { ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore'; // Adjust path as necessary
import Login from '@/components/auth/userLogin'; // Import the Login component

export const SessionManagement: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated, checkSession, setUser} = useAuthStore();

    if (!isAuthenticated) {
        // Render Login component if not authenticated
        checkSession()

    }

    return (
        <>
            {children} {/* Render children if authenticated */}
        </>
    );
};
