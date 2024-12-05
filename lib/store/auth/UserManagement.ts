import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserState {
    users: User[];
    page: number;
    loading: boolean;
    error: string | null;
    fetchUsers: (page: number) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    page: 1,
    loading: false,
    error: null,
    fetchUsers: async (page: number) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/users?page=${page}`);
            const data = await response.json();
            set((state) => ({
                users: [...state.users, ...data.users],
                page,
                loading: false,
            }));
        } catch (error) {
            set({ loading: false, error: (error as Error).message });
        }
    },
}));

export default useUserStore;