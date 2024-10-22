"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaUserEdit } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";
import { MdResetTv } from "react-icons/md";

const UserTemplate = () => {
    return (
        <div className={"border rounded-md bg-gray-500/80 dark:bg-slate-700/95 h-full"}>
                <Accordion type="single" collapsible className="px-4">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold text-xl text-gray-100">
                           <div className="md:text-left md:pl-4 bg-black/25 w-full rounded-md mr-2">
                           User Name 1
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-3">
                                <Input type="login" placeholder="Login" />
                                <Input type="first" placeholder="First Name" />
                                <Input type="last" placeholder="Last Name" />
                                <Input className="col-span-2" type="email" placeholder="Email" />
                                
                                <div className=" col-span-5"></div>
                                <div className="inline-flex items-center lg:justify-end">
                                    <p className="text-md font-semibold lg:text-right">User Role</p>
                                </div>
                                <div>
                                    <Select>
                                        <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
                                            <SelectValue placeholder="User Role" />
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
                                <div className="inline-flex flex-row-reverse items-center gap-2 lg:flex-row justify-end">
                                    <p className="text-md font-semibold text-right">Reset Sessions</p>
                                    <Button>
                                        <MdResetTv size={"24"} />
                                    </Button>
                                </div>
                                <div className="inline-flex flex-row-reverse lg:flex-row items-center gap-2 justify-end">
                                    <p className="text-md font-semibold text-right">Reset Password</p>
                                    <Button variant={"destructive"}>
                                        <MdLockReset size={"28"} />
                                    </Button>
                                </div>
                                <div className="inline-flex flex-row-reverse lg:flex-row items-center gap-2 justify-end">
                                    <p className="text-md font-semibold text-right">Update User</p>
                                    <Button variant={"default"}>
                                        <FaUserEdit size={"24"} />
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
    )
}

export default UserTemplate;