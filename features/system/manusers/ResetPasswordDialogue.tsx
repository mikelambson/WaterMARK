import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdLockReset } from "react-icons/md"
import { FaKey} from "react-icons/fa";
import { useRandomPassword } from "@/lib/utils/RandomPassword"
import { useSaveUser } from "@/services/auth/UpdateUser"

interface User {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    protected: boolean;
    temppass?: string;
}

interface ResetPasswordDialogueProps {
    user: User;
    manProtected: boolean;
    iconKey?: string;
    variant?: string;
}

const ResetPasswordDialogue = ({ user, manProtected, iconKey, variant }: ResetPasswordDialogueProps) => {
    const [open, setOpen] = useState(false);
    const { mutate: saveUser } = useSaveUser();
    const variantColor: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" = variant as any || "destructive";

    const {
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        generateRandomPassword
    } = useRandomPassword();

    const handleResetClick = () => {
        if (!password || !confirmPassword) {
            alert("Fields cannot be empty");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

         // Perform the update using the mutation
         saveUser(
            { id: user.id, temppass: password }, // Pass updated fields to the mutation
            {
                onSuccess: () => {
                    // Close the dialog on success
                    setOpen(false);
                },
                onError: (error) => {
                    alert(`Failed to reset password: ${error.message}`);
                },
            }
        );
        
        // After successful action, close the dialog
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                  variant={variantColor}
                  disabled={!manProtected && user.protected}
                  onClick={() => setOpen(true)}
                >
                    {iconKey === 'key' ? <FaKey size={"28"} /> : <MdLockReset size={"28"} />}
                </Button>
            </DialogTrigger>
            <DialogContent className='w-96'>
                <DialogHeader>
                    <DialogTitle>
                    <span className="text-lg font-semibold">
                        {iconKey === 'key' ? 'Change Password' : 'Reset Password'}
                    </span>
                    </DialogTitle>
                    <DialogDescription>
                        {user.protected ? "Protected" : "Not Protected"}
                    </DialogDescription>
                </DialogHeader>
                
                <p>
                  Are you sure you want to reset the password for {user.firstName}{' '}
                  {user.middleName ? user.middleName + ' ' : ''}{user.lastName}?
                </p>
                <Button onClick={generateRandomPassword}>Generate Random</Button>
                <Input
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <DialogFooter className="flex gap-2">
                    <Button variant={"destructive"} onClick={handleResetClick}>
                        Reset Password
                    </Button>
                    <Button variant={"default"} onClick={() => setOpen(false)}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export { ResetPasswordDialogue };
