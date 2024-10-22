// /app/reports/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { testingLinks } from "@/features/testing/navigation/testingLinks";


const TestingLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <>
        <div className={"h-full m-0 pt-[4rem]"}>
        <Sidebar sideLinks={testingLinks} />
        <main className={"pt-0 pl-16"}>
            {children}
        </main>
        </div>
        </>
     );
}
 
export default TestingLayout;