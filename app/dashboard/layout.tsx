"use client";
import React from 'react';
import { useRoleStore } from '@/components/nav/RoleContext';
import { useRouter } from 'next/navigation';

const FullScreenLayout = ({ children }: { children: React.ReactNode}) => {
    const { userRole } = useRoleStore();
    const router = useRouter();

    // if (userRole.includes("Anonymous")) {
    //     router.push("/");
    // }

    return (
        <div className={"grid"}>
            <div className={"z-50"}>
                {children}
            </div>
        </div>
    );
};

export default FullScreenLayout;