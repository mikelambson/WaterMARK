import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast'; 

interface User {
    id?: string; // Optional for new users
    login?: string; // Optional
    password?: string; // Optional for updates
    email?: string; // Optional
    firstName?: string; // Optional
    middleName?: string | null; // Optional
    lastName?: string; // Optional
    title?: string | null; // Optional
    tcid_staff?: boolean; // Optional
    active?: boolean; // Optional
    temppass?: string; // Optional
    roleId?: string | null; // Optional
}

const usersRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/manage/users`;
const backendAddress = process.env.API_ADDRESS;

// Custom React Query hook for creating or updating users
// usage: const { mutate: saveUser } = useSaveUser();

export const useSaveUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation<User, Error, User>({
        mutationFn: (user: User) => (user.id ? updateUser(user) : createUser(user)),
        onSuccess: () => {
            toast({ title: 'Success', description: 'User saved successfully' });
            
            // Invalidate user queries to ensure updated data
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: Error) => {
            toast({ variant: "destructive", title: 'Error', description: `Failed to save user: ${error.message}` });
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
  
    const { id, ...updateData } = user; // Separate the ID from the data to be updated
  
    const response = await fetch(`${usersRoute}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": `${backendAddress}`,
      },
      credentials: "include",
      body: JSON.stringify(updateData), // Only send the updatable fields
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user');
    }
  
    return response.json();
  };


