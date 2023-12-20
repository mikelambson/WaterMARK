import { FaBuffer, FaChartArea, FaGear } from "react-icons/fa6";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";
import { ImMeter2 } from "react-icons/im";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const sideLinks = [
  {
    id: 0, // Use a unique id for the logo section
    link: "/analysis", // Use "/" as the link for the logo
    content: (
      <>
      <FaBuffer size={30} className={iconStyle} />
      <span className={labelTextClass}>Dash Board</span>
      </>
    ),
    
  },
  {
    id: 1,
    link: "/analysis/master",
    content: (
      <>
      <FaChartArea size={25} className={iconStyle} />
      <span className={labelTextClass}>Order Analysis</span>
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