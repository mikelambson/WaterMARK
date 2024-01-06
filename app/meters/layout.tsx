// /app/meters/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { metersLinks } from "./_components/navigation/metersLinks";


const SchedulingLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={metersLinks} />
        <main className={"pt-0 pl-16"}>
            {children}
        </main>
        </div>
        </>
     );
}
 
export default SchedulingLayout;