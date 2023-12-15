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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const UpdateFlowsWM = () => {
    // Access the flows array & updateFlow function from the store
    const flows = useFlowsStore((state) => state.flows);
    const updateFlow = useFlowsStore((state) => state.updateFlow);
    // Toast functions
    const { toast } = useToast();

    return ( 
        <div>
            <Table>
                <TableCaption><Button variant={"destructive"} className="active:bg-destructive/30">Update Database</Button></TableCaption>
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
                                    onCheckedChange={() => {
                                        updateFlow(row.id, { override: !row.override });                                     
                                        toast({
                                            title: row.name,
                                            description: `Set Override: ${!row.override}`,
                                        });
                                    }}
                                    disabled={row.remoteSource === "Manual"}
                                />
                            </TableCell>
                            <TableCell>{row.manualTimestamp !== null ? row.manualTimestamp : "--"}</TableCell>
                            <TableCell className="text-right">{formatNumber(row.manualValue)}&ensp;{formatNumber(row.manualValue) !== "" ? row.type : "--"}</TableCell>
                            <TableCell>
                                <Input id={row.id + "manualinput"} placeholder="New Value" 
                                className="border-foreground/50" />
                            </TableCell>
                            <TableCell>
                                <Button 
                                     className="active:bg-stone-500"
                                     onClick={() => {
                                        const inputValue = document.getElementById(row.id + "manualinput") as HTMLInputElement | null;
                            
                                        // Check if inputValue is a number and not null
                                        if (inputValue && !isNaN(Number(inputValue.value))) {
                                            const newValue = Number(inputValue.value);
                                            updateFlow(row.id, { manualValue: newValue });

                                            toast({
                                                title: "Manual Update",
                                                description: `${row.name}`,
                                            })
                                        } else {
                                            // Handle the case when the input is not a valid number
                                            toast({
                                                variant: "destructive",
                                                title: "Uh oh! That's not a valid number.",
                                                description: "Please enter a valid number into the input box.",
                                                action: <ToastAction altText="Try again">Try again</ToastAction>,
                                            })
                                        }
                                    }}
                                >
                                    Save
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
     );
}
 
export default UpdateFlowsWM;