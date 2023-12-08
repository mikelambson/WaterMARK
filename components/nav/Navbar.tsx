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

  const logoSection = (
    <div className={"w-max flex rounded hover:bg-amber-200 hover:bg-opacity-30  scale-100 hover:scale-105 duration-200"}>
      <Image src="/img/logo.png" width={35} height={35} alt="logo" />
      <span className={"ml-3 self-center text-blue-400"}>Water</span>
      <span className={"self-center text-orange-300"}>MARK</span>
    </div>
  );

  const roleBasedLinks = [
    {
      id: 0, // Use a unique id for the logo section
      link: "/", // Use "/" as the link for the logo
      allowedRoles: ["any"], // Define roles that can access this link
      content: logoSection, // Include the logoSection in the content
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
        {roleBasedLinks.map(({ id, link, allowedRoles, name, content, children }) =>
          // Check if "any" is in the allowedRoles array or the user's role is included
          allowedRoles.includes("any") || allowedRoles.includes(userRole) ? (
            <li
              key={id}
              className={cn(`nav-links px-3 cursor-pointer capitalize font-medium subpixel-antialiased ${defaultTextColorClass} hover:scale-105 hover:text-amber-300 duration-200 link-underline`, children.includes(pathname) ? 
              cn(isDarkMode ? "text-amber-400" : "text-orange-300") : {defaultTextColorClass})}
            >
              {id === 0 ? ( // Check if it's the logo section
                <Link href={link}>{content}</Link>
              ) : (
                <Link href={link}>{name}</Link>
              )}
            </li>
          ) : null
        )}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className={"cursor-pointer pr-4 subpixel-antialiased text-gray-500 md:hidden z-50"}
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul
          className={`flex flex-col subpixel-antialiased items-center absolute top-0 left-0 w-full h-screen ${defaultbg} ${defaultTextColorClass} subpixel-antialiased z-40`}
        >
          {roleBasedLinks.map(({ id, link, allowedRoles }) =>
            allowedRoles.includes("any") || allowedRoles.includes(userRole) ? (
              <li
                key={id}
                className={"px-4 cursor-pointer py-6 text-4xl subpixel-antialiased hover:text-amber-200 duration-200 link-underline"}
              >
                <Link onClick={() => setNav(!nav)} href={link}>
                  {link}
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
          <div className={`${defaultTextColorClass} subpixel-antialiased`}>
            <FaBell size={20} className={`${iconHoverColorClass} subpixel-antialiased`} />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>NOTIFICATIONS</SheetTitle>
            <SheetDescription>
              This section will serve to display and manage notifications.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className={`${defaultTextColorClass}`}>
              <Avatar>
                <AvatarImage />
                  <AvatarFallback>
                    <FaUserCircle size={30} className={`${iconHoverColorClass} subpixel-antialiased`} />
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
