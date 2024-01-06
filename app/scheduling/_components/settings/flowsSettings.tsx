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
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const FlowsSettings: React.FC = () => {
    // Access the flows array & updateFlow function from the store
    const flows = useFlowsStore((state) => state.flows);
    const updateFlow = useFlowsStore((state) => state.updateFlow);
    const { toast } = useToast();

    return ( 
        <div>
            <Table>
                <TableCaption><h2 className=" cursor-default">Update Database</h2></TableCaption>
                <TableHeader className="cursor-default">
                    <TableRow>
                    <TableHead className="min-w-[200px]">Name</TableHead>
                    <TableHead className="w-[150px]">Source</TableHead>
                    <TableHead className="w-[75px]">Manual Only</TableHead>
                    <TableHead className="w-[175px]">Measurement Type</TableHead>
                    <TableHead className="w-[100px]">Update</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="font-medium">
                                <span className="pl-1 font-semibold">{row.name}</span>
                                <Input id={row.id + "inputname"} defaultValue={row.name} />
                            </TableCell>
                            <TableCell>
                                <span className="pl-1 font-semibold">{row.remoteSource}</span>
                                <Input id={row.id + "inputsource"} defaultValue={row.remoteSource} />
                            </TableCell>
                            <TableCell>
                                <Switch 
                                    className="my-auto"
                                    checked={row.remoteSource === "Manual" ? true : false}
                                    onCheckedChange={(checked) => {
                                        const inputElement = document.getElementById(row.id + "inputsource") as HTMLInputElement | null;
                                        const updatedRemoteSource = checked ? "Manual" : inputElement?.value || "";
                                        
                                        updateFlow(row.id, { remoteSource: updatedRemoteSource });                                     
                                        toast({
                                            title: row.name,
                                            description: `Set Source: ${updatedRemoteSource}`,
                                        });
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <span className="pl-1 font-semibold">{row.type}</span>
                                <Select 
                                    onValueChange={(selectedValue) => {
                                        
                                        updateFlow(row.id, { type: selectedValue });                                     
                                        toast({
                                            title: "Measurement Type",
                                            description: `Set Type to: ${selectedValue}}`,
                                        });
                                    }}
                                    defaultValue={row.type}
                                >
                                    <SelectTrigger className="min-w-[100px] border-foreground/50">
                                        <SelectValue placeholder={row.type} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CFS">CFS</SelectItem>
                                        <SelectItem value="AF">AF</SelectItem>
                                        <SelectItem value="Ft">Ft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            
                            <TableCell>
                                <Button 
                                     className="active:bg-stone-500"
                                     onClick={() => {
                                        const inputElement = document.getElementById(row.id + "inputname") as HTMLInputElement | null;
                                        const updatedName = inputElement?.value;
                            
                                        // Check if inputValue is a number and not null
                                        updateFlow(row.id, { name: updatedName  });
                                        toast({
                                                title: "Name Changed",
                                                description: `${row.name}`,
                                        })
                                        
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
 
export default FlowsSettings;