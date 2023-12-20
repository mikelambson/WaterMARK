// \components\Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import Image from "next/image"
import React, { useState } from "react";
import { FaBars, FaTimes, FaBell, FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";
import { useRole } from "@/components/nav/RoleContext"; // Import useRole
import { BsDatabaseFillGear } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Notify, NotifyCount } from "@/components/nav/Notifications";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const { toast } = useToast();
  const { userRole } = useRole(); // Destructure userRole from useRole hook
  const [nav, setNav] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "light";
  const pathname = usePathname();
  const defaultTextColorClass = isDarkMode ? "text-gray-200" : "text-gray-400";
  const iconHoverColorClass = "hover:text-amber-100";
  const defaultbg = isDarkMode ? "bg-slate-700" : "bg-slate-800";

  const roleBasedLinks = [
    {
      id: 0, // Use a unique id for the logo section
      link: "/", // Use "/" as the link for the logo
      allowedRoles: ["any"], // Define roles that can access this link
      // content: logoSection, // Include the logoSection in the content
      name: "Home",
      children: ["/"],
    },
    {
      id: 1,
      link: "/admin",
      allowedRoles: ["Staff", "Watermaster","Senior Analyst", "Admin"],
      name: "Admin",
      children: ["/admin", "/admin/lookup", "/admin/callout", "/admin/adjustments"],
    },
    {
      id: 2,
      link: "/meters",
      allowedRoles: ["any"], // Define roles that can access this link
      name: "Meters",
      children: ["/meters"],
    },
    {
      id: 3,
      link: "/scheduling",
      allowedRoles: ["Watermaster", "Scheduler", "Admin"],
      name: "Scheduling",
      children: ["/scheduling", "/scheduling/daily", "/scheduling/schedule-orders", "/scheduling/ditchrider-tasks", "/scheduling/ditchrider-schedule", "/scheduling/settings"],
    },
    {
      id: 4,
      link: "/deliveries",
      allowedRoles: ["Watermaster", "Scheduler", "Ditchrider", "Admin"],
      name: "Deliveries",
      children: ["/deliveries", "/deliveries/schedule", "/deliveries/tasks", "/deliveries/ditchrider-schedule"],
    },
    {
      id: 5,
      link: "/analysis",
      allowedRoles: ["Scheduler", "Admin", "Senior Analyst"],
      name: "Analysis",
      children: ["/analysis", "/analysis/master", "/analysis/meters", "/analysis/adjustments", "/analysis/settings"],
    },
    {
      id: 6,
      link: "/online-schedule",
      allowedRoles: ["any"],
      name: "Schedule",
      children: ["/online-schedule"],
    },
    {
      id: 7,
      link: "/reports",
      allowedRoles: ["Watermaster", "Analyst", "Admin"],
      name: "Reports",
      children: ["/reports"],
    },
    
  ];

  return (
    <div
      className={` w-full h-16 align-middle ${defaultbg} subpixel-antialiased text-${defaultTextColorClass} fixed z-50 nav`}
    ><div className={"h-16 flex mx-auto justify-between items-center px-2 fixed w-[100vw]"}>
      <ul className={"hidden md:flex flex-grow items-center"}>
        {roleBasedLinks.map(({ id, link, allowedRoles, name, children }) =>
          // Check if "any" is in the allowedRoles array or the user's role is included
          allowedRoles.includes("any") || allowedRoles.includes(userRole) ? (
            <li
              key={id}
              className={cn(`nav-links h-[3.8rem] inline-flex items-center px-3 capitalize font-medium subpixel-antialiased ${defaultTextColorClass}  duration-200 pb-1`, children.includes(pathname) ? 
              cn(isDarkMode ? "text-yellow-400/90 border-b-2 border-b-amber-500/30" : "text-orange-300 border-b-2 border-b-orange-300/30") : {defaultTextColorClass})}
            >
              {id === 0 ? ( // Check if it's the logo section
                <Link href={link}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={"group w-max flex scale-100 hover:scale-110 duration-200"}>
                          <Image src="/img/logo.png" width={35} height={35} alt="logo" className={cn("group-hover:opacity-100 duration-200", children.includes(pathname) ? "opacity-95" : "opacity-60")} />
                          <span className={cn("ml-1 self-center group-hover:text-sky-400 duration-200", children.includes(pathname) ? "text-blue-400/95" : "text-blue-300/50")}>Water</span>
                          <span className={cn("self-center  group-hover:text-yellow-300 duration-200", children.includes(pathname) ? cn(isDarkMode ? "text-amber-500/90" :"text-orange-300/90") : "text-orange-200/60")}>MARK</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Home</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>  
                </Link>
              ) : (
                <Link className="hover:scale-125 hover:text-amber-500 duration-100 cursor-pointer" href={link}>{name}</Link>
              )}
            </li>
          ) : null
        )}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className={`cursor-pointer pr-4 subpixel-antialiased ${defaultTextColorClass} md:hidden z-50`}
      >
        {nav ? <FaTimes size={40} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul
          className={`flex flex-col subpixel-antialiased items-center absolute top-0 left-0 w-full h-[100dvh] justify-around ${defaultbg} ${defaultTextColorClass} font-semibold py-12 gap-12 subpixel-antialiased z-40`}
        >
          {roleBasedLinks.map(({ id, link, name, allowedRoles }) =>
            allowedRoles.includes("any") || allowedRoles.includes(userRole) ? (
              <li
                key={id}
                className={"px-4 cursor-pointer text-4xl subpixel-antialiased hover:text-amber-200 duration-200 link-underline"}
              >
                <Link onClick={() => setNav(!nav)} href={link}>
                  /{name}
                </Link>
              </li>
            ) : null
          )}
        </ul>
      )}

      <div className={"flex items-center pr-4 space-x-3"}>
        {userRole === "Admin" && (
          <Link href="/system">
            <div className={`${defaultTextColorClass} subpixel-antialiased`}>
              <BsDatabaseFillGear size={20} className={`${iconHoverColorClass}`} />
            </div>
          </Link>
        )}
        <ModeToggle />
        <div className={" w-px h-6 bg-gray-400"}></div>

        <Sheet>
        <SheetTrigger>
          <div className={`${defaultTextColorClass} subpixel-antialiased relative`}>
            <FaBell size={20} className={`${iconHoverColorClass} subpixel-antialiased`} />
            <NotifyCount />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>NOTIFICATIONS</SheetTitle>
            <SheetDescription>
              This section will serve to display and manage notifications.
            </SheetDescription>
            <Notify />
          </SheetHeader>
        </SheetContent>
      </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className={`${defaultTextColorClass}`}>
              <Avatar>
                <AvatarImage />
                <AvatarFallback className="bg-black/5">
                  <FaUserCircle size={30} className={` ${iconHoverColorClass} subpixel-antialiased`} />
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/login">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Something</DropdownMenuItem>
          <DropdownMenuItem>More</DropdownMenuItem>
          <DropdownMenuItem>More Somethings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
        </DropdownMenu>  
        
      </div>
      </div>
    </div>
  );
};

export default Navbar;
