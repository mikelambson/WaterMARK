// Scheduling Dashboard \app\(scheduling)\(routes)\scheduling\page.tsx
import Ordercount from "@/components/Ordercount";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const Scheduling = () => {

  return (
    <div className={"flex flex-col m-2"}>
      <div className={"flex-1"}>
        <h1 className={"text-3xl font-semibold mb-5"}>Scheduling Dashboard</h1>  
      </div>
      <div className={" grid grid-cols-[14rem_auto]"}>
        <div className="coll-start-1 row-start-1 flex flex-col gap-4">
          <div>
          <Card className={"w-full"}>
            <CardHeader>
              <CardTitle className="text-card-alternative">Demand</CardTitle>
              <CardDescription>Current demand for water.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Carson Demand</p>
              <p>Truckee Demand</p>
            </CardContent>
            <CardFooter>
              <p>Total CFS Demand</p>
            </CardFooter>
          </Card>
          </div>
          
          <div>
            <Ordercount className={"w-full"} />
          </div>
        </div>
        
        <div className="col-start-2 row-start-1 row-span-2 flex flex-col gap-4 px-4">
          <Card className={" w-full"}>
            <CardHeader>
              <CardTitle>Flows</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        
          <div>
            <Card className={" w-full"}>
                <CardHeader>
                  <CardTitle>Forcast</CardTitle>
                  <CardDescription>Forcast description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Content</p>
                  
                </CardContent>
                <CardFooter>
                  <p>Algorithmic data</p>
                </CardFooter>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
