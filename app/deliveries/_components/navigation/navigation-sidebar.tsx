// \app\(deliveries)\_components\navigation\navigation-sidebar.tsx
"use client"
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { FaTasks, FaUserClock } from "react-icons/fa";
import { FaGlobe, FaFileImport, FaHouseFloodWaterCircleArrowRight, FaGear, FaRegCalendarDays } from "react-icons/fa6";


export const NavigationSidebar = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === "light";
  const pathname = usePathname();
  
  
  
  const sidebarBgColor = isDarkMode ? 'bg-stone-300' : 'bg-zinc-800';
  const sidebarBorder = isDarkMode ? 'border-neutral-400' : 'border-neutral-700';
  const sidebarHover = isDarkMode ? 'hover:text-orange-900' : 'hover:text-amber-300';
  
  
  const sidebarStyle = `${sidebarBgColor} pt-4 px-[5px] text-center border-solid border-r-[.5px] ${sidebarBorder} flex flex-col`;
  const sidebarItem =  `${sidebarHover} cursor-pointer flex flex-col items-center mb-4`;

  
 
  const labelTextClass = "text-[10px] drop-shadow";
  const iconStyle = `-mb-[1px] drop-shadow `;
  // const permission = await deliveriesPermission();

  // if (!deliveriesPermission) {
  //   return redirect("/")
  // }
  

  const sideLinks = [
    {
      id: 0, // Use a unique id for the logo section
      link: "/deliveries", // Use "/" as the link for the logo
      content: (
        <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash</span>
        </>
      ),
      
    },
    {
      id: 1,
      link: "/deliveries/schedule",
      content: (
        <>
        <FaHouseFloodWaterCircleArrowRight size={30} className={iconStyle} />
        <span className={labelTextClass}>Schedule</span>
        </>
      ),
      
    },
    {
      id: 2,
      link: "/deliveries/tasks",
      content: (
        <>
        <FaTasks size={30} className={iconStyle} />
            <span className={labelTextClass}>Tasks</span>
        </>
      ),
      
    },
    {
      id: 3,
      link: "/deliveries/ditchrider-schedule",
      content: (
        <>
        <FaUserClock size={30} className={iconStyle} />
        <span className={labelTextClass}>Ditchrider Schedule</span>
        </>
      ),
    },
  ];


  return ( 
      <nav>
      <div className="fixed flex h-full w-10">
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
 