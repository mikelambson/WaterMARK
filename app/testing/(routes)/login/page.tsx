'use client';
import { useRoleStore } from "@/components/nav/RoleContext";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userRole, setUserRole } = useRoleStore();
  const router = useRouter();

  const getUserRoleFromToken = (payload: { roles: string | any[]; }) => {
    if (payload.roles && payload.roles.length > 0) {
      return payload.roles[0].roleName; // Return the roleName of the first role
    }
    return 'anonymous'; // Return "anonymous" if no roles are present
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      login,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
        console.log('Result:', result?.url)
        // Decode the JWT to extract the user role
    //   const decodedPayload = jwt.decode(result?.token) as JwtPayload; // Use your JwtPayload interface here
    //   const role = getUserRoleFromToken(decodedPayload); // Get the user role
    //   setUserRole(role); // Set the user role in state
      // Redirect to dashboard upon successful login
      router.push('/account');
    }
  };

  return (
    <div className='p-24'>
        
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
