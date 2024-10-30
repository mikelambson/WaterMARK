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
import { BsPersonVcard } from "react-icons/bs";

const UserTemplate = () => {
    return (
        <div className={"border rounded-md bg-yellow-400"}>
                <Accordion type="single" collapsible className="px-4 bg-card rounded-md">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold text-xl text-gray-100">
                           <div className="text-left pl-4 w-full rounded-md mr-2 text-card-alternative">
                           User Name 1
                           </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3">
                                <Input className="col-span-1 bg-slate-400 dark:bg-card-foreground" type="login" placeholder="Login" />
                                <Input className="col-span-2 bg-card-foreground" type="email" placeholder="Email" />
                                <Input className="bg-card-foreground" type="first" placeholder="First Name" />
                                <Input className="bg-card-foreground" type="middle" placeholder="Middle Name" />
                                <Input className=" bg-card-foreground" type="last" placeholder="Last Name" />
                                <Input className="bg-card-foreground" type="title" placeholder="Title" />
                                <div className="border-b-2 col-span-3" />
                                <div className="col-span-3 flex sm:inline-flex items-center gap-3">
                                    <p className="w-44 h-1 ">User Roles</p>
                                    <div className="px-3 py-2 bg-card-foreground border rounded-sm flex items-center w-full ">...list of role names</div>
                                </div>
                                <div className="col-span-3 inline-flex items-center gap-2 justify-end">
                                    <p className="text-md font-semibold col-span-3">
                                        Add/Remove Roles
                                    </p>
                                    <Button>
                                        <BsPersonVcard size={"24"} />
                                    </Button>
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
                                <div className="inline-flex items-center gap-2 justify-end">
                                    <p className="text-md font-semibold text-right">Manage Sessions</p>
                                    <Button>
                                        <MdResetTv size={"24"} />
                                    </Button>
                                </div>
                                <div className="inline-flex items-center gap-2 justify-end">
                                    <p className="text-md font-semibold text-right">Reset Password</p>
                                    <Button variant={"destructive"}>
                                        <MdLockReset size={"28"} />
                                    </Button>
                                </div>
                                <div className="inline-flex flex-row-reverse lg:flex-row items-center gap-2 justify-end">
                                    <p className="text-md font-semibold text-right">Save Changes</p>
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