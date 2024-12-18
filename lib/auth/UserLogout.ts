interface LogoutOptions {
    userId?: string;
    sessionId?: string;
    activeSession?: boolean;
}

export const LogoutUser = async ({ userId, sessionId, activeSession }: LogoutOptions) => {
  const loginRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/logout`;
  
  let body: any = {};
  
  if (activeSession === true) {
    body = { activeSession: true };
  } else if (userId) {
    body = { userId };
  } else if (sessionId) {
    body = { sessionId };
  }

  const response = await fetch(loginRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include' // If you need cookies to be included
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Logout failed');
  }

  const data = await response.json();
  return data; // Return response data
};