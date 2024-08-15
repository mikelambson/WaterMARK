// /app/account/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { accountLinks } from "./_components/navigation/accountLinks";

const SchedulingLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <div className={"h-full m-0 pt-[4rem]"}>
            <Sidebar sideLinks={accountLinks}/>
            <main className={"pt-0 pl-14"}>
                {children}
            </main>
        </div>
     );
}
 
export default SchedulingLayout;