"use client"
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { fetchUserSession } from '@/lib/auth/fetchUserSession';
import { useRole, useRoleStore } from "@/components/nav/RoleContext"; 

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const loginSchema = z.object({
  login: z.string().min(1, { message: "Login is required" }),
  password: z.string().min(5, { message: "Password must be at least 6 characters long" }),
});

// Define the expected types
type LoginFormValues = z.infer<typeof loginSchema>;
type UserSessionResponse = { 
    id: string; 
    login: string;
    firstName: string;
    lastName: string;
    roles: [];
    permissions: [];
}; 

const LoginForm: React.FC = () => {
    const { toast } = useToast();
    const { setUserRole } = useRoleStore();
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
    mutationFn: ({ login, password }) => fetchUserSession(login, password),
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
                description: `Welcome ${user?.firstName}`,
            })
        } catch (error) {
            console.error("Login error:", error); // Handle error appropriately
            toast({
                title: "Login Failed",
                description: "An error occurred during login. Please try again.",
            });
        }
    };

    return (
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
    
            {/* Error and Success Messages */}
            {mutation.isError && <p className="text-red-500">{mutation.error.message}</p>}
            {mutation.isSuccess && <p className="text-green-500">Login successful!</p>}
            </form>
        </Form>
    );
};

export default LoginForm;