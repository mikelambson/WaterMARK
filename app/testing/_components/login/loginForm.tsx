"use client"
import { useMutation } from '@tanstack/react-query';
import { fetchUserSession } from '@/lib/auth/fetchUserSession';
import { toast } from "@/components/ui/use-toast"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Define the expected types
type LoginFormValues = z.infer<typeof loginSchema>;
type UserSessionResponse = { userId: string; token: string }; // Adjust based on your API response

const LoginForm = () => {
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

    const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data); // Trigger the mutation with form data
    };

    return (
        <Form {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit)} className="space-y-8">
            {/* Login Field */}
            <FormField
                control={formState.control}
                name="login"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your login" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is your login for accessing the platform.
                    </FormDescription>
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            {/* Submit Button */}
            <Button type="submit" disabled={mutation.status === 'pending'}>
                {mutation.status === 'pending' ? 'Logging in...' : 'Login'}
            </Button>
    
            {/* Error and Success Messages */}
            {mutation.isError && <p className="text-red-500">{mutation.error.message}</p>}
            {mutation.isSuccess && <p className="text-green-500">Login successful!</p>}
            </form>
        </Form>
    );
};

export default LoginForm;
