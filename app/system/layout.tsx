// /app/system/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { systemLinks } from "./_components/navigation/systemLinks";


const SystemLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={systemLinks} />
        <main className={"pt-0 pl-14 bg-stone-500/40 h-[91.6dvh]"}>
            {children}
        </main>
        </div>
        </>
     );
}
 
export default SystemLayout;