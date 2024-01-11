// components/home/SysInfo.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFlowsStore from "@/lib/store/opsFlowsStore";
import { initializeFlowsStore } from "@/lib/getOpsFlows";
import { formatNumber } from "@/lib/basicFunctions";
import { SimpleForcast } from "@/components/cards/Forcast";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

initializeFlowsStore();

interface SysInfoProps {
  className?: string;
}

const SysInfo: React.FC<SysInfoProps> = ({ className }) => {
  const { flows, isLoading } = useFlowsStore();
  // const sortedFlows = [...flows].sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center">System Information</CardTitle>
        <CardDescription className="text-center">
          Reservior Level & System Flow Data
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[64%]">
        <ScrollArea className="w-full max-w-5xl mx-auto rounded-md h-[14rem] border">
          <table
            className={cn(
              "w-full rounded-md border-collapse",
              isLoading ? "border-none" : "border-b"
            )}
          >
            <thead className="w-full">
              <tr className="bg-background text-card-alternative w-full h-10 text-xl font-extrabold">
                <th></th>
                <th className=" text-left">Feature</th>
                <th className="text-right">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="w-full">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>
                        <Skeleton className="w-full h-[2.15rem] rounded-xl" />
                      </td>
                      <td>
                        <Skeleton className="w-full h-[2.15rem] rounded-xl" />
                      </td>
                      <td></td>
                    </tr>
                  ))
                : flows.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b font-mono font-semibold"
                    >
                      <td className="w-8" />
                      <td className="py-2">{row.name}</td>
                      <td className="text-right">
                        {formatNumber(
                          row.remoteValue !== null &&
                            row.remoteValue !== 0 &&
                            !row.override
                            ? row.remoteValue
                            : row.manualValue ?? 0
                        )}
                        &ensp;{row.type}
                      </td>
                      <td className="w-8" />
                    </tr>
                  ))}
            </tbody>
            {/* <tfoot><h3 className="text-foreground/5">more</h3></tfoot>    */}
          </table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="py-1">
        <SimpleForcast />
      </CardFooter>
    </Card>
  );
};

export default SysInfo;
