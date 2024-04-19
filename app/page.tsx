// ./app/page.tsx
import SysInfo from "@/components/cards/SysInfo";
import Ordercount from "@/components/cards/Ordercount";
import LakeForcast from "@/components/cards/LakeForcast";
import Demand from "./scheduling/_components/Demand";

export default function Home() {
  return (
    <div className={" pt-16"}>
      <div className={"p-4 text-center"}>
        <h2 className={" font-serif text-lg font-semibold text-yellow-800 dark:text-orange-300"}>
          Welcome to TCID WaterMARK
        </h2>
        <h1
          className={
            " font-serif text-sm md:text-2xl font-semibold text-yellow-800 dark:text-orange-300 break-normal"
          }
        >
          Water Measurment Administration & Record Keeping
        </h1>
      </div>
      <div className={"flex flex-row justify-center gap-4 flex-wrap px-[1%]"}>
        <div
          className={
            "flex flex-col gap-4 min-w-fit w-full md:w-3/4 md:max-w-screen-lg"
          }
        >
          <SysInfo className={" w-full"} />
          <LakeForcast className={"w-full mb-4"} />
        </div>
        <div className=" min-w-[10rem] flex flex-col flex-grow gap-4 w-full md:w-[20%] md:max-w-[24rem]">
          <Demand />
          <Ordercount className="w=full" />
        </div>
      </div>
    </div>
  );
}
