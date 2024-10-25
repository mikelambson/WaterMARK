// /app/reports/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { testingLinks } from "@/features/testing/navigation/testingLinks";
import { Suspense } from "react";


const TestingLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={testingLinks} />
        <Suspense fallback={<LoadingAnimation />}>
            <main className={"pt-0 pl-16"}>
                {children}
            </main>
        </Suspense>
        </div>
        </>
     );
}
 
export default TestingLayout;