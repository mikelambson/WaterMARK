import { useQuery, useMutation } from '@tanstack/react-query';


interface NewUserForm {
    login: string;
    fullname: string;
    email: string;
    password: string;
    tcidstaff: boolean;
    title: string;
    active: boolean;
    protected: boolean;
}

const usersRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/manage/users`;

export const useUserData = () => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
        retry: true, // Retry on error
        refetchOnWindowFocus: true, // Disable refetch on window focus
    });
};

export const useAddNewUser = () => {
    return useMutation({
        mutationFn: addNewUser,
        retry: true, // Retry on error
    });
};


const fetchUserData = async () => {
    const response = await fetch(usersRoute, {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
    
};

const addNewUser = async (newUser: NewUserForm) => {
    const response = await fetch(usersRoute, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

