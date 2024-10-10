// store/useAuthStore.js
import { create } from 'zustand';
import { fetchUserSession } from '@/lib/auth/fetchUserSession'; // Import your API call to fetch user session

interface authState {
    user: object | null;
    isAuthenticated: boolean;
    permissions: [];
    login: (login:string, password:string) => Promise<void>;
    setUser: (user:any) => void;
    clearUser: () => void;
}

const useAuthStore = create<authState>((set) => ({
    user: null,
    isAuthenticated: false,
    permissions: [],

    // Function to log in the user
    login: async (login: string, password: string) => {
        try {
            const userData = await fetchUserSession(login, password); // Call the API function
            set({ 
                user: userData, 
                isAuthenticated: true, 
                permissions: userData.permissions || [] 
            });
        } catch (error) {
            console.error("Login failed:", error);
            // Handle the error as needed, e.g., set an error state or show a message
        }
    },

    // Function to set user data
    setUser: (user:any) => set({ user, isAuthenticated: true, permissions: user.permissions || [] }),

    // Function to clear user data on logout
    clearUser: () => set({ user: null, isAuthenticated: false, permissions: [] }),
}));

export default useAuthStore;
