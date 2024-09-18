import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MdLockReset } from "react-icons/md";
import { MdResetTv } from "react-icons/md";


const ManageUsers = () => {
    return ( 
        <div className="p-2">
            <div className="inline-flex w-full justify-around mb-2">
                <h1 className={"text-2xl font-semibold text-gray-400"}>User Management</h1>
            </div>
            <div className={"border rounded-md bg-stone-800 h-full"}>
                <Accordion type="single" collapsible className="px-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>User Name 1</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-5 gap-3">
                                <Input type="login" placeholder="Login" />
                                <Input type="first" placeholder="First Name" />
                                <Input type="last" placeholder="Last Name" />
                                <Input type="email" placeholder="Email" />
                                <div className="inline-flex items-center gap-4 justify-end">
                                    <p className="text-lg">Reset Password</p>
                                    <Button variant={"destructive"}><MdLockReset size={"24"} /></Button>
                                </div>
                                <div className="inline-flex items-center gap-4 justify-end">
                                    <p className="text-lg">Reset Sessions</p>
                                    <Button><MdResetTv size={"24"} /></Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
     );
}
 
export default ManageUsers;