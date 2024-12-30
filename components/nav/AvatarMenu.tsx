// import React from "react";
import LoginDialog from "@/components/auth/LoginDialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { BsInfoLg } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { RiListSettingsLine } from "react-icons/ri";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { MdHistory } from "react-icons/md";
import { useRoleStore } from "@/lib/context/RoleContext";
import { Button } from "@/components/ui/button";



const AvatarMenu = () => {
    const { userRole, setUserRole } = useRoleStore();
    const defaultTextColorClass = "text-gray-200 dark:text-gray-400";
    const iconHoverColorClass =
        "transition-all hover:text-yellow-400 hover:scale-125 dark:hover:text-yellow-300";

    return ( 
        <LoginDialog>
            <DropdownMenu>
            <DropdownMenuTrigger className=" cursor-pointer" asChild>
                <div  className={`${defaultTextColorClass}`}>
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback className="bg-black/5">
                        <FaUserCircle
                            size={30}
                            className={` ${iconHoverColorClass} subpixel-antialiased`}
                        />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-56"
                sideOffset={5}
            >
                <DropdownMenuLabel className={"ml-2 text-lg font-semibold text-yellow-800"}>
                    WaterMARK
                </DropdownMenuLabel>
                <Link href="/about">
                    <DropdownMenuItem>
                        <BsInfoLg className="mr-2 h-4 w-4" />
                        About
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />                       
                    {!userRole.includes("Anonymous") && (
                    <>
                        <DropdownMenuLabel className={"text-center"}>
                            Account
                        </DropdownMenuLabel>
                        <Link href="/account">
                            <DropdownMenuItem>
                                <User className="mx-2 h-4 w-4" />
                                <span>
                                    Profile
                                </span>
                                <DropdownMenuShortcut>
                                    ⇧⌘P
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/account/notifications">
                            <DropdownMenuItem>
                                <MdHistory className="mx-2 h-4 w-4" />
                                Notification History
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/account/messages">
                            <DropdownMenuItem>
                            <BiMessageDetail className="mx-2 h-4 w-4" />
                                Messages
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/account/settings">
                            <DropdownMenuItem>
                                <RiListSettingsLine className="mx-2 h-4 w-4" />
                                User Settings
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuLabel className={"text-center"}>
                            Welcome {userRole}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                    )}  
                    <LoginDialog.Trigger asChild>
                        <DropdownMenuItem>
                            <LogOut className="mr-0 h-4 w-4" />
                            <span>    
                                <Button
                                    variant={userRole.includes("Anonymous") ? "link" : "link"}
                                    // onClick={() => setIsDialogOpen(true)}
                                >
                                    {userRole.includes("Anonymous") ? "LOGIN" : "LOGOUT"}
                                </Button>    
                            </span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </LoginDialog.Trigger> 
            </DropdownMenuContent>
        </DropdownMenu> 
    </LoginDialog>
    );
}



export default AvatarMenu;

