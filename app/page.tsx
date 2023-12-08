// ./app/page.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Ordercount />

        <div className={"flex flex-grow  gap-6 flex-wrap"}>       
          
          <SysInfo className={" w-full max-w-5/6"} />
          
          
          <Card className={"w-[350px]"}>
            <CardHeader>
              <CardTitle>Create Workorder</CardTitle>
              <CardDescription>Create mainenance request order.</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="maintReq" name="maintenenceRequest">
                <div className={"grid w-full items-center gap-4"}>
                  <div className={"flex flex-col space-y-1.5"}>
                    <Label>Request</Label>
                    <Input
                      id="reqDetail"
                      name="request"
                      type="text"
                      autoComplete="off"
                      placeholder="Input request detail"
                    />
                  </div>
                  <div className={"flex flex-col space-y-1.5"}>
                    <Label >District</Label>
                    <Select name="District">
                      <SelectTrigger id="district">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="truckee">Truckee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className={"flex justify-between"}>
              <Button variant="outline" id="maintReqCancel">
                Cancel
              </Button>
              <Button id="maintReqSend">Send</Button>
            </CardFooter>
          </Card>

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
      </div>
    </div>
  );
}
