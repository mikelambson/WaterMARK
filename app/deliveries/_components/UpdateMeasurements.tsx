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



const UpdateMeasurements: React.FC = () => {


    return (
        <DialogContent className="w-[60rem] h-[90%]">
            <Tabs defaultValue="est" className="w-full h-full">
                <DialogHeader>
                    <DialogTitle className="text-center text-card-alternative text-xl">
                        Update Measurements
                    </DialogTitle>
                    <DialogDescription className="flex justify-center">
                        <TabsList>
                            <TabsTrigger value="est">Est</TabsTrigger>
                            <TabsTrigger value="poly">Polystick</TabsTrigger>
                            <TabsTrigger value="overTheBoards">OTB</TabsTrigger>
                            <TabsTrigger value="submerged">Submerged</TabsTrigger>
                            <TabsTrigger value="jet">Jet Flow</TabsTrigger>
                            
                        </TabsList>
                    </DialogDescription>
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
                    <Label htmlFor="polyread">Polystick Reading:</Label>
                    <Input id="polyread" defaultValue={"0.00"} />

                    <Label htmlFor="polywidth">Width:</Label>
                    <Input id="polywidth" defaultValue={"0.00"} />
                    <div className="mt-4">
                    Info:
                    </div>
                </TabsContent>
                <TabsContent value="overTheBoards">
                    <p className="text-center text-lg">Over The Boards</p>
                    <Label htmlFor="otbCFS">OTB CFS:</Label>
                    <Input id="otbCFS" defaultValue={"0.00"} />
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