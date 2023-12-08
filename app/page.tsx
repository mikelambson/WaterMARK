// ./app/page.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SysInfo from "@/components/cards/SysInfo";
import Ordercount from "@/components/cards/Ordercount";
// import SlideDownNotification from "@/components/SlideDownNotification";

export default function Home() {
  return (
    <div className={" pt-16"}>
      <div className={"p-4"}>
        <h2 className={"text-lg font-semibold text-yellow-800 md:text-center"}>Welcome to TCID WaterMARK</h2>
        <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center break-normal"}>
          Water Measurment Administration & Record Keeping
        </h1>
      </div>

      <div className={"flex gap-6 px-7 flex-wrap"}>
        <div className={"flex flex-grow  gap-6 flex-wrap"}>       
          <SysInfo className={" w-full max-w-5/6"} />
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <Ordercount className="w=full" />
      </div>
    </div>
  );
}
