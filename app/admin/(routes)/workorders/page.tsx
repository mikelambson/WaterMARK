import { Skeleton } from "@/components/ui/skeleton";

const WorkOrders = () => {
    return ( 
        <div className="p-1">
            <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Workorders</h1>
            <div className="w-11/12 mx-auto mt-3 flex flex-col gap-3">
                <Skeleton className="w-full h-[19dvh]" />
                <Skeleton className="w-full h-[19dvh]" />
                <Skeleton className="w-full h-[19dvh]" />
                <Skeleton className="w-full h-[19dvh]" />
            </div>
        </div>
     );
}
 
export default WorkOrders;