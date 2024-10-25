import { format, parseISO } from 'date-fns'
import { Schedule } from "@/typings";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  } from '@/components/ui/table';



interface TableProps {
    scheduleData: Schedule[];
    district?: string;
}

const getDistrictName = (districtCode: string): string => {
    switch (districtCode) {
        case "WE":
            return "West District";
        case "CE":
            return "Central District";
        case "EA":
            return "East District";
        case "TC":
            return "Truckee District";
        default:
            return "All Districts";
    }
  };


const OnlineSchedule: React.FC<TableProps> = ({ scheduleData, district }) => {
    const districtName = district ? getDistrictName(district) : "All Districts";
    const validData = Array.isArray(scheduleData) && scheduleData.length > 0;
    
    return (
        <Table className='border'>
            <TableHeader>
                <TableRow className='font-semibold text-xs sm:text-sm md:text-base bg-tab-background text-card-alternative'>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Laterals</TableHead>
                    <TableHead>Headsheet</TableHead>
                    <TableHead>Head</TableHead>
                    {/* Add more table headers as needed */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {validData ? (
                    scheduleData.map((data: Schedule, index: number) => { 
                        const parsedDate = parseISO(data.scheduledDate);
                        const formattedDate = format(parsedDate, 'MMM do BBBBB');
                        const isEvenRow = index % 2 === 1;
                        return (
                        <TableRow key={index} className={
                            data.order.status === 'running' 
                            ? isEvenRow
                            ? "bg-blue-900/30 dark:bg-cyan-950/50" 
                            :"bg-blue-700/20 dark:bg-cyan-950/70" 
                            : isEvenRow
                            ? "bg-foreground/5"
                            : ""
                            }
                        >
                            <TableCell className='font-semibold'>
                                {data.order.status === 'running' 
                                ? "Running" 
                                : formattedDate}
                            </TableCell>
                            <TableCell>{data.order.orderNumber}</TableCell>
                            <TableCell>{data.order.laterals}</TableCell>
                            <TableCell>{data.scheduledLine.name}</TableCell>
                            <TableCell>{data.scheduledHead}</TableCell>
                            {/* Add more table cells as needed */}
                        </TableRow>
                    )})
                ) : (
                     // Display a row with information when there is no data
                    <TableRow>
                        <TableCell colSpan={5} className='text-center font-semibold text-2xl py-[25svh]'>
                            No Scheduled Orders Found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter className='bg-tab-background text-muted-foreground'>
                <TableRow>
                    <TableCell colSpan={5}>{districtName} Total Count: {scheduleData.length} orders</TableCell>
                </TableRow>
            </TableFooter>
            <TableCaption>Table Caption</TableCaption>
        </Table>
    );
};

export default OnlineSchedule;