import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter, 
    DialogClose,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const changePasswordSchema = z.object({
    username: z.string().optional(),
    currentPassword: z.string().min(1, "Password must be at least 1 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const ChangeProfilePassword = () => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            username: "",
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            // Replace with your password update logic
            console.log("Password updated:", data.password);
            toast({
                title: "Success",
                description: "Password updated successfully",
            });
            setOpen(false);
            form.reset();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update password",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        if (!open) {
            form.reset();
        }
    }, [open, form]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">Change Password</Button>
                    </DialogTrigger>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-red-600/95">Change Password</DialogTitle>
                        <DialogDescription>
                            Please enter your current password and a new password to update your profile.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                             {/* Hidden Username Field */}
                             <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text" 
                                                autoComplete="username" 
                                                placeholder="Username" 
                                                {...field} 
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                    <Input 
                                        type="password" 
                                        placeholder="Current password" 
                                        autoComplete="current-password"
                                        {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                    <Input 
                                        type="password" 
                                        placeholder="Enter new password" 
                                        autoComplete="new-password" 
                                        {...field} 
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                    <Input 
                                        type="password" 
                                        placeholder="Enter new password" 
                                        autoComplete="new-password" 
                                        {...field} 
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary" >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" variant="destructive">
                                    Save
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export { ChangeProfilePassword};
