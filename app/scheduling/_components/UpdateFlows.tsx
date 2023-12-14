import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, } from "@/components/ui/table";

const UpdateFlowsWM = () => {
    return ( 
        <div>
            Update Flows
            <Table>
                <TableCaption><Button variant={"secondary"}>Update All</Button></TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[150px]">Type</TableHead>
                    <TableHead className="w-[100px]">Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[200px]">Manual Entry</TableHead>
                    <TableHead className="w-[100px]">Update</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">Lahonton Reservior Level</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Auto</TableCell>
                    <TableCell className="text-right">207,700 AF</TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Button>Update</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
     );
}
 
export default UpdateFlowsWM;