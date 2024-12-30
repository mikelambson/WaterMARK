"use client"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm"
import { useRoleStore } from "@/lib/context/RoleContext";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';


function LoginDialog({ children }: { children: React.ReactNode }) {
    return <Dialog>
        {children}
        <LoginDialog.Content /> 
    </Dialog>;
}

LoginDialog.Trigger = DialogTrigger;
LoginDialog.Content = () => {
    const { userRole, setUserRole } = useRoleStore();
    const { userLogout } = useAuthStore();
    const router = useRouter();
    return (
        <>
        {userRole.includes("Anonymous") ? (
        <DialogContent className="max-w-lg">
            <DialogHeader className="flex items-center">
                <DialogTitle className="text-yellow-800 dark:text-yellow-700">LOGIN</DialogTitle>
                <DialogDescription>
                    Please sign in to your account.
                </DialogDescription>
            </DialogHeader>
            <LoginForm />
      </DialogContent>
    ): ( 
        <DialogContent className="max-w-md">
                    <DialogHeader className="flex items-center">
                        <DialogTitle className="text-yellow-800 dark:text-yellow-700">
                            LOGOUT
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you wish to sign out?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-around">
                        <div className="flex gap-4">
                            <DialogTrigger asChild>
                                <Button 
                                    variant={"destructive"}
                                    onClick={() => {
                                        userLogout()
                                        setUserRole(["Anonymous"])
                                        router.push('/');
                                    }}>
                                    Yes
                                </Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <Button variant={"secondary"}>NO</Button>
                            </DialogTrigger>
                        </div>
                    </div>
                </DialogContent>
    )}
    </>
    );
  };
export default LoginDialog;