import { useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
    id?: string; // Optional for new users
    login?: string; // Optional
    password?: string; // Optional for updates
    email?: string; // Optional
    firstName?: string; // Optional
    middleName?: string; // Optional
    lastName?: string; // Optional
    title?: string; // Optional
    tcid_staff?: boolean; // Optional
    active?: boolean; // Optional
    roleId?: string; // Optional
}

const usersRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/manage/users`;
const backendAddress = process.env.API_ADDRESS;

// Custom React Query hook for creating or updating users
// usage: const { mutate: saveUser } = useSaveUser();

export const useSaveUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, User>({
        mutationFn: (user: User) => (user.id ? updateUser(user) : createUser(user)),
        onSuccess: () => {
            // Invalidate user queries to ensure updated data
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: Error) => {
            console.error('Error saving user:', error.message);
        },
    });
};

// Create a new user
const createUser = async (user: User): Promise<User> => {
    const response = await fetch(usersRoute, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": `${backendAddress}`,
          },
        credentials: "include",
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
    }

    return response.json();
};

// Update an existing user
const updateUser = async (user: User): Promise<User> => {
    if (!user.id) {
        throw new Error('User ID is required to update a user.');
    }

    const response = await fetch(`${usersRoute}/${user.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": `${backendAddress}`,
          },
        credentials: "include",
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
    }

    return response.json();
};


