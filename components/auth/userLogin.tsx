"use client"
// components/auth/Login.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/lib/store/authStore'; 
import { UserSessionData } from '@/lib/auth/fetchUserSession'
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
import { DropdownMenuItem, DropdownMenuShortcut } from '../ui/dropdown-menu';
import { LogOut } from 'lucide-react';


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
            const role = roles
            console.log('User logged in:', user);
            console.log('User roles:', user?.roles);
            setUserRole(role)
            toast({
                title: "Login Status",
                description: `Welcome ${role[0].charAt(0).toUpperCase() + role[0].slice(1)}`,
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
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <LogOut className="mr-0 h-4 w-4" />
                <span>    
                <Button
                    variant={userRole.includes("Anonymous") ? "link" : "link"}
                    // onClick={() => setIsDialogOpen(true)}
                >
                    {userRole[0] === "Anonymous" ? "LOGIN" : "LOGOUT"}
                </Button>    
                </span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default UserLoginForm;
