import { FaGlobe } from "react-icons/fa6";
import { TbHexagonLetterC, TbHexagonLetterE, TbHexagonLetterT, TbHexagonLetterW } from "react-icons/tb";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const onlineLinks = [
  {
    id: 500, // Use a unique id for the logo section
    link: "/online-schedule", // Use "/" as the link for the logo
    content: (
      <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash Board</span>
      </>
    ),
  },
  {
    id: 501, // Use a unique id for the logo section
    link: "/online-schedule/west", // Use "/" as the link for the logo
    content: (
      <>
        <TbHexagonLetterW size={35} className={iconStyle} />
        <span className={labelTextClass}>West</span>
      </>
    ),
  },
  {
    id: 502, // Use a unique id for the logo section
    link: "/online-schedule/central", // Use "/" as the link for the logo
    content: (
      <>
        <TbHexagonLetterC size={35} className={iconStyle} />
        <span className={labelTextClass}>Central</span>
      </>
    ),
  },
  {
    id: 503, // Use a unique id for the logo section
    link: "/online-schedule/east", // Use "/" as the link for the logo
    content: (
      <>
        <TbHexagonLetterE size={35} className={iconStyle} />
        <span className={labelTextClass}>East</span>
      </>
    ),
  },
  {
    id: 504, // Use a unique id for the logo section
    link: "/online-schedule/truckee", // Use "/" as the link for the logo
    content: (
      <>
        <TbHexagonLetterT size={35} className={iconStyle} />
        <span className={labelTextClass}>Truckee</span>
      </>
    ),
  },
];
