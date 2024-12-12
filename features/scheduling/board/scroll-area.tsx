"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils/GeneralUtils"

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  autoScroll?: boolean;
  onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, autoScroll, onScroll, ...props }, ref) => {

  const handleScroll = (e: any) => {
    if (autoScroll) {
      console.log('handleScroll called');
      // Check if the dragged item is near the top or bottom
      // Assuming 1 inch is approximately 96 pixels (standard for many screens)
      const inchesToPixels = (inches:number) => inches * 96;
      // Set threshold in inches
      const thresholdInInches = 0.75;
      const thresholdInPixels = inchesToPixels(thresholdInInches);
      const threshold = thresholdInPixels;
      const topThreshold = e.target.scrollTop < threshold;
      const bottomThreshold =
        e.currentTarget.scrollHeight -
        e.currentTarget.scrollTop -
        e.currentTarget.clientHeight < threshold;

        // Log information for debugging
      console.log('scrollTop:', e.target.scrollTop);
      console.log('threshold:', threshold);
      console.log('topThreshold:', topThreshold);
      console.log('bottomThreshold:', bottomThreshold);

      // Perform auto-scrolling
      if (topThreshold || bottomThreshold) {
        // Calculate the direction based on the position of the dragged item
        const direction = topThreshold ? -1 : 1;

        // Adjust the scroll position
        e.target.scrollTop += direction * 10; // You can adjust the scrolling speed
        console.log('Updated scrollTop:', e.target.scrollTop);
      }
    }
  };

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onScroll={handleScroll}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
      </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
