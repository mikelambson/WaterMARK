// /app/online-schedule/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { onlineLinks } from "@/features/online-schedule/navigation/onlineLinks";
import { Suspense } from "react";


const PublicScheduleLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={onlineLinks} />
        <Suspense fallback={<LoadingAnimation />}>
            <main className={"pt-0 pl-16"}>
                {children}
            </main>
        </Suspense>
        </div>
        </>
     );
}
 
export default PublicScheduleLayout;