import {
  FaClipboardUser,
  FaFileImport,
  FaGear,
  FaGlobe,
  FaHouseTsunami,
  FaScrewdriverWrench,
  FaUserClock,
} from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = "mb-[2px] subpixel-antialiased";
const lastIcon = "mt-[12vh] mb-[2px] subpixel-antialiased";

export const schedulingLinks = [
  {
    id: 700, // Use a unique id for the logo section
    link: "/scheduling", // Use "/" as the link for the logo
    content: (
      <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash Board</span>
      </>
    ),
  },
  {
    id: 701,
    link: "/scheduling/daily",
    content: (
      <>
        <FaFileImport size={25} className={iconStyle} />
        <span className={labelTextClass}>Import Orders</span>
      </>
    ),
  },
  {
    id: 702,
    link: "/scheduling/board",
    content: (
      <>
        <FaHouseTsunami size={30} className={iconStyle} />
        <span className={labelTextClass}>Schedule Water</span>
      </>
    ),
  },
  {
    id: 703,
    link: "/scheduling/ditchrider-tasks",
    content: (
      <>
        <FaTasks size={30} className={iconStyle} />
        <span className={labelTextClass}>Manage Tasks</span>
      </>
    ),
  },
  {
    id: 704,
    link: "/scheduling/ditchrider-schedule",
    content: (
      <>
        {/* <FaUserClock size={30} className={iconStyle} /> */}
        <FaClipboardUser size={30} className={iconStyle} />
        <span className={labelTextClass}>Ditchrider Schedule</span>
      </>
    ),
  },
  {
    id: 705,
    link: "/scheduling/settings",
    content: (
      <>
        <FaGear size={30} className={iconStyle} />
        <span className={labelTextClass}>Settings</span>
      </>
    ),
  },
  // {
  //   id: 706,
  //   link: "/scheduling/dev",
  //   content: (
  //     <>
  //       <FaScrewdriverWrench size={30} className={lastIcon} />
  //       <span className={labelTextClass}>DEV</span>
  //     </>
  //   ),
  // },
];
