import OnlineSchedule from "@/app/online-schedule/_components/onlineSchedule";
import { getScheduled } from "@/lib/basicFunctions";


export default async function Schedule() { // Make the function async
  const schedule = await getScheduled("EA"); // Add the type annotation and use the 'await' keyword to wait for the promise to resolve
  return (
    <div className="p-2">
      <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>East Online Schedule</h1>
      <OnlineSchedule scheduleData={schedule} />
    </div>
  );
}
