import { FaGlobe } from "react-icons/fa6";
import { TbSquareRoundedLetterC, TbSquareRoundedLetterE, TbSquareRoundedLetterT, TbSquareRoundedLetterW } from "react-icons/tb";

const labelTextClass = "text-[10px] leading-3 subpixel-antialiased";
const iconStyle = `mb-[2px] subpixel-antialiased`;

export const metersLinks = [
  {
    id: 0, // Use a unique id for the logo section
    link: "/meters", // Use "/" as the link for the logo
    content: (
      <>
      <FaGlobe size={30} className={iconStyle} />
      <span className={labelTextClass}>Dash Board</span>
      </>
    ),
    
  },
  {
    id: 0, // Use a unique id for the logo section
    link: "/meters/west", // Use "/" as the link for the logo
    content: (
      <>
      <TbSquareRoundedLetterW size={30} className={iconStyle} />
      <span className={labelTextClass}>West</span>
      </>
    ),
    
  },
  {
    id: 0, // Use a unique id for the logo section
    link: "/meters/central", // Use "/" as the link for the logo
    content: (
      <>
      <TbSquareRoundedLetterC size={30} className={iconStyle} />
      <span className={labelTextClass}>Central</span>
      </>
    ),
    
  },
  {
    id: 0, // Use a unique id for the logo section
    link: "/meters/east", // Use "/" as the link for the logo
    content: (
      <>
      <TbSquareRoundedLetterE size={30} className={iconStyle} />
      <span className={labelTextClass}>East</span>
      </>
    ),
    
  },
  {
    id: 0, // Use a unique id for the logo section
    link: "/meters/truckee", // Use "/" as the link for the logo
    content: (
      <>
      <TbSquareRoundedLetterT size={30} className={iconStyle} />
      <span className={labelTextClass}>Truckee</span>
      </>
    ),
    
  },
  
];