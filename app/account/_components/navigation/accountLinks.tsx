import { FaBuffer, FaChartArea, FaGear } from "react-icons/fa6";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";
import { ImMeter2 } from "react-icons/im";
import { IoPerson } from "react-icons/io5";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const analysisLinks = [
  {
    id: 900, // Use a unique id for the logo section
    link: "/account", // Use "/" as the link for the logo
    content: (
      <>
        <IoPerson size={30} className={iconStyle} />
        <span className={labelTextClass}>Account</span>
      </>
    ),
  },
  {
    id: 901,
    link: "/analysis/master",
    content: (
      <>
        <FaChartArea size={25} className={iconStyle} />
        <span className={labelTextClass}>Order Analysis</span>
      </>
    ),
  },
  {
    id: 902,
    link: "/analysis/meters",
    content: (
      <>
        <ImMeter2 size={30} className={iconStyle} />
        <span className={labelTextClass}>Meter Data</span>
      </>
    ),
  },
  {
    id: 903,
    link: "/analysis/adjustments",
    content: (
      <>
        <BsWrenchAdjustableCircleFill size={30} className={iconStyle} />
        <span className={labelTextClass}>Adjust Order</span>
      </>
    ),
  },
  {
    id: 904,
    link: "/analysis/settings",
    content: (
      <>
        <FaGear size={30} className={iconStyle} />
        <span className={labelTextClass}>Settings</span>
      </>
    ),
  },
];
