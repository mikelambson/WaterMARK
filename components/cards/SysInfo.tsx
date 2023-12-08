// components/home/SysInfo.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

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
            <CardDescription className="text-center">Lake Level & Main System Flows</CardDescription>
        </CardHeader>
        <CardContent>
            <table className="w-full max-w-5xl mx-auto border-collapse border">
            <thead className="w-full">
            <tr className="bg-background text-card-alternative w-full h-10 text-lg">
                <th />
                <th className=" text-left">Features</th>
                <th className="text-right">Amount</th>  
                <th /> 
            </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                <tr key={index} className="border-b font-semibold">
                    <td className="w-8"></td>
                    <td className="py-2">{row.name}</td>
                    <td className="text-right">{formatNumber(row.data)} {row.type}</td>
                    <td className="w-8"></td>
                    
                </tr>
                ))}
            </tbody>
        </table>
        </CardContent>
        <CardFooter>
            <h2 className="text-center">N-Day Forcast: Basic Forcast - Emoji Style</h2>
        </CardFooter>
    </Card>
    
    );
};
  
  export default SysInfo;
  