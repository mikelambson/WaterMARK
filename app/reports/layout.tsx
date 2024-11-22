// /app/reports/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { reportLinks } from "@/features/reports/navigation/reportsLinks";
import { Suspense } from "react";


const ReportsLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <div className={"h-full m-0 pt-[4rem]"}>
            <Sidebar sideLinks={reportLinks} />
            <Suspense fallback={<LoadingAnimation />}>
                <main className={"pt-0 sm:pl-16"}>
                    {children}
                </main>
            </Suspense>
        </div>
     );
}
 
export default ReportsLayout;