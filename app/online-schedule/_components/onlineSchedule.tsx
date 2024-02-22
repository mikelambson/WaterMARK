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
    scheduleData: Schedule;
}


const OnlineSchedule: React.FC<TableProps> = ({ scheduleData }) => {
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Laterals</TableHead>
                    <TableHead>Headsheet</TableHead>
                    <TableHead>Head</TableHead>
                    {/* Add more table headers as needed */}
                </TableRow>
            </TableHeader>
            

            <TableBody>
                {Array.isArray(scheduleData) ? (
                    scheduleData.map((data: Schedule, index: number) => { 
                        const parsedDate = parseISO(data.scheduledDate);
                        const formattedDate = format(parsedDate, 'MMM do BBBBB');
                        return (
                        <TableRow key={index}>
                            <TableCell>{formattedDate}</TableCell>
                            <TableCell>{data.order.orderNumber}</TableCell>
                            <TableCell>{data.order.laterals}</TableCell>
                            <TableCell>{data.scheduledLine.name}</TableCell>
                            <TableCell>{data.scheduledHead}</TableCell>
                            {/* Render more table cells based on your schedule data structure */}
                        </TableRow>
                    )})
                ) : (
                    []
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Footer Content</TableCell>
                </TableRow>
            </TableFooter>
            <TableCaption>Table Caption</TableCaption>
        </Table>
    );
};

export default OnlineSchedule;