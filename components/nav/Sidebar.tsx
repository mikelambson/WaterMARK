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

  const sidebarBgColor = isDarkMode ? 'bg-stone-400/60' : 'bg-zinc-800';
  const sidebarBorder = isDarkMode ? 'border-neutral-400' : 'border-neutral-700';
  const sidebarHover = isDarkMode ? 'hover:text-yellow-300' : 'hover:text-yellow-300';
  
  const sidebarStyle = `${sidebarBgColor} px-[1px] text-center border-solid border-r-[.5px] ${sidebarBorder} flex flex-col`;
  const sidebarItem =  `${sidebarHover} duration-200 cursor-pointer flex flex-col items-center drop-shadow-md`;
  
  
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
          <div className={cn("py-2 border-r border-b border-t rounded-r-sm ", pathname === item.link ? 
            cn(isDarkMode ? "border-t-yellow-50/5 border-b-yellow-900/10 border-r-yellow-700/40 bg-gradient-to-l from-yellow-700/30 via-yellow-700/20 to-yellow-700/10" :
            "border-t-orange-50/5 border-b-orange-950/20 border-r-orange-300/40 bg-gradient-to-l from-orange-300/30 via-orange-300/20 to-orange-300/10") : "border-none hover:scale-90")}>
            <Link 
              key={item.id}
              href={item.link}
              className={cn(`${sidebarItem}`, pathname === item.link ? 
              cn(isDarkMode ? "text-yellow-900" :"text-orange-300/95") : 
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
 