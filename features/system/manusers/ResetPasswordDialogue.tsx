import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdLockReset } from "react-icons/md"
import { FaKey} from "react-icons/fa";
import { useRandomPassword } from "@/lib/utils/RandomPassword"

interface User {
    firstName: string;
    middleName?: string;
    lastName: string;
    protected: boolean;
}

interface ResetPasswordDialogueProps {
    user: User;
    manProtected: boolean;
    iconKey?: string;
}

const ResetPasswordDialogue = ({ user, manProtected, iconKey }: ResetPasswordDialogueProps) => {
    const [open, setOpen] = useState(false);

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

        // If we get here, passwords match and fields are not empty.
        // Perform your reset password action here:
        // onResetPassword(password, confirmPassword);
        
        // After successful action, close the dialog
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                  variant={"destructive"}
                  disabled={!manProtected && user.protected}
                  onClick={() => setOpen(true)}
                >
                    {iconKey === 'key' ? <FaKey size={"28"} /> : <MdLockReset size={"28"} />}
                </Button>
            </DialogTrigger>
            <DialogContent className='w-96'>
                <h1 className="text-lg font-semibold">
                    {iconKey === 'key' ? 'Change Password' : 'Reset Password'}
                </h1>
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
