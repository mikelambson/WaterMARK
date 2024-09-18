import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaUserEdit } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";
import { MdResetTv } from "react-icons/md";


const ManageUsers = () => {
    return ( 
        <div className="p-2">
            <div className="flex flex-wrap flex-col-reverse lg:grid lg:grid-cols-3 mb-2 gap-3">
                <div className=" justify-center">
                    <Select>
                        <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
                            <SelectValue placeholder="Select" defaultValue={"staff"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="wateruser">Wateruser</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <h1 className={"text-2xl font-semibold justify-self-center self-center"}>User Management</h1>
                <div className="lg:justify-self-end">
                    <Button className="w-[180px]">Add User</Button>
                </div>
            </div>
            <div className={"border rounded-md bg-neutral-400 dark:bg-stone-800 h-full"}>
                <Accordion type="single" collapsible className="px-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold text-xl">User Name 1</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-5 gap-3">
                                <Input type="login" placeholder="Login" />
                                <Input type="first" placeholder="First Name" />
                                <Input type="last" placeholder="Last Name" />
                                <Input className="col-span-2" type="email" placeholder="Email" />
                                
                                <div className=" col-span-5"></div>
                                <div className="inline-flex items-center justify-end">
                                    <p className="text-lg font-semibold">User Role</p>
                                </div>
                                <div>
                                    <Select>
                                        <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sysadmin">Sysadmin</SelectItem>
                                            <SelectItem value="watermaster">Watermaster</SelectItem>
                                            <SelectItem value="senioranalyst">Senior Analyst</SelectItem>
                                            <SelectItem value="analyst">Analyst</SelectItem>
                                            <SelectItem value="scheduler">Scheduler</SelectItem>
                                            <SelectItem value="lead">Lead</SelectItem>
                                            <SelectItem value="ditchrider">Ditchrider</SelectItem>
                                            <SelectItem value="staff">Staff</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="inline-flex items-center gap-4 justify-end">
                                    <p className="text-lg font-semibold">Reset Sessions</p>
                                    <Button>
                                        <MdResetTv size={"24"} />
                                    </Button>
                                </div>
                                <div className="inline-flex items-center gap-4 justify-end">
                                    <p className="text-lg font-semibold">Reset Password</p>
                                    <Button variant={"destructive"}>
                                        <MdLockReset size={"28"} />
                                    </Button>
                                </div>
                                <div className="inline-flex items-center gap-4 justify-end">
                                    <p className="text-lg font-semibold">Update User</p>
                                    <Button variant={"default"}>
                                        <FaUserEdit size={"24"} />
                                    </Button>
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