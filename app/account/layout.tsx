// /app/account/layout.tsx
import { Sidebar } from "@/components/nav/Sidebar";
import { accountLinks } from "@/features/account/navigation/accountLinks";
import LoadingAnimation from "@/features/loader/loading.module";
import { Suspense } from "react";

const AccountLayout = async ({ children }: { children: React.ReactNode} ) => {
    return ( 
        <div className={"h-full m-0 pt-[4rem]"}>
            <Sidebar sideLinks={accountLinks}/>
            <Suspense fallback={<LoadingAnimation />}>
                <main className={"pt-0 pl-14"}>
                    {children}
                </main>
            </Suspense>
        </div>
     );
}
 
export default AccountLayout;