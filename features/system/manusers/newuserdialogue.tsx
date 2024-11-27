"use client"
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils";
import { useFetchRoles } from "@/services/GetRoles";

interface UserType {
    userType: string
}


const NewUserDialogue: React.FC<UserType> = ({userType}) => {
    const [isActive, setIsActiveChecked] = useState(true);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const isStaff: boolean = userType === "staff";
    let constructedlogin = firstname !== '' && lastname !== ''
    ? `${firstname?.[0].toLowerCase()}${middlename?.[0]?.toLowerCase() || ''}${lastname?.toLowerCase()}`
    : '--';

    const handleActiveChecked = (checked: boolean) => {
        setIsActiveChecked(checked);
    };

    const { data: roles, isLoading, error } = useFetchRoles();
    

    return ( 
        <Dialog>
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
                                    
                            <div className="inline-flex items-center gap-2 font-semibold text-lg"> 
                                <p className="opacity-50 text-xl">Login:</p>
                                
                                <div 
                                    id="addlogin"
                                    className="font-bold text-lg"
                                >
                                    {isStaff
                                    ? `${constructedlogin}`
                                    : `${email}`}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Input 
                                    id="addemail" 
                                    type="email" 
                                    placeholder="Email*"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="max-w-sm" 
                                />
                                <Input id="addtemppass" type="string" placeholder="Temporary Password*" className="max-w-[17.5rem]" />
                            </div>
                            <div className={"flex flex-col gap-2 max-w-2xl"}>
                                <Input 
                                    id="addfirstName" 
                                    type="string" 
                                    placeholder="First Name*" 
                                    value={firstname} 
                                    onChange={(e) => setFirstname(e.target.value)} 
                                />
                                <Input 
                                    id="addmiddleName" 
                                    type="string" 
                                    placeholder="Middle Name" 
                                    value={middlename}
                                    onChange={(e) => setMiddlename(e.target.value)}
                                />
                                <Input 
                                    id="addlastname" 
                                    type="string" 
                                    placeholder="Last Name*" 
                                    value={lastname} 
                                    onChange={(e) => setLastname(e.target.value)} 
                                />
                            </div>
                            <div className={cn(isStaff || "hidden")}>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div
                                        className={cn(
                                        "border rounded-md px-3 py-2 bg-card whitespace-nowrap",
                                        isStaff || "opacity-50"
                                    )}>
                                        <Checkbox 
                                            id="isStaff" 
                                            checked={isStaff}
                                        />
                                        <label
                                            htmlFor="isStaff"
                                            className={
                                                "pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"        
                                        }>
                                            TCID STAFF
                                        </label>
                                    </div>
                                    <Select>
                                        <SelectTrigger 
                                            disabled={!isStaff}
                                            className="w-[180px] font-semibold text-lg pl-4 bg-card">
                                            <SelectValue placeholder="No Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Role</SelectItem>
                                            {roles?.map((role) => (
                                                <SelectItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
{/*                                             
                                            <SelectItem value="sysadmin">Sysadmin</SelectItem>
                                            <SelectItem value="watermaster">Watermaster</SelectItem>
                                            <SelectItem value="senioranalyst">Senior Analyst</SelectItem>
                                            <SelectItem value="analyst">Analyst</SelectItem>
                                            <SelectItem value="scheduler">Scheduler</SelectItem>
                                            <SelectItem value="lead">Lead</SelectItem>
                                            <SelectItem value="ditchrider">Ditchrider</SelectItem>
                                            <SelectItem value="staff">Staff</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    <Input 
                                        type="title" 
                                        placeholder="Title" 
                                        disabled={!isStaff}
                                        className="max-w-xs"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between items-center gap-2 border-y-2 py-2">
                                <div className={
                                    "border rounded-md px-3 py-2 bg-card whitespace-nowrap"
                                }>
                                    <Checkbox 
                                        id="protecteduser" 
                                        // disabled={!isStaff}
                                    />
                                    <label
                                        htmlFor="protecteduser"
                                        className={
                                            "pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        }>
                                        PROTECTED USER
                                    </label>
                                </div>
                                <div className={cn(
                                    "border rounded-md px-3 py-2 whitespace-nowrap",
                                    isActive ? "bg-teal-800/60" : "bg-destructive"
                                )}>
                                    <Checkbox 
                                        id="protecteduser"
                                        checked={isActive}
                                        onCheckedChange={handleActiveChecked}
                                    />
                                    <label
                                        htmlFor="protecteduser"
                                        className={
                                            "pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground"
                                    }>
                                        {isActive ? "ACTIVE" : "DEACTIVATED"}
                                    </label>
                                </div>
                            </div>
                            <DialogFooter>
                                <p className="text-xs text-red-600 dark:text-red-400">
                                    <span className="font-bold">*</span>
                                    Required
                                </p>
                                <DialogTrigger asChild>
                                    <Button type="submit">Confirm</Button>
                                </DialogTrigger>
                            </DialogFooter>
                        </DialogContent>
                        
                    </Dialog>
     );
}
 
export default NewUserDialogue;
