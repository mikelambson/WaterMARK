import { FaSearch } from "react-icons/fa";
import { FaGlobe, FaPhoneVolume } from "react-icons/fa6";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";
import { IoIosConstruct } from "react-icons/io";
import { MdPostAdd } from "react-icons/md";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const adminLinks = [
  {
    id: 100,
    link: "/admin",
    content: (
      <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Dash Board</span>
      </>
    ),
  },
  {
    id: 101,
    link: "/admin/lookup",
    content: (
      <>
        <FaSearch size={30} className={iconStyle} />
        <span className={labelTextClass}>Order Lookup</span>
      </>
    ),
  },
  {
    id: 102,
    link: "/admin/callout",
    content: (
      <>
        <FaPhoneVolume size={30} className={iconStyle} />
        <span className={labelTextClass}>Callouts</span>
      </>
    ),
  },
  {
    id: 103,
    link: "/admin/adjustments",
    content: (
      <>
        <BsWrenchAdjustableCircleFill size={30} className={iconStyle} />
        <span className={labelTextClass}>Adjust Orders</span>
      </>
    ),
  },
  {
    id: 104,
    link: "/admin/workorders",
    content: (
      <>
        <IoIosConstruct size={30} className={iconStyle} />
        <span className={labelTextClass}>Work Orders</span>
      </>
    ),
  },
  {
    id: 105,
    link: "/admin/post",
    content: (
      <>
        <MdPostAdd size={30} className={iconStyle} />
        <span className={labelTextClass}>Post Orders</span>
      </>
    ),
  },
];
