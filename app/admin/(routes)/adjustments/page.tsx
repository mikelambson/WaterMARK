"use client"
// Create and check water adjustments \app\admin\(routes)\adjustments\page.tsx
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



  const Adjustments = () => {
    
    const { toast } = useToast();
    const currentDateTime  = "Friday, February 10, 2023 at 5:57 PM";
  
    return (
      <div className="p-1">
        <h1 className={"text-3xl font-semibold mb-5"}>Water Order Adjustments</h1>
        <p>
          This page will provide office staff a central location to begin the water
          adjustments process as well as to look up the status of any particular
          adjustment.
        </p>
        <Tabs defaultValue="new" className="w-full pr-4">
          <TabsList className="w-full">
            <TabsTrigger value="new">New Adjustment</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <h1 className="text-xl font-semibold">Create a new adjustment here.</h1>

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