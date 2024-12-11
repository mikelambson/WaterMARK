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

interface UserTemplateProps {
    userList: any[] | null;
    error: string | null;
}

const UserTemplate = ({userList, error}: UserTemplateProps) => {
    

    return (
        <div className={"border rounded-md bg-yellow-400"}>
            <Accordion type="single" collapsible className="px-4 bg-card rounded-md">
            {error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : userList ? (
                <>
                    {userList.map((user) => (
                        <AccordionItem value={user.id} key={user.id}>
                            <AccordionTrigger className="font-semibold text-xl text-gray-100 p-1">
                                <div className="text-left w-full rounded-md mr-2 text-card-alternative">
                                {user.firstName} {user.middleName ? user.middleName + ' ' : ''}{user.lastName}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3">
                                    <Input className="col-span-1 bg-slate-400 dark:bg-card-foreground" type="login" placeholder={user.login} />
                                    <Input className="col-span-2 bg-card-foreground" type="email" placeholder={user.email} />
                                    <Input className="bg-card-foreground" type="first" placeholder={user.firstName} />
                                    <Input className="bg-card-foreground" type="middle" placeholder={user.middleName} />
                                    <Input className=" bg-card-foreground" type="last" placeholder={user.lastName} />
                                    <Input className="bg-card-foreground" type="title" placeholder={user.title} />
                                    <div className="border-b-2 col-span-3" />
                                    <div className="col-span-3 flex sm:inline-flex items-center gap-3">
                                        <p className="w-44 h-1 ">User Roles</p>
                                        <div className="p-2 bg-card-foreground">
                                            {user.roleId.map((role: any) => (
                                                <div key={role.role.id} className="pl-4">
                                                    <p className="text-sm">Name: {role.role.name}</p>
                                                    <p className="text-sm">Super Admin: {role.role.superAdmin ? 'Yes' : 'No'}</p>
                                                    <p className="text-sm">Protected: {role.role.protected ? 'Yes' : 'No'}</p>
                                                    <p className="text-sm">Assigned By: {role.assignedBy}</p>
                                                    <p className="text-sm">Assigned At: {new Date(role.assignedAt).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-b-2 col-span-3">
                                        {/* Active Sessions */}
                                        {user.ActiveSessions.length > 0 && (
                                            <div className="mt-2">
                                            <h3 className="text-md font-semibold">Active Sessions:</h3>
                                            {user.ActiveSessions.map((session: any) => (
                                                <div key={session.id} className="pl-4">
                                                <p className="text-sm">Session ID: {session.id}</p>
                                                <p className="text-sm">IP Address: {session.ipAddress}</p>
                                                <p className="text-sm">User Agent: {session.userAgent}</p>
                                                <p className="text-sm">Created At: {new Date(session.createdAt).toLocaleString()}</p>
                                                <p className="text-sm">Expires At: {new Date(session.expiresAt).toLocaleString()}</p>
                                                <p className="text-sm">Is Active: {session.isActive ? 'Yes' : 'No'}</p>
                                                </div>
                                            ))}
                                            </div>
                                        )}
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
                    ))}
                </>
            ) : (
                <p>Loading...</p>
            )}
            </Accordion>
        </div>
    )
}

export default UserTemplate;