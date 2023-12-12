// components/home/SysInfo.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SysInfoProps {
    className?: string;
}

const formatNumber = (number:Number) => {
    const numberString = number.toString();
    // Use toFixed to ensure two digits of precision for all real numbers
    return parseFloat(numberString).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SysInfo: React.FC<SysInfoProps> = ({ className }) => {

     // Example data
    const data = [
    { name: "Lahonton Lake Storage Level", data: 207700, type: "AF" },
    { name: "Lahonton Inflow", data: 242, type: "CFS" },
    { name: "Lahonton Outflow", data: 8, type: "CFS" },
    { name: "Carson River Below Sagauspe", data: 12, type: "CFS" },

    // Add more rows with data...
    ];

return (
    <Card className={className}>
        <CardHeader>
            <CardTitle className="text-center">System Information</CardTitle>
            <CardDescription className="text-center">Reservior Level & System Flow Data</CardDescription>
        </CardHeader>
        <CardContent className="h-[64%]">
            <ScrollArea className="w-full rounded-md h-[100%] border">
                <table className="w-full max-w-5xl mx-auto rounded-md border-collapse border">
                    <thead className="w-full">
                    <tr className="bg-background text-card-alternative w-full h-10 text-xl font-extrabold">
                        <th />
                        <th className=" text-left">Feature</th>
                        <th className="text-right">Amount</th>  
                        <th /> 
                    </tr>
                    </thead>
                    <tbody className="w-full" >
                        {data.map((row, index) => (
                        <tr key={index} className="border-b font-mono font-semibold">
                            <td className="w-8" />
                            <td className="py-2">{row.name}</td>
                            <td className="text-right">{formatNumber(row.data)}&ensp;{row.type}</td>
                            <td className="w-8" /> 
                        </tr>
                        ))}
                    </tbody>   
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
  