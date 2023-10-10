// \app\(scheduling)\_components\navigation\navigation-sidebar.tsx
"use client"
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { FaTasks, FaUserClock } from "react-icons/fa";
import { FaGlobe, FaFileImport, FaHouseTsunami, FaRegCalendarDays } from "react-icons/fa6";


export const NavigationSidebar = () => {

  const { theme } = useTheme();
  const isDarkMode = theme === "light";
  const pathname = usePathname();
  
  
  
  const sidebarBgColor = isDarkMode ? 'bg-stone-300' : 'bg-zinc-800';
  const sidebarBorder = isDarkMode ? 'border-neutral-400' : 'border-neutral-700';
  const sidebarHover = isDarkMode ? 'hover:text-amber-500' : 'hover:text-amber-300';
  const sidebarStyle = `${sidebarBgColor} pt-4 px-[5px] text-center border-solid border-r-[.5px] ${sidebarBorder}`;

 
  const sidebarItem =  `${sidebarHover} cursor-pointer flex flex-col items-center mb-4`;
  
 
  const labelTextClass = "text-[10px] drop-shadow";
  const iconStyle = `-mb-[1px] drop-shadow `;
  // const permission = await schedulingPermission();

  // if (!schedulingPermission) {
  //   return redirect("/")
  // }
  

  const sideLinks = [
    {
      id: 0, // Use a unique id for the logo section
      link: "/scheduling", // Use "/" as the link for the logo
      content: (
        <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash</span>
        </>
      ),
      
    },
    {
      id: 1,
      link: "/scheduling/daily",
      content: (
        <>
        <FaFileImport size={25} className={iconStyle} />
        <span className={labelTextClass}>New Orders</span>
        </>
      ),
      
    },
    {
      id: 2,
      link: "/scheduling/schedule-orders",
      content: (
        <>
        <FaHouseTsunami size={30} className={iconStyle} />
        <span className={labelTextClass}>Schedule</span>
        </>
      ),
      
    },
    {
      id: 3,
      link: "/scheduling/ditchrider-tasks",
      content: (
        <>
        <FaTasks size={30} className={iconStyle} />
            <span className={labelTextClass}>Tasks</span>
        </>
      ),
      
    },
    {
      id: 4,
      link: "/scheduling/ditchrider-schedule",
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
            cn(isDarkMode ? "text-cyan-900" :"text-teal-500") : 
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
 