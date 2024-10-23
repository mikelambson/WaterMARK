// ./app/page.tsx
import SysInfo from "@/components/cards/SysInfo";
import Ordercount from "@/components/cards/Ordercount";
import LakeForcast from "@/components/cards/LakeForcast";
import Demand from "./scheduling/_components/Demand";

export default function Home() {
    return (
        <div className={" pt-16"}>
            <div className={"p-4 text-center"}>
                <h1 className={"font-serif text-sm md:text-3xl font-semibold"}>
                    <span className="text-blue-600/90 dark:text-blue-400/75">
                        Water
                    </span>
                    <span className="text-orange-400/80 dark:text-orange-300/75">
                        MARK
                    </span>
                </h1>
                <h3 className={" font-serif text-sm font-semibold"}>
                    Water Measurment Administration & Record Keeping
                </h3>
            </div>
            <div className={"flex flex-row justify-center gap-4 flex-wrap px-[1%]"}>
                <div className={"flex flex-col gap-4 min-w-fit w-full md:w-3/4 md:max-w-screen-lg"}>
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
