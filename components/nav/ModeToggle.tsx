// \components\ModeToggle.tsx
"use client";

import * as React from "react";
import { PiSunDuotone } from "react-icons/pi";
import { RxMoon, RxSun } from "react-icons/rx";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`group scale-75 border-none transition-all hover:scale-90 hover:bg-gray-600/80 dark:bg-background/60 bg-gray-200/95 rounded-2xl`}
        >
          <PiSunDuotone className={`h-[1.4rem] w-[1.4rem] rotate-0 scale-125 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-yellow-400`} />
          <RxMoon className={`absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-125 dark:group-hover:text-yellow-300`} />
          <span className={"sr-only"}>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
