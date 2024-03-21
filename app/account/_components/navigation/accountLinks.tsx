import { FaUserGear } from "react-icons/fa6";
import { IoNotifications, IoPerson } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const accountLinks = [
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
    link: "/account/notifications",
    content: (
      <>
        <IoNotifications size={25} className={iconStyle} />
        <span className={labelTextClass}>Notifications</span>
      </>
    ),
  },
  {
    id: 902,
    link: "/account/messages",
    content: (
      <>
        <SiGooglemessages size={30} className={iconStyle} />
        <span className={labelTextClass}>Messages</span>
      </>
    ),
  },
  
  {
    id: 903,
    link: "/account/settings",
    content: (
      <>
        <FaUserGear size={30} className={iconStyle} />
        <span className={labelTextClass}>Settings</span>
      </>
    ),
  },
];
