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

interface UserType {
    userType: string
}


const NewUserDialogue: React.FC<UserType> = ({userType}) => {
    const [isActive, setIsActiveChecked] = useState(true);
    const isStaff: boolean = userType === "staff";

    const handleActiveChecked = (checked: boolean) => {
        setIsActiveChecked(checked);
      };
    return ( 
        <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"secondary"} className="w-[180px] text-lg">Add User</Button>
                        </DialogTrigger>
                        <DialogContent className="lg:max-w-[45.25rem]">
                            <DialogHeader>
                            <DialogTitle className="text-xl">
                                Add New <span className="text-orange-300/60">
                                {userType.charAt(0).toUpperCase() + userType.slice(1)}
                                </span> {isStaff ? "Member" : ""}
                            </DialogTitle>
                            <DialogDescription className="text-lg text-secondary-foreground">
                                Best practice login should be lower case first initial and last name.
                            </DialogDescription>
                            </DialogHeader>
                            <div className={cn(isStaff || "hidden")}>
                                <Input 
                                    type="login" 
                                    placeholder={isStaff ? "Login**" : "Login"} 
                                    disabled={!isStaff}
                                    className="max-w-xs"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Input type="email" placeholder="Email**" className="max-w-sm" />
                                <Input type="temppass" placeholder="Temporary Password**" className="max-w-[17.5rem]" />
                            </div>
                            <div className={"flex flex-col gap-2 max-w-2xl"}>
                                <Input type="first" placeholder="First Name**" />
                                <Input type="middle" placeholder="Middle Name" />
                                <Input type="last" placeholder="Last Name**" />
                                
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
                                            <SelectItem value="sysadmin">Sysadmin</SelectItem>
                                            <SelectItem value="watermaster">Watermaster</SelectItem>
                                            <SelectItem value="senioranalyst">Senior Analyst</SelectItem>
                                            <SelectItem value="analyst">Analyst</SelectItem>
                                            <SelectItem value="scheduler">Scheduler</SelectItem>
                                            <SelectItem value="lead">Lead</SelectItem>
                                            <SelectItem value="ditchrider">Ditchrider</SelectItem>
                                            <SelectItem value="staff">Staff</SelectItem>
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
                                    <span className="font-semibold">**</span>
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
