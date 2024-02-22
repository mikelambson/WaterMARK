import { Schedule, Schedule as ScheduleData  } from "@/typings";
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
                    {/* Add more table headers as needed */}
                </TableRow>
            </TableHeader>
            

            <TableBody>
                {Array.isArray(scheduleData) ? (
                    scheduleData.map((data: ScheduleData, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{data.scheduledDate}</TableCell>
                            <TableCell>{data.order.orderNumber}</TableCell>
                            <TableCell>{data.order.laterals}</TableCell>
                            {/* Render more table cells based on your schedule data structure */}
                        </TableRow>
                    ))
                ) : (
                    []
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Footer Content</TableCell>
                </TableRow>
            </TableFooter>
            <TableCaption>Table Caption</TableCaption>
        </Table>
    );
};

export default OnlineSchedule;