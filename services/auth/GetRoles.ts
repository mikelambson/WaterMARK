import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';


const backendURL = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/roles`;


interface FetchDataResponse {
    id: string;
    name: string;
    protected: boolean;
    superAdmin: boolean;
    requireLDAP: boolean;
    createdAt: string;
    updatedAt: string;
}
// Fetch data with error handling
const fetchData = async (): Promise<FetchDataResponse[]> => {
    const response = await fetch(backendURL, {
        credentials: 'include', // Include cookies for authentication if needed
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as Promise<FetchDataResponse[]>; // Ensure data matches the defined structure
};

// Hook to fetch data
export const useFetchRoles = (
    options?: Omit<UseQueryOptions<FetchDataResponse[], Error, FetchDataResponse[]>, 'queryKey' | 'queryFn'>
): UseQueryResult<FetchDataResponse[], Error> => {
    const defaultOptions: UseQueryOptions<FetchDataResponse[], Error, FetchDataResponse[]> = {
        queryKey: ['dataKey'], // Unique query key
        queryFn: fetchData, // Fetching function
        staleTime: 5000, // Data remains fresh for 5 seconds
        retry: 3, // Retry failed requests up to 3 times
        retryDelay: (attempt: number): number => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff
    };

    return useQuery<FetchDataResponse[], Error>({
        ...defaultOptions,
        ...options, // Spread user-supplied options
    });
};