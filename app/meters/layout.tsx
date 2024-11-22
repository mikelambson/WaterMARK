// /app/meters/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { metersLinks } from "@/features/meters/navigation/metersLinks";
import { Suspense } from "react";


const MetersLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={metersLinks} />
        <Suspense fallback={<LoadingAnimation />}>
            <main className={"pt-0 sm:pl-14"}>
                {children}
            </main>
        </Suspense>
        </div>
        </>
     );
}
 
export default MetersLayout;