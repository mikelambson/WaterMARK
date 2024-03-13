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



const UpdateMeasurements: React.FC = () => {


    return (
        <DialogContent className="max-w-[65%] h-[85%] dark:border-gray-600">
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
                    <Label htmlFor="estCFS">Estimated CFS:</Label>
                    <Input id="estCFS" defaultValue={"0.00"} />
                    <div className="mt-4">
                    Info:
                    </div>
                </TabsContent>
                <TabsContent value="poly">
                    <p className="text-center text-lg">Polystick</p>
                    
                    <div className="grid grid-cols-2 gap-2 w-80 mx-auto pt-3">
                    <Label htmlFor="polyread">Polystick Reading:</Label>
                    <Label htmlFor="polywidth">Width:</Label>
                    <Input id="polyread" defaultValue={"0.00"} />
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
                    <div className="mt-4">
                    Info:
                    </div>
                </TabsContent>
                <TabsContent value="overTheBoards">
                    <p className="text-center text-lg">Over The Boards</p>
                    <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                        <Label htmlFor="otbU">Upstream:</Label>
                        <Input id="otbU" defaultValue={"2.00"} />
                        <Label htmlFor="otbB">Boards:</Label>
                        <Input id="otbB" defaultValue={"3.00"} />
                        <Label htmlFor="otbL">Length:</Label>
                        <Input id="otbL" defaultValue={"4.00"} />
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
                    <div>
                    Q=3.33LH^1.5 <br />
                    Q=3.33*L*(B-U)^1.5 <br />
                    U= Upstream <br />
                    B= Boards<br />
                    L= Length<br />
                    </div>
                </TabsContent>
                <TabsContent value="submerged">
                    <p className="text-center text-lg">Submerged</p>
                    <Label htmlFor="subCFS">Submerged CFS:</Label>
                    <Input id="subCFS" defaultValue={"0.00"} />
                </TabsContent>
                <TabsContent value="jet">
                    <p className="text-center text-lg">Jet</p>
                    <Label htmlFor="jetCFS">Jet CFS:</Label>
                    <Input id="jetCFS" defaultValue={"0.00"} />
                </TabsContent>
            </Tabs>
        </DialogContent>
    );
};

export default UpdateMeasurements;