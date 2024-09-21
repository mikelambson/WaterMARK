"use client"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import UserTemplate from "@/app/system/_components/manusers/usertemplate";
import NewUserDialogue from "@/app/system/_components/manusers/newuserdialogue";


const ManageUsers = () => {
    const [userType, setUserType] = useState("staff");
    const handleUserType = (type: string) => setUserType(type);

    return ( 
        <div className="p-2">
           <div className="flex flex-col md:grid md:grid-cols-3 mb-2 gap-3">
                {/* Select Dropdown */}
                <div className="justify-center lg:col-start-1">
                    <Select onValueChange={handleUserType}>
                    <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
                        <SelectValue placeholder={userType} />
                    </SelectTrigger>
                    <SelectContent 
                    >
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="wateruser">Wateruser</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                {/* h1 - User Management */}
                <h1 className="text-2xl font-semibold justify-self-center self-center order-first md:order-none animate-pulse text-yellow-950 dark:text-orange-300">
                    User Management
                </h1>

                {/* Add User Button */}
                <div className="md:col-start-3 md:justify-self-end">
                    <NewUserDialogue userType={userType} />
                </div>
            </div>
            <UserTemplate />
            
        </div>
     );
}
 
export default ManageUsers;