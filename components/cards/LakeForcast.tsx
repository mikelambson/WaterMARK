import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Forecasting from "@/components/function/Forecasting";

interface ForcastProps {
  className?: string;
}

const LakeForcast: React.FC<ForcastProps> = ({ className }) => {
  return (
    <Card className={className}>
      
      <CardContent>
        <Forecasting 
        className={"mt-4"} />
        {/* <Skeleton className="w-full h-96" /> */}
      </CardContent>
      {/* <CardFooter>
        <p>Algorithmic data</p>
      </CardFooter> */}
    </Card>
  );
};

export default LakeForcast;
