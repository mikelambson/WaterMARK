"use client"
// components/auth/Login.tsx
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthStore, UserSessionResponse } from '@/lib/store/authStore'; // Adjust path as necessary
import { useRoleStore } from "@/components/nav/RoleContext"; 

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


const loginSchema = z.object({
  login: z.string().min(1, { message: "Login is required" }),
  password: z.string().min(5, { message: "Password must be at least 6 characters long" }),
});

// Define the expected types
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const { toast } = useToast();
    const {userRole, setUserRole } = useRoleStore();
    const { user, isAuthenticated, roles, permissions, userLogin, clearUser } = useAuthStore();
    // Use useForm with Zod validation schema
    const formState = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          login: '',
          password: '',
        },
      });

  
    // UseMutation with the correct types
    const mutation = useMutation<UserSessionResponse, Error, LoginFormValues>({
    mutationFn: ({ login, password }) => userLogin(login, password),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const user = await mutation.mutateAsync(data); 
            const roles = user?.roles && user.roles.length > 0 ? user.roles.map(role => role) : ["Anonymous"];
            const role = roles[0]
            console.log(user)
            console.log(user?.roles)
            setUserRole(role)
            toast({
                title: "Login Status",
                description: `Welcome ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            })
        } catch (error) {
            setUserRole("Anonymous")
            console.error("Login error:", error); // Handle error appropriately
            toast({
                title: "Login Failed",
                description: "An error occurred during login. Please try again.",
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={userRole === "Anonymous" ? "default" : "destructive"}
                >
                    {userRole === "Anonymous" ? "LOGIN" : "LOGOUT"}
                </Button>
            </DialogTrigger>
                        
            {userRole === "Anonymous" ?
                <DialogContent className="max-w-lg">
                    <DialogHeader className="flex items-center">
                        <DialogTitle className="text-yellow-800 dark:text-yellow-700">LOGIN</DialogTitle>
                        <DialogDescription>
                            Please sign in to your account.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...formState}>
                        <form onSubmit={formState.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Login Field */}
                        <FormField
                            control={formState.control}
                            name="login"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    {...field} 
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        {/* Password Field */}
                        <FormField
                            control={formState.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <Input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    autoComplete="current-password" 
                                    {...field} 
                                />
                                </FormControl>
                            
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        {/* Submit Button */}
                        <Button type="submit" disabled={['pending'].includes(mutation.status)}>
                            {mutation.status === 'success' ? 'Success' 
                            : mutation.status === 'pending' ? 'Logging in...' : 'Login'}
                        </Button>
                        
                        {mutation.isError && <p className="text-red-500">{mutation.error.message}</p>}
                        {mutation.isSuccess && <p className="text-green-500">Login successful!</p>}
                        
                        </form>
                    </Form>
                </DialogContent>
           :
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
                            <DialogTrigger asChild>
                                <Button 
                                    variant={"secondary"}
                                    onClick={() => setUserRole("Anonymous")}
                                >
                                    Yes
                                </Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <Button variant={"destructive"}>NO</Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </DialogContent>
           }
        </Dialog>
    );
};

export default LoginForm;
