"use client"
// Create and check water adjustments \app\admin\(routes)\adjustments\page.tsx
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateTime } from "@/components/function/GetDateTime"
import { Skeleton } from "@/components/ui/skeleton";




  const Adjustments = () => {
    
    const { toast } = useToast();
    const currentDateTime  = DateTime();
  
    return (
      <div className="p-2">
        <h1 className={"p-2 text-2xl font-semibold text-yellow-800 text-center "}>Water Order Adjustments</h1>
        <p className="mb-4">
          This page will provide office staff a central location to begin the water
          adjustments process as well as to look up the status of any particular
          adjustment.
        </p>
        <Tabs defaultValue="new" className="w-full pr-4">
          <TabsList className="w-full">
            <TabsTrigger value="new">New Adjustment</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>
          <TabsContent className="px-2" value="new">
            <h1 className="text-xl font-semibold">Create a new adjustment here.</h1>

            <div className="mt-4 px-2 flex flex-col gap-2">
            <div className="ml-24 flex items-center space-x-4 mb-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className=" space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className=" h-24 w-full mb-3" />
            </div>
            

            <Button variant={"ghost"}
                onClick={() => {
                    toast({
                        title: "New Adjustment Started for #{order}",
                        description: currentDateTime,
                    })
                }}
            >Submit</Button>
            
          </TabsContent>
          <TabsContent value="status">
            Change your adjustment status here.
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  export default Adjustments;