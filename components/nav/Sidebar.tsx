// \app\(deliveries)\_components\navigation\navigation-sidebar.tsx
"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { sideLinks } from "@/app/admin/_components/navigation/adminLinks";

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

  const sidebarBgColor = isDarkMode ? "bg-stone-400/60" : "bg-zinc-800";
  

  const sidebarStyle = `bg-stone-400/60 dark:bg-zinc-800 px-[1px] text-center border-solid border-r-[.5px] border-neutral-400 dark:border-neutral-700 flex flex-col`;
  const sidebarItem = `hover:text-yellow-800 dark:hover:text-yellow-300 duration-200 cursor-pointer flex flex-col items-center drop-shadow-md`;

  // const permission = await deliveriesPermission();

  // if (!deliveriesPermission) {
  //   return redirect("/")
  // }

  return (
    <nav>
      <div className="fixed flex h-full w-14">
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
                          ? "border-b-yellow-950/60 border-t-orange-100/60 border-r-orange-100/70 bg-gradient-to-l from-yellow-950/60 via-yellow-950/50 to-yellow-950/40"
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
