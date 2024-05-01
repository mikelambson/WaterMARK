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
import { RiListSettingsLine, RiUserSettingsLine } from "react-icons/ri";
import { LogOut, User } from "lucide-react";
import { useRoleStore } from "@/components/nav/RoleContext";
import Link from "next/link";
import { MdHistory } from "react-icons/md";


const AvatarMenu = () => {
    const { userRole, setUserRole } = useRoleStore();
    const defaultTextColorClass = "text-gray-200 dark:text-gray-400";
    const iconHoverColorClass =
        "transition-all hover:text-yellow-400 hover:scale-125 dark:hover:text-yellow-300";

    return ( 
    <DropdownMenu>
                    <DropdownMenuTrigger>
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
                    <DropdownMenuContent className="w-56">
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
                            {userRole !== "Anonymous" && (
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
                        <Link href="/">
                            <DropdownMenuItem 
                                onClick={() => {
                                    userRole !== "Anonymous" 
                                    ? setUserRole("Anonymous") 
                                    : setUserRole("Watermaster")
                            }}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>
                                    {userRole !== "Anonymous" ? "Logout" : "Login"}
                                </span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu> );
}
 
export default AvatarMenu;