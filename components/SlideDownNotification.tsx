"use client"
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "next-themes";

const SlideDownNotification = ({ initialVisible = true }) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const { theme } = useTheme();

  const handleHideNotification = () => {
    setIsVisible(false);
  };

  const darkModeGradient = "bg-gradient-to-t from-amber-200 to-amber-400";
  const lightModeGradient = "bg-gradient-to-t from-amber-100 to-amber-200";
  const gradientClass =
    theme === "light" ? lightModeGradient : darkModeGradient;

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-40 flex justify-between items-center w-11/12 h-10 px-1 text-left ${gradientClass} text-black border-gray-400 border rounded-sm drop-shadow-md transition-transform transform translate-y-0 duration-300`}
        >
          <p>Popup System Notification</p>
          <FaTimes
            size={20}
            onClick={handleHideNotification}
            className={"cursor-pointer"}
          />
        </div>
      )}
    </>
  );
};

export default SlideDownNotification;
