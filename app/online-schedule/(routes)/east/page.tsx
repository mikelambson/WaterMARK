import OnlineSchedule from "@/features/online-schedule/onlineSchedule";
import { getScheduled } from "@/lib/basicFunctions";


export default async function Schedule() { // Make the function async
  const district = "EA";
  const schedule = await getScheduled(district); // Add the type annotation and use the 'await' keyword to wait for the promise to resolve
  return (
    <div className="p-2">
      <h1 className={"text-2xl font-semibold text-yellow-800 text-center "}>East Online Schedule</h1>
      <OnlineSchedule scheduleData={schedule} district={district} />
    </div>
  );
}
