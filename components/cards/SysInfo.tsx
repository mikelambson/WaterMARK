// components/home/SysInfo.tsx
"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFlowsStore from '@/store/opsFlowsStore';
import { initializeFlowsStore } from "@/lib/getOpsFlows";
import { formatNumber } from "@/lib/basicFunctions"; 

initializeFlowsStore();

interface SysInfoProps {
    className?: string;
}


const SysInfo: React.FC<SysInfoProps> = ({ className }) => {
    const { flows } = useFlowsStore();

return (
    <Card className={className}>
        <CardHeader>
            <CardTitle className="text-center">System Information</CardTitle>
            <CardDescription className="text-center">Reservior Level & System Flow Data</CardDescription>
        </CardHeader>
        <CardContent className="h-[64%]">
            <ScrollArea className="w-full rounded-md h-[14rem] border">
                <table className="w-full max-w-5xl mx-auto rounded-md border-collapse border">
                    <thead className="w-full">
                    <tr className="bg-background text-card-alternative w-full h-10 text-xl font-extrabold">
                        <th></th>
                        <th className=" text-left">Feature</th>
                        <th className="text-right">Amount</th>  
                        <th></th> 
                    </tr>
                    </thead>
                    <tbody className="w-full" >
                        {flows.map((row, index) => (
                            <tr key={index} className="border-b font-mono font-semibold">
                                <td className="w-8" />
                                <td className="py-2">{row.name}</td>
                                <td className="text-right">
                                {formatNumber(
                                    (row.remoteValue !== null && row.remoteValue !== 0 && !row.override)
                                        ? row.remoteValue
                                        : (row.manualValue ?? 0)
                                )}&ensp;{row.type}
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
            <h2 className="w-full text-center">N-Day Forcast: Basic Forcast - Emoji Style</h2>
        </CardFooter>
    </Card>
    
    );
};
  
  export default SysInfo;
  