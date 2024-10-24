// \components\Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";
import { useTheme } from "next-themes";

import { useToast } from "@/components/ui/use-toast";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRole, useRoleStore } from "@/components/nav/RoleContext"; // Import useRole
import { ModeToggle } from "@/components/nav/ModeToggle";
import { Notify, NotifyCount } from "@/components/nav/Notifications";
import AvatarMenu from "@/components/nav/AvatarMenu";

const Navbar = () => {
    const { userRole } = useRole(); // Destructure userRole from useRole hook
    const [nav, setNav] = useState(false);
    const { theme } = useTheme();
    const isDarkMode = theme === "light";
    const pathname = usePathname();
    const defaultTextColorClass = "text-gray-200 dark:text-gray-400";
    const iconHoverColorClass =
        "transition-all hover:text-yellow-400 hover:scale-125 dark:hover:text-yellow-300";
    const defaultbg = "bg-slate-800/95 dark:bg-slate-800";
    const onlineScheduleName = userRole==="Anonymous" ? "Schedule" : "Public";
    
    const roleBasedLinks = [
        {
            id: 0o0, // Use a unique id for the logo section
            link: "/", // Use "/" as the link for the logo
            allowedRoles: ["any"], // Define roles that can access this link
            // content: logoSection, // Include the logoSection in the content
            name: "Home",
            children: ["/"],
        },
        {
            id: 11,
            link: "/admin",
            allowedRoles: ["Staff", "Watermaster", "Analyst", "Senior Analyst", "Admin", "sysadmin"],
            name: "Admin",
            children: [
                "/admin",
                "/admin/lookup",
                "/admin/callout",
                "/admin/adjustments",
                "/admin/post",
            ],
        },
        {
            id: 22,
            link: "/meters",
            allowedRoles: ["any"], // Define roles that can access this link
            name: "Meters",
            children: [
                "/meters",
                "/meters/west",
                "/meters/central",
                "/meters/east",
                "/meters/truckee"
            ],
        },
        {
            id: 33,
            link: "/scheduling",
            allowedRoles: ["Watermaster", "Scheduler", "Admin", "sysadmin", "Senior Analyst"],
            name: "Scheduling",
            children: [
                "/scheduling",
                "/scheduling/daily",
                "/scheduling/board",
                "/scheduling/schedule-orders",
                "/scheduling/ditchrider-tasks",
                "/scheduling/ditchrider-schedule",
                "/scheduling/settings",
            ],
        },
        {
            id: 44,
            link: "/deliveries",
            allowedRoles: ["Watermaster", "Scheduler", "Ditchrider", "Admin", "sysadmin", "Senior Analyst"],
            name: "Deliveries",
            children: [
                "/deliveries",
                "/deliveries/schedule",
                "/deliveries/tasks",
                "/deliveries/ditchrider-schedule",
            ],
        },
        {
            id: 55,
            link: "/analysis",
            allowedRoles: ["Scheduler", "Admin", "sysadmin", "Analyst", "Senior Analyst", "Watermaster"],
            name: "Analysis",
            children: [
                "/analysis",
                "/analysis/master",
                "/analysis/meters",
                "/analysis/adjustments",
                "/analysis/settings",
            ],
        },
        {
            id: 66,
            link: "/reports",
            allowedRoles: ["Watermaster", "Senior Analyst", "Admin", "sysadmin", "Staff"],
            name: "Reports",
            children: ["/reports"],
        },
        {
            id: 77,
            link: "/online-schedule",
            allowedRoles: ["any"],
            name: onlineScheduleName,
            children: ["/online-schedule", "/online-schedule/west", "/online-schedule/central", "/online-schedule/east", "/online-schedule/truckee"],
        },
    ];

    const iconLinks = [
        {
        id: 88, // Use a unique id for the logo section
        link: "/system", // Use "/" as the link for the logo
        allowedRoles: ["Admin", "sysadmin"], // Define roles that can access this link
        name: "System Administration",
        children: [
            "/system", 
            "/system/users", 
            "/system/meters",
            "/testing",
            "/testing/login",
            "/testing/scheduling"
        ],
        },
    ];

    return (
        <div
        className={` w-full h-16 align-middle ${defaultbg} subpixel-antialiased text-${defaultTextColorClass} fixed z-50 nav`}
        >
        <div
            className={
            "h-16 flex mx-auto justify-between items-center px-2 fixed w-[100vw]"
            }
        >
            <ul className={"hidden lg:flex flex-grow items-center"}>
            {roleBasedLinks.map(({ id, link, allowedRoles, name, children }) =>
                allowedRoles.includes("any") || allowedRoles.includes(userRole) ? (
                <li
                    key={id}
                    className={cn(
                    `nav-links h-[3.8rem] inline-flex items-center px-3 capitalize font-medium subpixel-antialiased ${defaultTextColorClass}  duration-200 pb-1`,
                    children.includes(pathname)
                        ? `text-orange-300 dark:text-orange-300/95 border-b-[3px] border-b-orange-300/95 -mb-2 pb-2 dark:border-b-orange-300/80 bg-gradient-to-t from-orange-300/10 via-orange-300/5 to-transparent dark:border-t-slate-800 rounded-sm`
                        : { defaultTextColorClass }
                    )}
                >
                    {id === 0 ? ( // Check if it's the logo section
                    <Link href={link}>
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <div
                                className={
                                "group w-max flex scale-100 hover:scale-110 duration-200"
                                }
                            >
                                <Image
                                src="/img/logo.png"
                                width={35}
                                height={35}
                                alt="logo"
                                className={cn(
                                    "group-hover:opacity-100 duration-200",
                                    children.includes(pathname)
                                    ? "opacity-100"
                                    : "opacity-60"
                                )}
                                style={{
                                    filter: children.includes(pathname) ? 'saturate(100%)' : 'saturate(30%)',
                                }} 
                                />
                                <span
                                className={cn(
                                    "ml-1 self-center group-hover:text-sky-400 duration-200",
                                    children.includes(pathname)
                                    ? "text-blue-400"
                                    : "text-blue-200/50"
                                )}
                                >
                                Water
                                </span>
                                <span
                                className={cn(
                                    `self-center  group-hover:text-yellow-400/90 dark:group-hover:text-yellow-300 
                                    duration-200`,
                                    children.includes(pathname)
                                    ? "text-orange-300 dark:text-orange-300/95"
                                    : "text-orange-100/60"
                                )}
                                >
                                MARK
                                </span>
                            </div>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                    </Link>
                    ) : (
                    <Link
                        className={cn(
                        "hover:scale-125 duration-100 cursor-pointer",
                        isDarkMode
                            ? "hover:text-yellow-400"
                            : "hover:text-yellow-300"
                        )}
                        href={link}
                    >
                        {name}
                    </Link>
                    )}
                </li>
                ) : null
            )}
            </ul>

            <div
            onClick={() => setNav(!nav)}
            className={`cursor-pointer pr-4 subpixel-antialiased ${defaultTextColorClass} lg:hidden z-50`}
            >
            {nav ? <FaTimes size={40} /> : <FaBars size={30} />}
            </div>

            {nav && (
            <ul
                className={`flex flex-col subpixel-antialiased items-center absolute top-0 left-0 w-full h-[100dvh] justify-around ${defaultbg} ${defaultTextColorClass} font-semibold py-12 gap-12 subpixel-antialiased z-40`}
            >
                {roleBasedLinks.map(({ id, link, name, allowedRoles }) =>
                allowedRoles.includes("any") ||
                allowedRoles.includes(userRole) ? (
                    <li
                    key={id}
                    className={
                        "px-4 cursor-pointer text-4xl subpixel-antialiased hover:text-amber-300 duration-200 link-underline"
                    }
                    >
                    <Link key={id} onClick={() => setNav(!nav)} href={link}>
                        /{name}
                    </Link>
                    </li>
                ) : null
                )}
            </ul>
            )}

            {iconLinks.map(({ id, children }) => (
            <div
                key={id}
                className={"inline-flex h-16 items-center pr-4 space-x-3"}
            >
                {["Admin", "sysadmin"].includes(userRole) && (
                <div
                    className={cn(
                    "inline-flex h-full items-center",
                    children.includes(pathname)
                        ? cn(
                            isDarkMode
                            ? "border-b-5 border-b-orange-300/40"
                            : "border-b-5 border-b-orange-300/40"
                        )
                        : "border-none"
                    )}
                >
                    <Link href="/system">
                    <div
                        className={cn(
                        `subpixel-antialiased`,
                        children.includes(pathname)
                            ? "text-red-500 scale-125 pt-1 animate-pulse"
                            : `${defaultTextColorClass}`
                        )}
                    >
                        <BsDatabaseFillGear
                        size={24}
                        className={`${iconHoverColorClass}`}
                        />
                    </div>
                    </Link>
                    
                </div>
                )}
                <ModeToggle />
                <div className={" w-px h-6 bg-gray-400"}></div>

                <Sheet>
                <SheetTrigger>
                    <div
                    className={`group ${defaultTextColorClass} ${iconHoverColorClass} subpixel-antialiased relative`}
                    >
                    <FaBell size={24} className={` subpixel-antialiased`} />
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
                <AvatarMenu />
            </div>
            ))}
        </div>
        </div>
    );
};

export default Navbar;


