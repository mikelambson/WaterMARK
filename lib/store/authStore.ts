// @/lib/store/useAuthStore.js
import { create } from 'zustand';
import { UserSessionData, fetchUserSession, verifySession } from '@/lib/auth/fetchUserSession';
import { LogoutUser } from '@/lib/auth/UserLogout';



interface AuthState {
    userData: UserSessionData | null;
    isAuthenticated: boolean;
    roles: string[];
    permissions: string[];
    error: string | null;
    userLogin: (login: string, password: string) => Promise<UserSessionData | null>;
    userLogout: () => Promise<void>;
    checkSession: () => Promise<UserSessionData | null>;
    setUser: (arg0: UserSessionData) => void;
    clearUser: () => void;
    setAuthenticated: (value: boolean) => void;
    setRoles: (roleArray: string[]) => void;
    setPermissions: (permissionsArray: string[]) => void;
    setError: (errordata: any) => void;

}


const useAuthStore = create<AuthState>((set, get) => ({
    userData: null,
    isAuthenticated: false,
    permissions: [],
    roles: ["Anonymous"],
    error: null,

    // Function to log in the user
    userLogin: async (login: string, password: string): Promise<UserSessionData | null> => {
        try {
            const userData = await fetchUserSession(login, password); 
            set({ 
                userData: userData, 
                isAuthenticated: true, 
                roles: userData.roles || ["Anonymous"],
                permissions: userData.permissions || [] 
            });
            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            set({ 
                error: 'Login failed. Please try again.', 
                userData: null,  // Set user to null on error
                isAuthenticated: false,
                roles: ["Anonymous"],
                permissions: []
            });

            return null;
        }
    },

    userLogout: async () => {
        const { userData } = get(); // Assuming you have user in the Zustand store
        if (!userData || !userData.id) {
            console.error("Logout failed: No user found.");
            return;
        }
    
        try {
            const logout = await LogoutUser({userId: userData.id}); 
            set({ userData: null, isAuthenticated: false, roles: ["Anonymous"], permissions: [] });
    
            return logout;
        } catch (error) {
            console.error("Logout failed:", error);
            set({ error: 'Logout failed. Please try again.' });
        }
    },
    
    // Function to regen session
    checkSession: async (): Promise<UserSessionData> => {
        try {
                const sessionUser = await verifySession();  
                return sessionUser;
            } catch (error) {
                console.error("Login failed:", error);
                return {
                    id: null,
                    login: null,
                    firstName: null,
                    lastName: null,
                    roles: [],
                    permissions: []
                };
            }
    },

    setUser: (userObject: UserSessionData) => set({userData: userObject}),

    clearUser: () => {
    set(() => ({
        userData: null,
        isAuthenticated: false,
        roles: ["Anonymous"],
        permissions: []
    }));
    },
    setAuthenticated: (value: boolean) => {
        set({isAuthenticated: value});
        // console.log({
        //     "UserData":get().userData,
        //     "isAuthenticated":get().isAuthenticated,
        //     "Permissions":get().permissions,
        //     "Roles":get().roles,
        //     "Error":get().error
        // })
    },
    setRoles: (roleArray) => { set({ roles: roleArray, }) },
    setPermissions: (permissionsArray) => { set({ permissions: permissionsArray }) },
    setError: (errordata) => { set({ error: errordata }); }
}));

export  { useAuthStore };    



