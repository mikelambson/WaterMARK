// components/SessionManagement.js
import { ReactNode } from 'react';
import useAuthStore from '@/lib/store/authStore'; // Adjust path as necessary
import Login from '@/components/auth/Login'; // Import the Login component

export const SessionManagement: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Login />; // Render Login component if not authenticated
    }

    return (
        <>
            {children} {/* Render children if authenticated */}
        </>
    );
};
