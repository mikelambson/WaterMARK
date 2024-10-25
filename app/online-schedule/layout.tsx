// /app/online-schedule/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { onlineLinks } from "@/features/online-schedule/navigation/onlineLinks";


const PublicScheduleLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={onlineLinks} />
        <main className={"pt-0 pl-16"}>
            {children}
        </main>
        </div>
        </>
     );
}
 
export default PublicScheduleLayout;