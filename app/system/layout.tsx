// /app/system/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { systemLinks } from "@/features/system/navigation/systemLinks";
import { Suspense } from "react";


const SystemLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem] bg-yellow-400/10 dark:bg-amber-500/10"}>
            <Sidebar sideLinks={systemLinks} />
            <Suspense fallback={<LoadingAnimation />}>
                <main className={"pt-0 ml-14 dark:bg-stone-500/40 min-h-[79.35vh] h-full"}>
                    {children}
                </main>
            </Suspense>
            <div className="ml-14 py-8 dark:bg-stone-500/40 text-center">
                System Administration Area
            </div>
        </div>
        </>
     );
}
 
export default SystemLayout;