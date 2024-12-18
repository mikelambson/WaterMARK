import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useRoleStore } from "@/components/nav/RoleContext";
import { LogoutUser } from '@/lib/auth/UserLogout';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MdResetTv } from 'react-icons/md';
import { Button } from '@/components/ui/button';

interface LogoutAllSessionsDialogueProps {
    logoutUserId: string;
    onRefresh: () => void;
}

const LogoutAllSessionsDialogue = ({ logoutUserId, onRefresh }: LogoutAllSessionsDialogueProps) => {
    const {userData, userLogout, clearUser} = useAuthStore();
    const { setUserRole } = useRoleStore();
    const router = useRouter();
    const sameUser = userData?.id === logoutUserId;
    

    const handleLogoutAllSessions = async () => {

        if (sameUser) {
            await userLogout({byUserId: true});
            router.push('/');
            clearUser();
            setUserRole(["Anonymous"]);
            return;
        } else {
            await LogoutUser({ userId: logoutUserId });
        }
        onRefresh();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><MdResetTv size={"24"} /></Button>
            </DialogTrigger>
            <DialogContent className="w-96">
                <DialogHeader>
                    <DialogTitle>Logout All Sessions</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to logout all sessions for this user?
                    </DialogDescription>
                </DialogHeader>
                <div className="inline-flex justify-center gap-4">
                
                    <Button 
                        onClick={handleLogoutAllSessions}
                        variant={"destructive"}
                    >
                        Yes, Logout
                    </Button>
                    <DialogTrigger asChild>
                        <Button>Cancel</Button>
                    </DialogTrigger>
                </div>
            </DialogContent>
        
        </Dialog>
    );
};

export default LogoutAllSessionsDialogue;