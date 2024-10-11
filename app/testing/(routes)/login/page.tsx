'use client';
import { useRoleStore } from "@/components/nav/RoleContext";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import LoginForm from "@/app/testing/_components/login/loginForm"


export default function Login() {
//   const [login, setLogin] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { userRole, setUserRole } = useRoleStore();
//   const router = useRouter();

//   const getUserRoleFromToken = (payload: { roles: string | any[]; }) => {
//     if (payload.roles && payload.roles.length > 0) {
//       return payload.roles[0].roleName; // Return the roleName of the first role
//     }
//     return 'anonymous'; // Return "anonymous" if no roles are present
//   };

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
//     const result = await signIn('credentials', {
//       redirect: false,
//       login,
//       password,
//     });

//     if (result?.error) {
//       setError(result.error);
//     } else {
//         console.log('Result:', result?.url)
//         // Decode the JWT to extract the user role
//     //   const decodedPayload = jwt.decode(result?.token) as JwtPayload; // Use your JwtPayload interface here
//     //   const role = getUserRoleFromToken(decodedPayload); // Get the user role
//     //   setUserRole(role); // Set the user role in state
//       // Redirect to dashboard upon successful login
//       router.push('/account');
//     }
//   };

  return (
    <div className='p-4 ml-4'>
        <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>LOGIN DEVELOPMENT</h1>
        <div className="flex justify-around my-4">
            <div className="flex gap-4">
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"destructive"}>LOGOUT</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader className="flex items-center">
                            <DialogTitle className="text-yellow-800 dark:text-yellow-700">
                                LOGOUT
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you wish to sign out?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-around">
                            <div className="flex gap-4">
                                <Button variant={"secondary"}>Yes</Button>
                                <DialogTrigger asChild>
                                    <Button variant={"destructive"}>NO</Button>
                                </DialogTrigger>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild><Button>LOGIN</Button></DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader className="flex items-center">
                            <DialogTitle className="text-yellow-800 dark:text-yellow-700">LOGIN</DialogTitle>
                            <DialogDescription>
                                Please sign in to your account.
                            </DialogDescription>
                        </DialogHeader>
                        <LoginForm />
                        {/* <form onSubmit={handleSubmit} className="flex flex-col">
                            {error && <p className="text-red-400">{error}</p>}

                            <label className="mt-2 mb-1">Username</label>
                            <Input
                            type="text"
                            autoComplete="username"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            />

                            <label className="mt-2 mb-1">Password</label>
                            <Input
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            <div className="py-2 text-slate-700 dark:text-slate-500">
                                <span className="text-sm text-yellow-800 dark:text-yellow-700 mr-2">
                                    STATUS:
                                </span>
                                ...login processing.
                            </div>
                            <Button type="submit">Sign in</Button>
                        </form> */}
                    </DialogContent>
                </Dialog>

                
            </div> 
        </div>

      
    </div>
  );
}
