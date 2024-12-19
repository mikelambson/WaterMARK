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

interface UserType {
    userType: string;
    manProtected?: boolean;
    onRefetch?: () => void;
}

const newUserSchema = z.object({
    login: z.string().min(1, "Login is required"),
    email: z.string().email("Please enter a valid email"),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    middlename: z.string().optional(),
    temporaryPassword: z.string().min(1, "Temporary password is required"),
    role: z.string().optional(),
    title: z.string().optional(),
    isActive: z.boolean().optional(),
    isStaff: z.boolean().optional(),
    isProtected: z.boolean().optional(),
});

type NewUserFormValues = z.infer<typeof newUserSchema>;

const NewUserDialogue = ({ userType, manProtected, onRefetch }: UserType) => {
    const [open, setOpen] = useState(false);
    const [isActive, setIsActiveChecked] = useState(true);

    const isStaff: boolean = userType === "staff";
    const { data: roles } = useFetchRoles();

    const form = useForm<NewUserFormValues>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            login: "",
            email: "",
            firstname: "",
            middlename: "",
            lastname: "",
            temporaryPassword: "",
        },
    });

    const { watch, setValue, handleSubmit, reset } = form;
    const firstname = watch("firstname");
    const middlename = watch("middlename");
    const lastname = watch("lastname");
    const email = watch("email");
    const login = watch("login");
    // const allFields = watch();

    const adminModifiedLogin = useRef(false);

    // Constructed login for staff: first initial, middle initial, full last name
    const constructedLogin = useMemo(() => {
        return getConstructedLogin(firstname, middlename, lastname);
    }, [firstname, middlename, lastname]);

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
            const newLogin = getConstructedLogin(firstname, middlename, lastname);
            if (newLogin !== login) {
                setValue("login", newLogin);
            }
        } else if (!isStaff && email !== login) {
            setValue("login", email);
        }
    }, [firstname, middlename, lastname, email, login, isStaff, setValue, constructedLogin]);

   
    const handleActiveChecked = (checked: boolean) => {
        setIsActiveChecked(checked);
    };

    const onSubmit = (data: NewUserFormValues) => {
        console.log("Form Data:", data, "Active:", isActive);
        // handle submission (e.g., calling an API)
    };

    function getConstructedLogin(
        firstname: string,
        middlename: string | undefined,
        lastname: string
    ): string {
        if (!firstname || !lastname) return "";
        const first = (firstname[0] || "").toLowerCase();
        const middle = (middlename?.[0] || "").toLowerCase();
        const last = lastname.toLowerCase();
        return `${first}${middle}${last}`;
    }

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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
                        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-around gap-2">
                            {/* Left Section */}
                            <div className="flex items-center gap-2 flex-1">
                                <p className="opacity-50 text-xl">Login:</p>
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
                                <p className="opacity-50 text-xl whitespace-nowrap">Temp Password:</p>
                                <FormField
                                    control={form.control}
                                    name="temporaryPassword"
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
                        <div className="inline-flex gap-2 w-full">
                            <p className="opacity-50 text-xl">Email:</p>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
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

                        <div className={"flex flex-col gap-2 max-w-2xl"}>
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
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

                            <FormField
                                control={form.control}
                                name="middlename"
                                render={({ field }) => (
                                    <FormItem>
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

                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
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

                        <div className={cn(isStaff || "hidden")}>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className={cn("border rounded-md px-3 py-2 bg-card whitespace-nowrap", isStaff || "opacity-50")}>
                                    <Checkbox
                                        id="isStaff"
                                        checked={isStaff}
                                        onChange={() => {}}
                                        disabled
                                    />
                                    <label
                                        htmlFor="isStaff"
                                        className="pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        TCID STAFF
                                    </label>
                                </div>
                                <Select disabled={!isStaff}>
                                    <SelectTrigger className="w-[180px] font-semibold text-lg pl-4 bg-card">
                                        <SelectValue placeholder="No Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Role</SelectItem>
                                        {roles?.filter((role) => manProtected || role.name !== "sysadmin")
                                            .map((role) => (
                                                <SelectItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    type="text"
                                    placeholder="Title"
                                    disabled={!isStaff}
                                    className="max-w-xs"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-2 border-y-2 py-2">
                            <div className={"border rounded-md px-3 py-2 bg-card whitespace-nowrap"}>
                                <Checkbox
                                    id="protecteduser"
                                    disabled={!manProtected}
                                    onChange={() => {}}
                                />
                                <label
                                    htmlFor="protecteduser"
                                    className="pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    PROTECTED USER
                                </label>
                            </div>
                            <div
                                className={cn(
                                    "border rounded-md px-3 py-2 whitespace-nowrap",
                                    isActive ? "bg-teal-800/60" : "bg-destructive"
                                )}
                            >
                                <Checkbox
                                    id="activeUser"
                                    checked={isActive}
                                    onCheckedChange={(val) => handleActiveChecked(!!val)}
                                />
                                <label
                                    htmlFor="activeUser"
                                    className="pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground"
                                >
                                    {isActive ? "ACTIVE" : "DEACTIVATED"}
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
