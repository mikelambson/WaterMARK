import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { KeyboardEventHandler } from "react"; // Import the KeyboardEventHandler type


const UpdateMeasurements: React.FC = () => {

    const handleNumberEntry: KeyboardEventHandler<HTMLInputElement> = (event) => { // Update the type of handleNumberEntry
        const key = event.key;
        // Allow digits, backspace, delete, tab, and a single decimal point
        if (
            key !== "." && // Decimal point
            key !== "Backspace" &&
            key !== "Delete" &&
            key !== "Tab" &&
            (key < "0" || key > "9") // Digits
        ) {
            event.preventDefault();
        }
    };

    return (
        <DialogContent className="max-w-[95%] h-[95%] dark:border-gray-600">
            <Tabs defaultValue="est" className="w-full h-full">
                <DialogHeader>
                    <DialogTitle className="text-center text-card-alternative text-xl">
                        Update Measurements
                    </DialogTitle>
                    <DialogDescription className="flex justify-center">
                        Select the type of measurement you would like to update.
                    </DialogDescription>
                    <div className="flex justify-center">
                        <TabsList>
                            <TabsTrigger value="est">Est</TabsTrigger>
                            <TabsTrigger value="poly">Polystick</TabsTrigger>
                            <TabsTrigger value="overTheBoards">OTB</TabsTrigger>
                            <TabsTrigger value="submerged">Submerged</TabsTrigger>
                            <TabsTrigger value="jet">Jet Flow</TabsTrigger>
                            
                        </TabsList>
                    </div>
                </DialogHeader>
                <TabsContent value="est">
                    <p className="text-center text-lg">Estimation</p>
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="estCFS">Estimated CFS:</Label>
                        <Input id="estCFS" defaultValue={"0.00"} />
                    </div>
                    <p className="mt-2 border-t-2 pt-2 text-center text-lg">Timed Flow</p>
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="estD">Distance ft:</Label>
                        <Input id="estD" defaultValue={"0.00"} />
                        <Label htmlFor="estS">Time in seconds:</Label>
                        <Input id="estS" defaultValue={"0.00"} />
                        <Label htmlFor="estH">Water Height</Label>
                        <Input id="estH" defaultValue={"0.00"} />
                        <Label htmlFor="estW">Average Width</Label>
                        <Input id="estW" defaultValue={"0.00"} />
                    </div>
                    <div className="mt-2 text-center text-lg">
                        <Button className="mt-2" onClick={() => {
                            const estCFS = document.getElementById("estCFS") as HTMLInputElement;
                            const estD = document.getElementById("estD") as HTMLInputElement;
                            const estS = document.getElementById("estS") as HTMLInputElement;
                            const estH = document.getElementById("estH") as HTMLInputElement;
                            const estW = document.getElementById("estW") as HTMLInputElement;
                            const estcalc = document.getElementById("estcalc") as HTMLParagraphElement;
                            const result = Math.round((parseFloat(estD.value) * parseFloat(estH.value) * parseFloat(estW.value) / parseFloat(estS.value)) * 100 ) / 100;
                            estcalc.innerHTML = `The flow is: ${result} CFS.`;
                        }}>Submit</Button>
                        <p id="estcalc" className="text-lg" />
                    </div>
                    <div className=" border-t-2 mt-4 text-sm">
                    Instructions: <br />
                    </div>
                </TabsContent>
                <TabsContent value="poly">
                    <p className="text-center text-lg">Polystick</p>
                    
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="polyread">Polystick Reading:</Label>
                        <Input id="polyread" defaultValue={"0.00"} />
                        <Label htmlFor="polywidth">Width:</Label>
                        <Input id="polywidth" defaultValue={"0.00"} />
                    </div>

                    <div className="mt-2 text-center text-lg">
                        <Button className="mt-2" onClick={() => {
                            const polyread = document.getElementById("polyread") as HTMLInputElement;
                            const polywidth = document.getElementById("polywidth") as HTMLInputElement;
                            const polycalc = document.getElementById("polycalc") as HTMLParagraphElement;
                            const result = Math.round((parseFloat(polyread.value) * parseFloat(polywidth.value)) * 100 ) / 100;
                            polycalc.innerHTML = `The CFS is: ${result}`;
                        }}>Submit</Button>
                        <p id="polycalc" className="text-lg" />
                    </div>
                    <div className=" border-t-2 mt-4 text-sm">
                    Instructions: <br />
                    </div>
                </TabsContent>
                <TabsContent value="overTheBoards">
                    <p className="text-center text-lg">Over The Boards</p>
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="otbU">Upstream:</Label>
                        <Input id="otbU" defaultValue={"2.00"} onKeyDown={handleNumberEntry} />
                        <Label htmlFor="otbB">Boards:</Label>
                        <Input id="otbB" defaultValue={"3.00"} pattern="^\d+(\.\d{1,2})?$" />
                        <Label htmlFor="otbL">Length:</Label>
                        <Input id="otbL" defaultValue={"4.00"} pattern="^\d+(\.\d{1,2})?$" />
                    </div>
                    <div className="mt-2 text-center text-lg">
                        <Button className="mt-2" onClick={() => {
                            const otbU = document.getElementById("otbU") as HTMLInputElement;
                            const otbB = document.getElementById("otbB") as HTMLInputElement;
                            const otbL = document.getElementById("otbL") as HTMLInputElement;
                            const otbcalc = document.getElementById("otbcalc") as HTMLParagraphElement;
                            const result = Math.round((3.33 * parseFloat(otbL.value) * Math.pow((parseFloat(otbB.value) - parseFloat(otbU.value)), 1.5)) * 100 ) / 100;
                            otbcalc.innerHTML = `The flow over the boards is: ${result} CFS.`;
                        }}>Submit</Button>
                        <p id="otbcalc" className="text-lg" />
                    </div>
                    
                    <div className=" border-t-2 mt-4 text-sm">
                    Instructions: <br />
                    </div>
                </TabsContent>
                <TabsContent value="submerged">
                    <p className="text-center text-lg">Submerged</p>
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="subU">Upstream:</Label>
                        <Input id="subU" defaultValue={"2.00"} />
                        <Label htmlFor="subD">Downstream:</Label>
                        <Input id="subD" defaultValue={"3.00"} />
                        <Label htmlFor="subG">Gate:</Label>
                        <Input id="subG" defaultValue={"4.00"} />
                        <Label htmlFor="subS">Sill:</Label>
                        <Input id="subS" defaultValue={"5.00"} />
                        <Label htmlFor="subL">Length:</Label>
                        <Input id="subL" defaultValue={"6.00"} />
                    </div>
                    <div className="mt-2 text-center text-lg">
                        <Button className="mt-2" onClick={() => {
                            const subU = document.getElementById("subU") as HTMLInputElement;
                            const subD = document.getElementById("subD") as HTMLInputElement;
                            const subG = document.getElementById("subG") as HTMLInputElement;
                            const subS = document.getElementById("subS") as HTMLInputElement;
                            const subL = document.getElementById("subL") as HTMLInputElement;
                            const subcalc = document.getElementById("subcalc") as HTMLParagraphElement;
                            const result = Math.round((0.67 * (parseFloat(subS.value) - parseFloat(subG.value)) * parseFloat(subL.value) * Math.sqrt(64.4 * (parseFloat(subD.value) - parseFloat(subU.value))) ) * 100 ) / 100;
                            subcalc.innerHTML = `The flow is: ${result} CFS.`;
                        }}>Submit</Button>
                        <p id="subcalc" className="text-lg" />
                    </div>
                    <div className=" border-t-2 mt-4 text-sm">
                    Instructions: <br />
                    </div>
                </TabsContent>
                <TabsContent value="jet">
                    <p className="text-center text-lg">Jet</p>
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="subU">Upstream:</Label>
                        <Input id="subU" defaultValue={"2.00"} />
                        <Label htmlFor="subD">Downstream:</Label>
                        <Input id="subD" defaultValue={"3.00"} />
                        <Label htmlFor="subG">Gate:</Label>
                        <Input id="subG" defaultValue={"4.00"} />
                        <Label htmlFor="subS">Sill:</Label>
                        <Input id="subS" defaultValue={"5.00"} />
                        <Label htmlFor="subL">Length:</Label>
                        <Input id="subL" defaultValue={"6.00"} />
                    </div>
                    <div className="mt-2 text-center text-lg">
                        <Button className="mt-2" onClick={() => {
                            const subU = document.getElementById("subU") as HTMLInputElement;
                            const subD = document.getElementById("subD") as HTMLInputElement;
                            const subG = document.getElementById("subG") as HTMLInputElement;
                            const subS = document.getElementById("subS") as HTMLInputElement;
                            const subL = document.getElementById("subL") as HTMLInputElement;
                            const subcalc = document.getElementById("subcalc") as HTMLParagraphElement;
                            const result = Math.round((0.6 * (parseFloat(subS.value) - parseFloat(subG.value)) * parseFloat(subL.value) * Math.sqrt(64.4 * (parseFloat(subD.value) - parseFloat(subU.value))) ) * 100 ) / 100;
                            subcalc.innerHTML = `The flow is: ${result} CFS.`;
                        }}>Submit</Button>
                        <p id="subcalc" className="text-lg" />
                    </div>

                    <div className=" border-t-2 mt-4 text-sm">
                    Instructions: <br />
                    </div>
                </TabsContent>
            </Tabs>
        </DialogContent>
    );
};

export default UpdateMeasurements;