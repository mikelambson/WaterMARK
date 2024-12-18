"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserTemplate from "@/features/system/manusers/usertemplate";
import NewUserDialogue from "@/features/system/manusers/newuserdialogue";
import {useUserData} from "@/services/auth/UserManagementFunctions";
import { useAuthStore } from "@/lib/store/authStore";


const ManageUsers = () => {
  const { userData } = useAuthStore();
  const [userType, setUserType] = useState("staff");
  const { data: userList, isLoading, isError, error, refetch } = useUserData(userType);

  const handleUserType = (type: string) => setUserType(type);
  
  // useEffect(() => {
  //   refetch();
  // }, [userType, refetch]);

  return (
    <div className="p-2 h-full">
      <div className="flex flex-col md:grid md:grid-cols-3 mb-2 gap-3">
        {/* Select Dropdown */}
        <div className="justify-center lg:col-start-1">
          <Select onValueChange={handleUserType}>
            <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
              <SelectValue placeholder={userType} />
            </SelectTrigger>
            <SelectContent>
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

      <UserTemplate 
        userList={userList} 
        isLoading={isLoading} 
        isError={isError} error={error?.message} 
        userType={userType} 
        manProtected={userData?.roles.includes("sysadmin")} 
        onRefetch={refetch}
        />
      
    </div>
  );
};

export default ManageUsers;
