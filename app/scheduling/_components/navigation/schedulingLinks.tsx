import { FaFileImport, FaGear, FaGlobe, FaHouseTsunami, FaUserClock } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = "mb-[2px] subpixel-antialiased";

export const schedulingLinks = [
  {
    id: 0, // Use a unique id for the logo section
    link: "/scheduling", // Use "/" as the link for the logo
    content: (
      <>
      <FaGlobe size={30} className={iconStyle} />
      <span className={labelTextClass}>Dash Board</span>
      </>
    ),
    
  },
  {
    id: 1,
    link: "/scheduling/daily",
    content: (
      <>
      <FaFileImport size={25} className={iconStyle} />
      <span className={labelTextClass}>Import Orders</span>
      </>
    ),
    
  },
  {
    id: 2,
    link: "/scheduling/board",
    content: (
      <>
      <FaHouseTsunami size={30} className={iconStyle} />
      <span className={labelTextClass}>Schedule Water</span>
      </>
    ),
    
  },
  {
    id: 3,
    link: "/scheduling/ditchrider-tasks",
    content: (
      <>
      <FaTasks size={30} className={iconStyle} />
          <span className={labelTextClass}>Manage Tasks</span>
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
  {
    id: 5,
    link: "/scheduling/settings",
    content: (
      <>
      <FaGear size={30} className={iconStyle} />
      <span className={labelTextClass}>Settings</span>
      </>
    ),
  },
];