import { FaGlobe } from "react-icons/fa6";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const testingLinks = [
  {
    id: 9999999, // Use a unique id for the logo section
    link: "/login", // Use "/" as the link for the logo
    content: (
      <>
        <FaGlobe size={30} className={iconStyle} />
        <span className={labelTextClass}>Login</span>
      </>
    ),
  },
];
