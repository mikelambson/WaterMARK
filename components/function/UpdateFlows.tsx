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

type UpdateFlowsProps = {
    watermaster?: boolean;
  };

const UpdateFlows: React.FC<UpdateFlowsProps> = ({watermaster = false}) => {
    // Access the flows array & updateFlow function from the store
    const flows = useFlowsStore((state) => state.flows);
    // const sortedFlows = [...flows].sort((a, b) => Number(a.id) - Number(b.id));
    const updateFlow = useFlowsStore((state) => state.updateFlow);
    // Toast functions
    const { toast } = useToast();

    return ( 
        <div>
            <Table>
                <TableCaption><h2 className=" cursor-default">Update Database</h2></TableCaption>
                <TableHeader className="cursor-default">
                    <TableRow>
                    <TableHead>Name</TableHead>
                    {watermaster && (<TableHead className="">Source</TableHead>)}
                    <TableHead className="">Remote Data</TableHead>
                    {watermaster && <TableHead className="w-[100px]">Override</TableHead>}
                    <TableHead className="text-right">Timestamp</TableHead>
                    <TableHead className="w-[150px]">Manual Input</TableHead>
                    <TableHead className="w-[100px]">Update</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            {watermaster && (
                                <TableCell>{row.remoteSource}</TableCell>
                            )}
                            <TableCell>{formatNumber(row.remoteValue)}&ensp;{formatNumber(row.remoteValue) !== "" ? row.type : "--"}</TableCell>
                            {watermaster && (
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
                            )}
                            <TableCell className="text-right">
                                {row.manualTimestamp !== null ? row.manualTimestamp : "--"}
                            </TableCell>
                            <TableCell className="inline-flex">
                                <Input id={row.id + "manualinput"} placeholder={formatNumber(row.manualValue) !== "" ? formatNumber(row.manualValue) : "--"}
                                className="border-foreground/50 text-right min-w-[80px]" />
                                &ensp;
                                <span className="my-auto">{row.type}</span>
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
 
export default UpdateFlows;