// \app\(analysis)\_components\navigation\navigation-sidebar.tsx
"use client"
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { FaChartArea, FaBuffer, FaGear } from "react-icons/fa6";
import { ImMeter2 } from "react-icons/im";
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

  
 
  const labelTextClass = "text-[10px] leading-3 drop-shadow";
  const iconStyle = `mb-[2px] drop-shadow `;
  // const permission = await analysisPermission();

  // if (!analysisPermission) {
  //   return redirect("/")
  // }
  

  const sideLinks = [
    {
      id: 0, // Use a unique id for the logo section
      link: "/analysis", // Use "/" as the link for the logo
      content: (
        <>
        <FaBuffer size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash</span>
        </>
      ),
      
    },
    {
      id: 1,
      link: "/analysis/master",
      content: (
        <>
        <FaChartArea size={25} className={iconStyle} />
        <span className={labelTextClass}>Master</span>
        </>
      ),
      
    },
    {
      id: 2,
      link: "/analysis/meters",
      content: (
        <>
        <ImMeter2 size={30} className={iconStyle} />
            <span className={labelTextClass}>Meter Data</span>
        </>
      ),
      
    },
    {
      id: 3,
      link: "/analysis/adjustments",
      content: (
        <>
        <BsWrenchAdjustableCircleFill size={30} className={iconStyle} />
        <span className={labelTextClass}>Adjust Order</span>
        </>
      ),
    },
    {
      id: 4,
      link: "/analysis/settings",
      content: (
        <>
        <FaGear size={30} className={iconStyle} />
        <span className={labelTextClass}>Settings</span>
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
        {sideLinks.slice(0, -1).map((item) => (
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
      <div className=" absolute bottom-16 left-[.64rem]">
          <Link 
            key={sideLinks[sideLinks.length - 1].id}
            href={sideLinks[sideLinks.length - 1].link}
            className={cn(`${sidebarItem}`, pathname === sideLinks[sideLinks.length - 1].link ? 
            cn(isDarkMode ? "text-amber-700" : "text-orange-300") : 
            cn(isDarkMode ? "text-zinc-500" : "text-stone-500"))}
          >
            {sideLinks[sideLinks.length - 1].content}
          </Link>
        </div>
      
    </div>
    </div>
    </nav>
    );
}
 