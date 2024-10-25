// /app/meters/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { Suspense } from "react";
// import { metersLinks } from "./_components/navigation/metersLinks";


const AboutLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
            {/* <Sidebar sideLinks={metersLinks} /> */}
            <Suspense fallback={<LoadingAnimation />}>
                <main className={"p-1"}>
                    {children}
                </main>
            </Suspense>
        </div>
        </>
     );
}
 
export default AboutLayout;