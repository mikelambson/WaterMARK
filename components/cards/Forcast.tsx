import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ForcastProps {
    className?: string;
}

const forecastData = [
  { day: 'Monday', condition: '☀️', temperature: '25°F' },
  { day: 'Tuesday', condition: '🌦️', temperature: '20°F' },
  { day: 'Wednesday', condition: '⛈️', temperature: '18°F' },
  { day: 'Thursday', condition: '🌧️', temperature: '22°F' },
  { day: 'Friday', condition: '❄️', temperature: '15°F' },
];

export const Forcast: React.FC<ForcastProps> = ({className}) => {

  return ( 
    <Card className={className}>
      <CardHeader> 
        <CardTitle>Forcast</CardTitle>
        <CardDescription>Forcast description</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h2>5-Day Weather Forecast</h2>
          <ul>
            {forecastData.map((day, index) => (
              <li key={index}>
                {day.day}: {day.condition} {day.temperature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <p>Algorithmic data</p>
      </CardFooter>
    </Card>
  );
}

export const SimpleForcast = () => {
  return ( 
    <div className="w-full text-center mb-2">
    
    <ul className="flex flex-row w-full justify-center text-xs md:text-base gap-2 md:gap-3">
        <h3 className="-mr-1 md:-mr-3">Today:</h3>
      {forecastData.map((day, index) => (
        <li key={index}>
          {day.condition}{day.temperature}
        </li>
      ))}
    </ul>
  </div>
   );
}
 
 
export default { Forcast, SimpleForcast };