import { FaUsersCog } from "react-icons/fa";
import { BsFillHouseGearFill } from "react-icons/bs";
import { TbAdjustmentsCog } from "react-icons/tb";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const systemLinks = [
  {
    id: 0, // Use a unique id for the logo section
    link: "/system", // Use "/" as the link for the logo
    content: (
      <>
      <BsFillHouseGearFill size={30} className={iconStyle} />
      <span className={labelTextClass}>System Dash</span>
      </>
    ),
    
  },
  {
    id: 1,
    link: "/system/users",
    content: (
      <>
      <FaUsersCog size={25} className={iconStyle} />
      <span className={labelTextClass}>Manage Users</span>
      </>
    ),
    
  },
  {
    id: 2,
    link: "/system/meters",
    content: (
      <>
      <TbAdjustmentsCog size={30} className={iconStyle} />
      <span className={labelTextClass}>Manage Meters</span>
      </>
    ),
    
  },
  
];