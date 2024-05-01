// Scheduling Dashboard \app\(scheduling)\(routes)\scheduling\page.tsx
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Ordercount from "@/components/cards/Ordercount";
import SysInfo from "@/components/cards/SysInfo";
import Demand from "../_components/Demand";
import { Forcast } from "@/components/cards/Forcast";
import Forecasting from "@/components/function/Forecasting";
import UpdateFlows from "@/components/function/UpdateFlows";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { FaMinus as MinusIcon, FaPlus as PlusIcon } from "react-icons/fa"


const Scheduling = () => {

    const [headerText, setHeaderText] = useState("Scheduling Dashboard");

    const handleTabClick = (tabValue: string) => {
        switch (tabValue) {
        case "dashboard":
            setHeaderText("Scheduling Dashboard");
            break;
        case "updateflows":
            setHeaderText("Update Flows");
            break;
        case "forecasting":
            setHeaderText("Forecasting");
            break;
        case "taskstatus":
            setHeaderText("Task Status");
            break;
        case "watermasternotes":
            setHeaderText("Watermaster Notes");
            break;
        default:
            setHeaderText("Scheduling Dashboard");
        }
    };

    return (
        <div className={"flex flex-col m-2"}>
        <div className={"flex-1"}>
            <h1 className={"text-xl font-semibold text-yellow-800 md:text-center "}>{headerText}</h1> 
        </div>
        <Tabs defaultValue="dashboard" className="mt-2 w-full">
            <TabsList className="w-[81vw] md:w-full">
            <TabsTrigger value="dashboard" onClick={() => handleTabClick("dashboard")}>
                Dashboard
            </TabsTrigger>
            <TabsTrigger value="updateflows" onClick={() => handleTabClick("updateflows")}>
                Update Flows
            </TabsTrigger>
            <TabsTrigger value="forecasting" onClick={() => handleTabClick("forecasting")}>
                Forecasting
            </TabsTrigger>
            <TabsTrigger value="taskstatus" onClick={() => handleTabClick("taskstatus")}>
                Task Status
            </TabsTrigger>
            <TabsTrigger value="watermasternotes" onClick={() => handleTabClick("watermasternotes")}>
                Watermaster Notes
            </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
            <div className={"w-full pt-1 flex flex-col gap-3 md:grid md:grid-cols-[14rem_auto]"}>
                <div className="col-start-2 row-start-1 row-span-2 flex flex-col gap-3 md:min-w-[20rem]">
                <SysInfo />
                <Forcast />
                </div>
                <div className="coll-start-1 row-start-1 flex flex-col gap-3">
                <Demand />
                <Ordercount className={"w-full"} />
                </div>
                
            </div>
            </TabsContent>
            <TabsContent value="updateflows">
            <UpdateFlows watermaster />
            </TabsContent>
            <TabsContent 
                value="forecasting"
                className="overflow-y-auto w-full"
            >   
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant={"secondary"} className="mx-auto">Update Forecast</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Update Forecast</DrawerTitle>
                            <DrawerDescription>Set your forecast changes and updates here.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                // onClick={() => onClick(-10)}
                                // disabled={goal <= 200}
                            >
                                <MinusIcon className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                Current
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                Update
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                // onClick={() => onClick(10)}
                                // disabled={goal >= 400}
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                            </Button>
                            </div>
                            <div className="mt-3 h-[50svh]">
                            {/* <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                <Bar
                                    dataKey="goal"
                                    style={
                                    {
                                        fill: "hsl(var(--foreground))",
                                        opacity: 0.9,
                                    } as React.CSSProperties
                                    }
                                />
                                </BarChart>
                            </ResponsiveContainer> */}
                            </div>
                        </div>
                        <DrawerFooter className="sm:flex sm:flex-row sm:justify-end">
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
                <div className="h-full">
                <Forecasting 
                    className={"p-2"}
                />
                </div>
            </TabsContent>
            <TabsContent value="taskstatus">
            <p>Task Status</p>
            </TabsContent>
            <TabsContent value="watermasternotes">
            <p>Watermaster Notes</p>
            </TabsContent>
        </Tabs>
        </div>
    );
    };

export default Scheduling;
