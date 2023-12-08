"use client"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { DateTime } from "@/components/function/GetDateTime"
import { Skeleton } from "@/components/ui/skeleton";

interface RenderOrdersProps {
  repeatCount?: number;
}

const RenderOrders: React.FC<RenderOrdersProps> = ({ repeatCount = 5 }) => {
  const { toast } = useToast();
  const currentDateTime = DateTime();
  const called = {
    title: "#{order} called",
    description: currentDateTime,
  };

  // Function to generate repeated components
  const generateComponents = () => {
    const components = [];

    for (let i = 0; i < repeatCount; i++) {
      components.push(
        <div key={i} className="ml-4 flex items-center space-x-4 mb-2">
          <Skeleton className="h-12 w-96" />
          <div className=" space-y-2">
            <Skeleton className="h-4 w-[650px]" />
            <Skeleton className="h-4 w-[650px]" />
          </div>
          <Button
            variant={"secondary"}
            onClick={() => {
              toast(called);
            }}
          >
            Submit
          </Button>
        </div>
      );
    }

    return components;
  };

  // Return the generated components
  return (
    <div className="mt-4 px-2 flex flex-col gap-2">
      {generateComponents()}
    </div>
  );
};

export default RenderOrders;