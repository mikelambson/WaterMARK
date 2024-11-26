// /app/system/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import LoadingAnimation from "@/features/loader/loading.module";
import { systemLinks } from "@/features/system/navigation/systemLinks";
import { Suspense } from "react";


const SystemLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"m-0 pt-16 h-full min-h-[calc(100dvh-4rem)] bg-yellow-400/10 dark:bg-amber-500/10"}>
            <Sidebar sideLinks={systemLinks} />
            <Suspense fallback={<LoadingAnimation />}>
                <main className={"relative pt-0 sm:ml-14 dark:bg-stone-500/40 h-full min-h-[calc(100dvh-4rem)] z-10"}>    
                    {children}
                </main>
            </Suspense>
            <div className="absolute bottom-4 left-[20%] sm:left-[calc(50%-7rem)] p-4 dark:bg-stone-500/40 text-center z-0">
                        System Administration Area
            </div>
        </div>
        </>
     );
}
 
export default SystemLayout;