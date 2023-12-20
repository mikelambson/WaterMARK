import { FaSearch } from "react-icons/fa";
import { FaGlobe, FaPhoneVolume } from "react-icons/fa6";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";
import { IoIosConstruct } from "react-icons/io";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const sideLinks = [
    {
      id: 0, 
      link: "/admin", 
      content: (
        <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash Board</span>
        </>
      ),
      
    },
    {
      id: 1,
      link: "/admin/lookup",
      content: (
        <>
        <FaSearch size={30} className={iconStyle} />
        <span className={labelTextClass}>Order Lookup</span>
        </>
      ),
      
    },
    {
      id: 2,
      link: "/admin/callout",
      content: (
        <>
        <FaPhoneVolume size={30} className={iconStyle} />
        <span className={labelTextClass}>Callouts</span>
        </>
      ),
    },
    {
      id: 3,
      link: "/admin/adjustments",
      content: (
        <>
        <BsWrenchAdjustableCircleFill size={30} className={iconStyle} />
        <span className={labelTextClass}>Adjust Orders</span>
        </>
      ),
    },
    {
      id: 4,
      link: "/admin/workorders",
      content: (
        <>
        <IoIosConstruct size={30} className={iconStyle} />
        <span className={labelTextClass}>Work Orders</span>
        </>
      ),
    },
  ];