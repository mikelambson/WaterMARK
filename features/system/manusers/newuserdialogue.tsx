"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils/GeneralUtils";
import { useFetchRoles } from "@/services/auth/GetRoles";
import { fi } from "date-fns/locale";

interface UserType {
    userType: string;
    manProtected?: boolean;
    onRefetch?: () => void;
}

const newUserSchema = z.object({
    login: z.string().min(3, "Login is required"),
    email: z.string().email("Please enter a valid email"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    middleName: z.string().optional(),
    temppass: z.string().min(4, "Temporary password is required"),
    roleId: z.string().optional(),
    title: z.string().optional(),
    active: z.boolean().optional(),
    tcid_staff: z.boolean().optional(),
    protected: z.boolean().optional(),
});

type NewUserFormValues = z.infer<typeof newUserSchema>;

const NewUserDialogue = ({ userType, manProtected, onRefetch }: UserType) => {
    const [open, setOpen] = useState(false);

    const isStaff: boolean = userType === "staff";
    const { data: roles } = useFetchRoles();

    const form = useForm<NewUserFormValues>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            login: "",
            email: "",
            firstName: "",
            middleName: "",
            lastName: "",
            temppass: "",
            tcid_staff: isStaff,
            active: true,
            protected: false,
            title: "",
            roleId: "",
        },
    });

    const { watch, setValue, handleSubmit, reset } = form;
    const firstName = watch("firstName");
    const middleName = watch("middleName");
    const lastName = watch("lastName");
    const email = watch("email");
    const login = watch("login");
    // const allFields = watch();

    const adminModifiedLogin = useRef(false);

    // Constructed login for staff: first initial, middle initial, full last name
    const constructedLogin = useMemo(() => {
        return getConstructedLogin(firstName, middleName, lastName);
    }, [firstName, middleName, lastName]);

    // Reset the form when the dialog is opened
    useEffect(() => {
        if (open) {
            form.reset();
            adminModifiedLogin.current = false;
        }
    }, [open, reset]);

    // If staff and admin has not modified login, update from constructed pattern
    useEffect(() => {
        if (isStaff && !adminModifiedLogin.current) {
            const newLogin = getConstructedLogin(firstName, middleName, lastName);
            if (newLogin !== login) {
                setValue("login", newLogin);
            }
        } else if (!isStaff && email !== login) {
            setValue("login", email);
        }
    }, [firstName, middleName, lastName, email, login, isStaff, setValue, constructedLogin]);



    function getConstructedLogin(
        firstName: string,
        middleName: string | undefined,
        lastName: string
    ): string {
        if (!firstName || !lastName) return "";
        const first = (firstName[0] || "").toLowerCase();
        const middle = (middleName?.[0] || "").toLowerCase();
        const last = lastName.toLowerCase();
        return `${first}${middle}${last}`;
    }

    const onSubmit = (data: NewUserFormValues) => {
        console.log("Form Data:", data);
        // handle submission (e.g., calling an API)
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"} className="w-[180px] text-lg">Add User</Button>
            </DialogTrigger>
            <DialogContent className="w-full lg:max-w-[45.25rem]">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        Add New <span className="text-orange-300/60">
                        {userType.charAt(0).toUpperCase() + userType.slice(1)}
                        </span> {isStaff ? "Member" : ""}
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg text-secondary-foreground opacity-50">
                        Enter all information to construct the login.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" autoComplete="off">
                        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-around gap-2">
                            {/* Left Section */}
                            <div className="flex items-center gap-2 flex-1">
                                <p className="opacity-50 w-14">Login:</p>
                                <FormField
                                    control={form.control}
                                    name="login"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Login*"
                                                    {...field}
                                                    disabled={!isStaff}
                                                    autoComplete="off"
                                                    spellCheck="false"
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        if (isStaff) {
                                                            adminModifiedLogin.current = true;
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                             {/* Middle Section - Only the Border */}
                            <div className="justify-center w-px flex">
                                <div className="border-l-2 border-r-2 h-10 w-px" />
                            </div>

                            {/* Right Section */}
                            <div className="flex items-center gap-2 flex-1">
                                <p className="opacity-50 whitespace-nowrap">Temp Password:</p>
                                <FormField
                                    control={form.control}
                                    name="temppass"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    placeholder="Temporary Password*"
                                                    {...field}
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="inline-flex gap-2 w-full items-center ">
                            <p className="opacity-50 w-14">Email:</p>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Email*"
                                                {...field}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />  
                        </div>

                        <div className={"flex flex-col gap-2"}>
                            <div className="inline-flex gap-2 w-full items-center ">
                                <p className="opacity-50 w-14">First:</p>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="First Name*"
                                                    {...field}
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="inline-flex gap-2 w-full items-center ">
                                <p className="opacity-50 w-14">Middle:</p>
                                <FormField
                                    control={form.control}
                                    name="middleName"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Middle Name"
                                                    {...field}
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="inline-flex gap-2 w-full items-center ">
                                <p className="opacity-50 w-14">Last:</p>
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                            type="text"
                                            {...field}
                                            placeholder="Last Name*"
                                            autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={cn(isStaff || "hidden")}>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="w-14"></div>
                                <div className={cn("inline-flex border h-10 rounded-md px-3 items-center gap-2 bg-card whitespace-nowrap", isStaff || "opacity-50")}>
                                    <FormField
                                        control={form.control}
                                        name="tcid_staff"
                                        render={({ field }) => (
                                            <FormItem className="mt-2">
                                                <FormControl>
                                                    <Checkbox
                                                        id="tcid_staff"
                                                        checked={isStaff}
                                                        onChange={() => {
                                                            field.onChange(!isStaff);
                                                        }}
                                                        disabled
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <label
                                        htmlFor="tcid_staff"
                                        className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        TCID STAFF
                                    </label>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="roleId"
                                    render={({ field }) => (
                                        <Select 
                                            disabled={!isStaff}
                                            onValueChange={(value) => {field.onChange(value)
                                        }}>
                                            <SelectTrigger className="w-[180px] font-semibold text-lg pl-4 bg-card">
                                                <SelectValue placeholder="No Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem key="none" value="">No Role</SelectItem>
                                                {roles
                                                ?.filter((role) => manProtected || role.name !== "sysadmin")
                                                .sort((a, b) => a.name.localeCompare(b.name)) // Sort roles alphabetically by name
                                                .map((role) => (
                                                    <SelectItem key={role.id} value={role.id}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                
                                <div className={cn(isStaff ? "inline-flex gap-2 w-full items-center" : "hidden" )}>
                                <p className="opacity-50 w-14">Title: </p>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Title"
                                                    {...field}
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                            </div>
                        </div>

                        <div className="pl-14 flex flex-wrap items-center gap-2 border-y-2 py-2">
                            <div className={"ml-2 inline-flex border h-10 rounded-md px-3 items-center gap-2 bg-card whitespace-nowrap"}>
                                <FormField
                                    control={form.control}
                                    name="protected"
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormControl>
                                                <Checkbox
                                                    id="protecteduser"
                                                    disabled={!manProtected}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                    
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <label
                                    htmlFor="protecteduser"
                                    className="pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    PROTECTED USER
                                </label>
                            </div>
                            <div className={cn(
                                    "inline-flex border h-10 rounded-md px-3 items-center gap-2 whitespace-nowrap",
                                    watch("active") ? "bg-card" : "bg-destructive"
                                )}
                            >
                                <FormField
                                    control={form.control}
                                    name="active"
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormControl>
                                                <Checkbox
                                                    id="activeUser"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <label
                                    htmlFor="activeUser"
                                    className="pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground"
                                >
                                    {watch("active")? "ACTIVE" : "DEACTIVATED"}
                                </label>
                            </div>
                        </div>

                        <DialogFooter>
                            <p className="text-xs">
                                <span className="font-bold">*</span> Required
                            </p>
                            <Button variant="secondary" type="button" onClick={() => {
                                form.reset();
                                adminModifiedLogin.current = false;
                            }}>
                                Reset
                            </Button>
                            <Button type="submit">Confirm</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default NewUserDialogue;
