import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import Forecasting from "../function/Forecasting";

interface ForcastProps {
  className?: string;
}

const LakeForcast: React.FC<ForcastProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        {/* <CardTitle>Lake Forcast</CardTitle> */}
        {/* <CardDescription>Forcast description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Forecasting />
        {/* <Skeleton className="w-full h-96" /> */}
      </CardContent>
      {/* <CardFooter>
        <p>Algorithmic data</p>
      </CardFooter> */}
    </Card>
  );
};

export default LakeForcast;
