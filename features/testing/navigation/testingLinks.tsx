import { MdDashboard } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import { GrSchedules } from "react-icons/gr";
import { TbLoader3, TbMapRoute } from "react-icons/tb";
import { SiFreelancer } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { BsDatabaseFillGear } from "react-icons/bs";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased px-1 break-words";
const iconStyle = `mb-[2px] subpixel-antialiased`;


export const testingLinks = [
  {
    id: 998999, // Use a unique id for the logo section
    link: "/system", // Use "/" as the link for the logo
    content: (
      <>
        <BsDatabaseFillGear size={30} className={iconStyle} />
        <span className={labelTextClass}>Back to System</span>
      </>
    ),
  },
  {
    id: 999000, // Use a unique id for the logo section
    link: "/testing", // Use "/" as the link for the logo
    content: (
      <>
        <MdDashboard size={30} className={iconStyle} />
        <span className={labelTextClass}>DEV DASH</span>
      </>
    ),
  },
  {
    id: 999001, // Use a unique id for the logo section
    link: "/testing/login", // Use "/" as the link for the logo
    content: (
      <>
        <RiShieldUserFill size={30} className={iconStyle} />
        <span className={labelTextClass}>DEV LOGIN</span>
      </>
    ),
  },
  {
    id: 999002, // Use a unique id for the logo section
    link: "/testing/scheduling", // Use "/" as the link for the logo
    content: (
      <>
        <GrSchedules size={30} className={iconStyle} />
        <span className={labelTextClass}>DEV SCHEDULE</span>
      </>
    ),
  },
  {
    id: 999003, // Use a unique id for the logo section
    link: "/testing/loader", // Use "/" as the link for the logo
    content: (
      <>
        <TbLoader3 size={30} className={iconStyle} />
        <span className={labelTextClass}>DEV LOADER</span>
      </>
    ),
  },
  {
    id: 999004, // Use a unique id for the logo section
    link: "/testing/geomap", // Use "/" as the link for the logo
    content: (
      <>
        <TbMapRoute size={30} className={iconStyle} />
        <span className={labelTextClass}>Geo Mapping</span>
      </>
    ),
  },
  {
    id: 999005, // Use a unique id for the logo section
    link: "/testing/colors", // Use "/" as the link for the logo
    content: (
      <>
        <IoIosColorPalette size={30} className={iconStyle} />
        <span className={labelTextClass}>Colors</span>
      </>
    ),
  },
];
