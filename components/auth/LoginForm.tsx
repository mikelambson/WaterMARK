"use client"
import { useState } from "react";
import { useRoleStore } from "@/components/nav/RoleContext";
import { useAuthStore } from '@/lib/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { UserSessionData } from '@/lib/auth/fetchUserSession'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

const loginSchema = z.object({
    login: z.string().min(1, { message: "Login is required" }),
    password: z.string().min(5, { message: "Password must be at least 6 characters long" }),
  });
  
  // Define the expected types
  type LoginFormValues = z.infer<typeof loginSchema>;
  
const UserLoginForm = () => {
    const { toast } = useToast();
    const {userRole, setUserRole } = useRoleStore();
    const { userData, isAuthenticated, roles, permissions, userLogin, clearUser } = useAuthStore();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Use useForm with Zod validation schema
    const formState = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
        login: '',
        password: '',
        },
    });


    // UseMutation with the correct types
    const mutation = useMutation<UserSessionData | null, Error, LoginFormValues>({
    mutationFn: ({ login, password }) => userLogin(login, password),
    });

    const onSubmit = async (data: LoginFormValues) => {
        console.log('Submitting form', data);
        try {
            const user = await mutation.mutateAsync(data); 
            const roles = user?.roles && user.roles.length > 0 ? user.roles.map((role: any) => role) : ["Anonymous"];
            const role = roles[0]
            console.log('User logged in:', user);
            console.log('User roles:', user?.roles);
            setUserRole([role])
            toast({
                title: "Login Status",
                description: `Welcome ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            })
            setIsDialogOpen(false);
        } catch (error) {
            setUserRole(["Anonymous"])
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
            <DialogTrigger asChild>
                <Button type="submit" disabled={['pending'].includes(mutation.status)}>
                    {mutation.status === 'success' ? 'Success' 
                    : mutation.status === 'pending' ? 'Logging in...' : 'Login'}
                </Button>
            </DialogTrigger>
            
            {mutation.isError && <p className="text-red-500">{mutation.error.message}</p>}
            {mutation.isSuccess && <p className="text-green-500">Login successful!</p>}
            
            </form>
        </Form>
    )
}

export default UserLoginForm;