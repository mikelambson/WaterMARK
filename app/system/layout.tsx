// /app/system/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { systemLinks } from "@/features/system/navigation/systemLinks";
import { Suspense } from "react";


const SystemLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={systemLinks} />
        <Suspense fallback={<LoadingAnimation />}>
            <main className={"pt-0 pl-14 bg-stone-500/40 h-[91.6dvh]"}>
                {children}
            </main>
        </Suspense>
        </div>
        </>
     );
}
 
export default SystemLayout;