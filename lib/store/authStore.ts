// store/useAuthStore.js
import { create } from 'zustand';
import { fetchUserSession, checkUserSession } from '@/lib/auth/fetchUserSession';
import { LogoutUser } from '@/lib/auth/UserLogout';

type UserSessionResponse = { 
    id: string; 
    login: string;
    firstName: string;
    lastName: string;
    roles: string[];
    permissions: string[];
} | undefined; 


interface authState {
    user: UserSessionResponse | null;
    isAuthenticated: boolean;
    roles: string[];
    permissions: string[];
    userLogin: (login:string, password:string) => Promise<UserSessionResponse>;
    userLogout: () => Promise<void>;
    checkSession: () => void;
    setUser: (user:any) => void;
    clearUser: () => void;
}


const useAuthStore = create<authState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    permissions: [],
    roles: ["Anonymous"],
    // Function to log in the user
    userLogin: async (login: string, password: string): Promise<UserSessionResponse> => {
        try {
            const userData = await fetchUserSession(login, password); 
            set({ 
                user: userData, 
                isAuthenticated: true, 
                roles: userData.roles || ["Anonymous"],
                permissions: userData.permissions || [] 
            });
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            // Handle the error as needed, e.g., set an error state or show a message
        }
    },
    userLogout: async () => {
        const { user } = get(); // Assuming you have user in the Zustand store
        if (!user || !user.id) {
            console.error("Logout failed: No user found.");
            return;
        }
    
        try {
            const logout = await LogoutUser(user.id); // user.id will always be a string here
            set({ user: null, isAuthenticated: false, roles: ["Anonymous"], permissions: [] });
    
            return logout;
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    
    // Function to set user data
    checkSession: async () => {
        if (!get().user) {  // If user not in state, check session
            try {
                const sessionUser = await checkUserSession();  // API call to check session
                if (sessionUser) {
                    set({ 
                        user: sessionUser,
                        isAuthenticated: true, 
                        roles: sessionUser.roles || ["Anonymous"],
                        permissions: sessionUser.permissions || [] 
                    });
                }
            } catch (error) {
                console.error("Session check failed:", error);
                // Handle error, maybe redirect to login
            }
        }
    },

    setUser: (user:any) => set({ user, isAuthenticated: true, roles: [user.roles], permissions: user.permissions || [] }),

    // Function to clear user data on logout
    clearUser: () => set({ user: null, isAuthenticated: false, roles: ["Anonymous"], permissions: [] }),

}));

export type { UserSessionResponse };
export  { useAuthStore };    



