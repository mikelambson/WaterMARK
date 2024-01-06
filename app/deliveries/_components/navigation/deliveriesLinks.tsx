import { FaGlobe, FaHouseFloodWaterCircleArrowRight } from "react-icons/fa6";
import { ImCalendar } from "react-icons/im";
import { FaTasks } from "react-icons/fa";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const deliveriesLinks = [
  {
    id: 0, // Use a unique id for the logo section
    link: "/deliveries", // Use "/" as the link for the logo
    content: (
      <>
      <FaGlobe size={30} className={iconStyle} />
      <span className={labelTextClass}>Dash Board</span>
      </>
    ),
    
  },
  {
    id: 1,
    link: "/deliveries/schedule",
    content: (
      <>
      <FaHouseFloodWaterCircleArrowRight size={30} className={iconStyle} />
      <span className={labelTextClass}>Delivery Schedule</span>
      </>
    ),
    
  },
  {
    id: 2,
    link: "/deliveries/tasks",
    content: (
      <>
      <FaTasks size={30} className={iconStyle} />
          <span className={labelTextClass}>Daily Tasks</span>
      </>
    ),
    
  },
  {
    id: 3,
    link: "/deliveries/ditchrider-schedule",
    content: (
      <>
      <ImCalendar size={30} className={iconStyle} />
      <span className={labelTextClass}>Work Schedule</span>
      </>
    ),
  },
];