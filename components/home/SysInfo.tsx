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

const formatNumberWithCommas = (number:Number) => {
    return number.toLocaleString();
};


const SysInfo: React.FC<SysInfoProps> = ({ className }) => {

     // Example data
    const data = [
    { name: "Lahonton Lake Level", data: 207700, type: "AF" },
    { name: "Lahonton Outflow", data: 30, type: "CFS" },

    // Add more rows with data...
    ];

return (
    <Card className={className}>
        <CardHeader>
            <CardTitle className="text-center">System Information</CardTitle>
            <CardDescription className="text-center">Lake Level & Main System Flows</CardDescription>
        </CardHeader>
        <CardContent>
            <table className="w-full border-collapse border">
            <thead className="w-full">
            <tr className="bg-slate-400 text-slate-900 w-full text-left indent-2">
                <th>Features</th>
                <th className="text-right">Rate</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                <tr key={index} className="border-b">
                    <td className="py-2 px-4 border-b">{row.name}</td>
                    <td className="text-right py-2 border-b">{formatNumberWithCommas(row.data)}</td>
                    <td className="py-2 px-4 border-b">{row.type}</td>
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
  