import { Suspense } from "react";
import ComponentLoader from '@/features/loader/comploader.module';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DistrictInfo = () => {
    return ( 
        <Suspense fallback={<ComponentLoader />}>
            <Tabs defaultValue="west" className="w-full h-full">
                <TabsList className="w-full">
                    <TabsTrigger value="truckee">Truckee</TabsTrigger>
                    <TabsTrigger value="west">West</TabsTrigger>
                    <TabsTrigger value="central">Central</TabsTrigger>
                    <TabsTrigger value="east">East</TabsTrigger>
                </TabsList>
                <TabsContent value="truckee" className="px-2 grid grid-rows-3 h-full gap-3">
                        <div className="text-2xl font-bold">Truckee</div>
                        <div className="text-lg">Meter data</div>
                        <div className="text-lg">more info</div>
                </TabsContent>
                <TabsContent value="west" className="px-2 grid grid-rows-3 h-full gap-3">
                    <div className="text-2xl font-bold">West</div>
                        <div className="text-lg">Meter data</div>
                        <div className="text-lg">more info</div>
                </TabsContent>
                <TabsContent value="central" className="px-2 grid grid-rows-3 h-full gap-3">
                    <div className="text-2xl font-bold">Central</div>
                        <div className="text-lg">Meter data</div>
                        <div className="text-lg">more info</div>
                </TabsContent>
                <TabsContent value="east" className="px-2 grid grid-rows-3 h-full gap-3">
                    <div className="text-2xl font-bold">East</div>
                        <div className="text-lg">Meter data</div>
                        <div className="text-lg">more info</div>
                </TabsContent>
            </Tabs>
        </Suspense>
     );
}
 
export default DistrictInfo;