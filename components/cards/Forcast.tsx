import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ForcastProps {
    className?: string;
}

const Forcast: React.FC<ForcastProps> = ({className}) => {
  return ( 
    <Card className={className}>
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
  );
}

 
export default Forcast;