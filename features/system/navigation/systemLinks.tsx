import { FaUsersCog } from "react-icons/fa";
import { BsFillHouseGearFill } from "react-icons/bs";
import { TbAdjustmentsCog } from "react-icons/tb";
import { GrTest } from "react-icons/gr";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const systemLinks = [
  {
    id: 800, // Use a unique id for the logo section
    link: "/system", // Use "/" as the link for the logo
    content: (
      <>
        <BsFillHouseGearFill size={30} className={iconStyle} />
        <span className={labelTextClass}>System Dash</span>
      </>
    ),
  },
  {
    id: 801,
    link: "/system/users",
    content: (
      <>
        <FaUsersCog size={25} className={iconStyle} />
        <span className={labelTextClass}>Manage Users</span>
      </>
    ),
  },
  {
    id: 802,
    link: "/system/meters",
    content: (
      <>
        <TbAdjustmentsCog size={30} className={iconStyle} />
        <span className={labelTextClass}>Manage Meters</span>
      </>
    ),
  },
  {
    id: 888,
    link: "/testing",
    content: (
      <>
        <GrTest size={30} className={iconStyle} />
        <span className={labelTextClass}>Testing</span>
      </>
    ),
  },
];
