import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import LoginForm from "@/app/testing/_components/login/loginForm"


export default function Login() {


  return (
    <div className='p-4 ml-4'>
        <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>LOGIN DEVELOPMENT</h1>
        <div className="flex justify-around my-4">
            <div className="flex gap-4">
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"destructive"}>LOGOUT</Button>
                    </DialogTrigger>
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
                                <Button variant={"secondary"}>Yes</Button>
                                <DialogTrigger asChild>
                                    <Button variant={"destructive"}>NO</Button>
                                </DialogTrigger>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild><Button>LOGIN</Button></DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader className="flex items-center">
                            <DialogTitle className="text-yellow-800 dark:text-yellow-700">LOGIN</DialogTitle>
                            <DialogDescription>
                                Please sign in to your account.
                            </DialogDescription>
                        </DialogHeader>
                        <LoginForm />
                        
                    </DialogContent>
                </Dialog>

                
            </div> 
        </div>

      
    </div>
  );
}
