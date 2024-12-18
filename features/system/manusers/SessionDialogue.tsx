import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAuthStore } from "@/lib/store/authStore";
import { LogoutUser } from "@/lib/auth/UserLogout";

interface Session {
    id: string;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
    expiresAt: string;
    isActive: boolean;
}

interface SessionDialogueProps {
    session: Session;
    onRefetch: () => void;
}

const SessionDialogue = ({ session, onRefetch }: SessionDialogueProps) => {
    const { userLogout } = useAuthStore();
    return (
        <div key={session.id} className="pl-4">
            <p className="text-sm">Session ID: 
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'link'} className='h-0'>
                            {session.id}
                        </Button>
                    </DialogTrigger>
                
                    <DialogContent className='h-96 flex flex-col justify-center items-center gap-2 '>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-center">
                            Session Details
                        </DialogTitle>
                        <DialogDescription
                            className='text-sm'>
                            Session ID: {session.id}
                        </DialogDescription>
                    </DialogHeader> 
                        <div className="whitespace-break-spaces">
                        <p className="text-sm">IP Address: {session.ipAddress}</p>
                        <p className="text-sm">User Agent: {session.userAgent}</p>
                        <p className="text-sm">Created At: {new Date(session.createdAt).toLocaleString()}</p>
                        <p className="text-sm">Expires At: {new Date(session.expiresAt).toLocaleString()}</p>
                        {/* <p className="text-sm">Is Active: {session.isActive ? 'Yes' : 'No'}</p> */}
                        </div>
                        
                        <DialogFooter className='flex gap-2'>
                            <DialogTrigger asChild>
                                <Button 
                                    variant="destructive"
                                    onClick={() => {
                                        LogoutUser({ sessionId: session.id });
                                        onRefetch();
                                    }
                                }>
                                    End Session
                                </Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <Button variant="default">
                                    Refresh Session
                                </Button>
                            </DialogTrigger>
                            <DialogTrigger>
                                Close
                            </DialogTrigger>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </p>
        </div>
    )
};

export default SessionDialogue;