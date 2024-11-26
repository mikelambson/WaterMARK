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

type UserListType = any[]; // Replace `any` with the actual user type if known

const ManageUsers = () => {
  const [userType, setUserType] = useState("staff");
  const [userList, setUserList] = useState<UserListType | null>(null); // Initialize with `null` to check loading state
  const [error, setError] = useState<string | null>(null); // Handle errors

  const handleUserType = (type: string) => setUserType(type);

  useEffect(() => {
    const allUsers = async () => {
      try {
        const usersRoute = `${process.env.NEXT_PUBLIC_AUTH_ADDRESS}/manage/users`;
        const response = await fetch(usersRoute, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "https://backend.watermark.work",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setUserList(data); // Update state with the fetched data
      } catch (error: any) {
        setError(error.message); // Set error if something goes wrong
      }
    };

    allUsers();
  }, [userType]); // Run once on component mount

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

      <UserTemplate userList={userList} error={error} />
      
    </div>
  );
};

export default ManageUsers;
