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
import { FaBars, FaTimes, FaBell, FaUserCircle } from "react-icons/fa";
import { LogOut, User } from "lucide-react";
import { useRole, useRoleStore } from "@/components/nav/RoleContext";
import Link from "next/link";


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
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            {userRole !== "Anonymous" && (
                            <>
                                <Link href="/account">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
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
                                        Notification History
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/account/messages">
                                    <DropdownMenuItem>
                                        Messages
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/account/settings">
                                    <DropdownMenuItem>
                                        User Settings
                                    </DropdownMenuItem>
                                </Link>
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