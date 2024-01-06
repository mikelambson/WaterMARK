// /app/admin/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { adminLinks } from "./_components/navigation/adminLinks";

const SchedulingLayout = ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <div className={"h-full m-0 pt-[4rem]"}>
            <Sidebar sideLinks={adminLinks} />
            <main className={"pt-0 pl-16"}>
                {children}
            </main>
        </div>
     );
}
 
export default SchedulingLayout;