// /app/(scheduling)/layout.tsx
import { NavigationSidebar } from "./_components/navigation/navigation-sidebar";


const SchedulingLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <NavigationSidebar />
        <main className={"pt-0 pl-20"}>
            {children}
        </main>
        </div>
        </>
     );
}
 
export default SchedulingLayout;