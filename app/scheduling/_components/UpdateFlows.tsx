"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import {  
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, } from "@/components/ui/table";
import useFlowsStore from '@/store/opsFlowsStore';
import { formatNumber } from "@/lib/basicFunctions"; 

const UpdateFlowsWM = () => {
    // Access the flows array from the store
    const flows = useFlowsStore((state) => state.flows);
    // Access the updateFlow function from the store
//   const updateFlow = useFlowsStore((state) => state.updateFlow);

//   const handleUpdate = (flowId: string, newValue: number) => {
//     // Call the updateFlow function with the relevant parameters
//     updateFlow(flowId, newValue);
//   };


    return ( 
        <div>
            <Table>
                <TableCaption><Button variant={"secondary"}>Update All</Button></TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="">Source</TableHead>
                    <TableHead className="">Remote Data</TableHead>
                    <TableHead className="">Override</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Manual Entry</TableHead>
                    <TableHead className="min-w-[100px]">Manual Input</TableHead>
                    <TableHead className="w-[100px]">Update</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flows.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.remoteSource}</TableCell>
                        <TableCell>{formatNumber(row.remoteValue)}&ensp;{formatNumber(row.remoteValue) !== "" ? row.type : "--"}</TableCell>
                        <TableCell>
                            <Switch 
                                checked={row.override}
                            />
                        </TableCell>
                        <TableCell>{row.manualTimestamp !== null ? row.manualTimestamp : "--"}</TableCell>
                        <TableCell className="text-right">{formatNumber(row.manualValue)}&ensp;{formatNumber(row.manualValue) !== "" ? row.type : "--"}</TableCell>
                        <TableCell><Input /></TableCell>
                        <TableCell><Button>Update</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
     );
}
 
export default UpdateFlowsWM;