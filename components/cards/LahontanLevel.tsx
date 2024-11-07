import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import LahontanLevelGraph from "@/components/function/LahontanLevelGraph";

interface ForcastProps {
  className?: string;
}

const data = {
  current: 0,
  forecast: 0,
  last: 0,
};

const LahontanLakeLevel = ({ className }: ForcastProps) => {
  return (
    <Card className={className}>
      <CardContent>
        {data ? <LahontanLevelGraph className={"mt-4"} />
          : <Skeleton className="w-full h-96 mt-6" />}
      </CardContent>
    </Card>
  );
};

export default LahontanLakeLevel;
