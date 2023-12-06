// \app\(deliveries)\_components\navigation\navigation-sidebar.tsx
"use client"
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { FaSearch } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";


export const NavigationSidebar = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === "light";
  const pathname = usePathname();
  
  
  
  const sidebarBgColor = isDarkMode ? 'bg-stone-300' : 'bg-zinc-800';
  const sidebarBorder = isDarkMode ? 'border-neutral-400' : 'border-neutral-700';
  const sidebarHover = isDarkMode ? 'hover:text-orange-900' : 'hover:text-amber-300';
  
  
  const sidebarStyle = `${sidebarBgColor} pt-4 px-[5px] text-center border-solid border-r-[.5px] ${sidebarBorder} flex flex-col`;
  const sidebarItem =  `${sidebarHover} cursor-pointer flex flex-col items-center mb-4`;

  
 
  const labelTextClass = "text-[10px] leading-3 subpixel-antialiased drop-shadow";
  const iconStyle = `mb-[2px] subpixel-antialiased drop-shadow `;
  // const permission = await deliveriesPermission();

  // if (!deliveriesPermission) {
  //   return redirect("/")
  // }
  

  const sideLinks = [
    {
      id: 0, // Use a unique id for the logo section
      link: "/admin", // Use "/" as the link for the logo
      content: (
        <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash Board</span>
        </>
      ),
      
    },
    {
      id: 1,
      link: "/admin/lookup",
      content: (
        <>
        <FaSearch size={30} className={iconStyle} />
        <span className={labelTextClass}>Order Lookup</span>
        </>
      ),
      
    },
    {
      id: 2,
      link: "/admin/adjustments",
      content: (
        <>
        <BsWrenchAdjustableCircleFill size={30} className={iconStyle} />
        <span className={labelTextClass}>Adjust Orders</span>
        </>
      ),
    },
  ];


  return ( 
      <nav>
      <div className="fixed flex h-full w-14">
      <div className={sidebarStyle}>
      {/* Your Discord-like menu items go here */}
      <div className="mb-6">
        {sideLinks.map((item) => (
          <Link 
            key={item.id}
            href={item.link}
            className={cn(`${sidebarItem}`, pathname === item.link ? 
            cn(isDarkMode ? "text-amber-700" :"text-orange-300") : 
            cn(isDarkMode ? "text-zinc-500" : "text-stone-500"))}
            >
              {item.content}
            </Link>
          
        ))}
      </div>
      
    </div>
    </div>
    </nav>
    );
}
 