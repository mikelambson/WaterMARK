"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";

type SideLink = {
  id: number;
  link: string;
  content: React.ReactNode;
};

type NavigationSidebarProps = {
  sideLinks: SideLink[];
};

export const Sidebar: React.FC<NavigationSidebarProps> = ({ sideLinks }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "light";
  const pathname = usePathname();

  // State for sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const sidebarStyle = `pt-14 sm:pt-0 bg-stone-400/60 dark:bg-zinc-800 px-[1px] text-center border-solid border-r-[.5px] border-neutral-400 dark:border-neutral-700 flex flex-col h-full transform transition-transform duration-300 ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
  }`;
  const sidebarItem = `hover:text-yellow-800 dark:hover:text-yellow-300 duration-200 cursor-pointer flex flex-col items-center drop-shadow-md`;

  return (
    <nav>
      {/* Mobile toggle button */}
      <Button
        variant={"ghost"}
        className="sm:hidden fixed top-[4.5rem] left-[1px] z-50 p-2 rounded"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? "Close" : "Open"}
      </Button>

      {/* Sidebar */}
      <div className={`fixed h-full w-14 flex z-40`}>
        <div className={sidebarStyle}>
          <div className="mb-5">
            {sideLinks.map((item: any) => (
              <div
                key={item.id}
                className={cn(
                  "py-2 border-r border-b border-t rounded-r-sm -ml-1 -mr-[.75px] pl-1",
                  pathname === item.link
                    ? cn(
                        isDarkMode
                          ? "border-b-yellow-950/50 border-t-orange-100/20 border-r-orange-200/60 bg-gradient-to-l from-yellow-950/60 via-yellow-950/50 to-yellow-950/40 drop-shadow-md"
                          : "border-t-orange-50/5 border-b-orange-950/20 border-r-orange-300/40 bg-gradient-to-l from-orange-300/40 via-orange-300/30 to-orange-300/20"
                      )
                    : "border-none hover:scale-90"
                )}
              >
                <Link
                  key={item.id}
                  href={item.link}
                  className={cn(
                    `${sidebarItem}`,
                    pathname === item.link
                      ? cn(
                          isDarkMode ? "text-orange-300" : "text-orange-300/95"
                        )
                      : cn(isDarkMode ? "text-zinc-500" : "text-stone-500")
                  )}
                >
                  {item.content}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
