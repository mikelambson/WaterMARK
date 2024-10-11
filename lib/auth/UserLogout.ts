export const LogoutUser = async ( userId:string ) => {

    const loginRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/logout`

    const response = await fetch(loginRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId}),
    });

    if (!response.ok) {
        throw new Error('Logout failed'); // Throw an error if the response is not ok
    }

    const data = await response.json();
    return data; // Return user data
};