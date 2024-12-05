import { useQuery } from '@tanstack/react-query';

const fetchUserData = async () => {
    const response = await fetch('/api/user', {
        method: 'GET',
        credentials: 'include',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
    
};

export const useUserData = () => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
        retry: true, // Retry on error
        refetchOnWindowFocus: false, // Disable refetch on window focus
    });
};