// /app/admin/layout.tsx
"use client";
import { Sidebar } from "@/components/nav/Sidebar";
import { adminLinks } from "@/features/admin/navigation/adminLinks";
import { useRoleStore } from "@/components/nav/RoleContext"; // Import useRole
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import LoadingAnimation from "@/features/loader/loading.module";


const SchedulingLayout = ({ children }: { children: React.ReactNode} ) => {

    const { userRole, setUserRole } = useRoleStore();
    const router = useRouter();


    // Redirect if the user role is "Anonymous"
  if (userRole === "Anonymous") {
    router.push('/'); // Redirect to the login page
    return null; // Return null to prevent rendering anything else on this page
  }

    return ( 
        <div className={"h-full m-0 pt-[4rem]"}>
            <Sidebar sideLinks={adminLinks} />
            <Suspense fallback={<LoadingAnimation />}>
              <main className={"pt-0 pl-14"}>
                  {children}
                  <button className="border rounded-md p-3 bg-slate-100" onClick={() => setUserRole("Anonymous")}>Logout</button>
              </main>
            </Suspense>
        </div>
     );
}
 
export default SchedulingLayout;