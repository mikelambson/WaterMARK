// \app\(deliveries)\_components\navigation\navigation-sidebar.tsx
"use client"
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
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

export const Sidebar: React.FC<NavigationSidebarProps> = ({sideLinks}) => {

  const { theme } = useTheme();
  const isDarkMode = theme === "light";
  const pathname = usePathname();

  const sidebarBgColor = isDarkMode ? 'bg-stone-300' : 'bg-zinc-800';
  const sidebarBorder = isDarkMode ? 'border-neutral-400' : 'border-neutral-700';
  const sidebarHover = isDarkMode ? 'hover:text-yellow-600' : 'hover:text-amber-300';
  
  const sidebarStyle = `${sidebarBgColor} pt-4 px-[1px] text-center border-solid border-r-[.5px] ${sidebarBorder} flex flex-col`;
  const sidebarItem =  `${sidebarHover} cursor-pointer flex flex-col items-center mb-4 drop-shadow-md`;
  
  
  // const permission = await deliveriesPermission();

  // if (!deliveriesPermission) {
  //   return redirect("/")
  // }
 
  return ( 
      <nav>
      <div className="fixed flex h-full w-14">
      <div className={sidebarStyle}>
      <div className="mb-6">
        {sideLinks.map((item: any) => (
          <div className={cn(pathname === item.link ? 
            cn(isDarkMode ? "border-r border-yellow-700/90" :"border-r border-orange-300/95") : "border-none")}>
            <Link 
              key={item.id}
              href={item.link}
              className={cn(`${sidebarItem}`, pathname === item.link ? 
              cn(isDarkMode ? "text-yellow-700/90" :"text-orange-300/95") : 
              cn(isDarkMode ? "text-zinc-500" : "text-stone-500"))}
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
}
 