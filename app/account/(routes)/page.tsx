"use client"
import { useRoleStore } from "@/lib/context/RoleContext"; // Import useRole
// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useAuthStore } from "@/lib/store/authStore"
// import { useEffect, useState } from "react";
import { Profile } from "@/features/account/profile";

export default function Login() {
    const { userRole, setUserRole } = useRoleStore((state) => state); // Access userRole and setUserRole
    const { userData } = useAuthStore(); // Access userData
    const sessionRoles = userData ? userData.roles : []; // Get the roles from the user data
    


    const handleRoleChange = (role: string) => {
        if (role === "Session Roles") {
            setUserRole(sessionRoles); // Set userRole to the session roles
            return;
        }
        setUserRole([role]); // Update userRole when the role changes
    };

    // Define an array of role options
    const roleOptions = [
        "Session Roles",
        "sysadmin",
        "administrator",
        "Watermaster",
        "Scheduler",
        "Ditchrider",
        "Senior Analyst",
        "Analyst",
        "Staff",
        "Anonymous",
        
        
        // Add other roles as needed
    ];

    return (
        <div className="px-2">
            <div className={"pt-4"}>
                <h1 className={"text-2xl font-semibold text-yellow-800 dark:text-yellow-700 text-center "}>
                    Profile/Login Page
                </h1> 
            </div>
            <div className="flex flex-col gap-4 mt-8 justify-center">
                <h2 className="text-xl text-center"> 
                    {userRole.includes("Anonymous") ? "Please login to view your profile" : `Welcome ${userRole.join(", ")}`}
                    
                </h2>
                
                <h3 className="text-center">Your real roles are: 
                    <p className="font-semibold text-yellow-800 dark:text-yellow-700 "> 
                        [ {sessionRoles.join(", ")} ]
                    </p>
                </h3>
            
            </div>
            {userData?.permissions.some((permission) => permission === "superAdmin") ? (
                <div className="mt-24 flex flex-col gap-2 text-center justify-center items-center">
                    <h3 className="text-xl">View as:</h3>
                    <Select onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-48 border-foreground/80" value={userRole}>
                            <SelectValue id="selectedRole" placeholder={userRole} />
                        </SelectTrigger>
                        <SelectContent>
                            {roleOptions.map((role) => (
                                <SelectItem
                                    key={role}
                                    value={role}                                
                                >
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                </div>
            ) : null }
            <div className="mt-8 flex justify-center">
                <h3 className="text-center">
                    Effective Permissions From Session:
                    <p className="font-semibold text-yellow-800 dark:text-yellow-700">
                        [ {userData?.permissions.join(", ")} ]
                    </p>
                </h3>
            </div>
            <div className="mt-8 flex justify-center">
                <h4 className="">
                    <p className="text-center">User Info:</p>
                    <div className="grid grid-cols-2 grid-flow-row-dense justify-around border">
                    <p>User Id:</p>
                    <p>{userData?.id}</p>
                    <p>Login:</p>
                    <p>{userData?.login}</p>
                    <p>Full Name</p>
                    <p>{userData?.firstName} {userData?.lastName}</p>
                    <p>Session Id:</p>
                    <p>{}</p>
                    </div>

                    <hr />

                    <Profile className="p-4" />
                    
                </h4>
            </div>
        </div>  
    );
}