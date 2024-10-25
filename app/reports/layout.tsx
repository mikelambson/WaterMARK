// /app/reports/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { reportLinks } from "@/features/reports/navigation/reportsLinks";


const ReportsLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={reportLinks} />
        <main className={"pt-0 pl-16"}>
            {children}
        </main>
        </div>
        </>
     );
}
 
export default ReportsLayout;