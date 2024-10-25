import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DemandProps {
    className?: string;
}

const Demand: React.FC<DemandProps> = ({className}) => {
  let carsonDemand = 30;
  let truckeeDemand = 5;

  return ( 
      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle className="text-card-alternative">Demand</CardTitle>
          <CardDescription>Current demand for water.</CardDescription>
        </CardHeader>
        <CardContent>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td>Carson</td>
              <td className="text-right">{carsonDemand}&nbsp;CFS</td>
            </tr>
            <tr className="border-b">
              <td>Truckee</td>
              <td className="text-right">{truckeeDemand}&nbsp;CFS</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <CardFooter>
        <table className="w-full">
          <tbody>
            <tr>
              <td>Total Demand</td>
              <td className="text-right">{carsonDemand + truckeeDemand}</td>
            </tr>
          </tbody>
        </table>
        
      </CardFooter>
    </Card>
  );
}
 
export default Demand;