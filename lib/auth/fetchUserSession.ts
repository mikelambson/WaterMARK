export type UserSessionData = {
    id: string;                     // UUID for the user
    login: string;                  // User login name
    firstName: string;              // User's first name
    lastName: string;               // User's last name
    roles: string[];                // Array of roles associated with the user
    permissions: string[];          // Array of permissions associated with the user
} | null;

const selfOrigin = 'https://backend.watermark.work'

export const fetchUserSession = async (login:string, password:string) => {

    const loginRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/login`

    const response = await fetch(loginRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'https://watermark.work',
        },
        credentials: 'include',
        body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed'); // Throw an error if the response is not ok
    }
    console.log('Cookies after login:', document.cookie);
    const data = await response.json();
    return data; // Return user data
};



export const verifySession = async () => {
    const checkRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/session`

    const response = await fetch(checkRoute, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'https://backend.watermark.work',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Login failed'); // Throw an error if the response is not ok
    }
    
    const data = await response.json();
    return data; // Return user data
}