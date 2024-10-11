export const fetchUserSession = async (login:string, password:string) => {

    const loginRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/login`

    const response = await fetch(loginRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed'); // Throw an error if the response is not ok
    }

    const data = await response.json();
    return data; // Return user data
};