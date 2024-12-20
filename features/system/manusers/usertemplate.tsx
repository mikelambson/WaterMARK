"use client"
import { useState } from 'react';
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
import { BsPersonVcard } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from '@/lib/utils/Debounce';
import ComponentLoader from '@/features/loader/comploader.module';
import SessionDialogue from '@/features/system/manusers/SessionDialogue';
import { ResetPasswordDialogue } from '@/features/system/manusers/ResetPasswordDialogue';
import LogoutAllSessionsDialogue from '@/features/system/manusers/LogoutAllSessionsDialogue';
import { Checkbox } from '@/components/ui/checkbox';

interface UserTemplateProps {
    userList?: any[] | null;
    error?: string | null;
    isError?: boolean;
    isLoading?: boolean;
    userType?: string;
    manProtected?: boolean;
    onRefetch: () => void;
}

const UserTemplate = ({userList, error, isError, isLoading, userType, manProtected=false, onRefetch}: UserTemplateProps) => {
    const [filters, setFilters] = useState({
        nameStartWith: '',  
        titleStartWith: '',
        emailStartWith: '',
        roleName: '',
    });
    

    // Debounced filter values to delay the actual filter logic
    const debouncedFilters = useDebounce(filters, 300);
        
    // Filter logic
    const filteredUserList = Array.isArray(userList) 
        ? userList?.filter((user) => {
            const matchesName = debouncedFilters.nameStartWith
            ? [user.firstName, user.middleName || "", user.lastName].some((name) =>
                name.toLowerCase().startsWith(debouncedFilters.nameStartWith.toLowerCase())
                )
            : true;

            const matchesTitle = debouncedFilters.titleStartWith
            ? user.title?.toLowerCase().startsWith(debouncedFilters.titleStartWith.toLowerCase())
            : true;

            const matchesEmail = debouncedFilters.emailStartWith
            ? user.email?.toLowerCase().startsWith(debouncedFilters.emailStartWith.toLowerCase())
            : true;

            const matchesRole = debouncedFilters.roleName
            ? user.roleId?.some(
                (role: { role: { name: string } }) =>
                    role.role.name.toLowerCase() === debouncedFilters.roleName.toLowerCase()
                )
            : true;

            return matchesName && matchesTitle && matchesEmail && matchesRole;
        })
        : [];

    const handleFilterChange = (e: any) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value}));
    };

    const getUniqueRoleNames = (list: any[] | undefined | null) => {
        if (!Array.isArray(list)) return [];
        return Array.from(new Set(
          list.flatMap(user => user.roleId?.map((role: { role: { name: any; }; }) => role.role.name) || [])
        ));
    };
      
    const uniqueRoleNames = getUniqueRoleNames(userList);

    return (
        <div>
            <div className="mb-4 flex justify-around">
                <div className="flex flex-wrap gap-2">
                    <Input 
                        name="nameStartWith" 
                        value={filters.nameStartWith} 
                        onChange={handleFilterChange} 
                        placeholder="Seach by Name" 
                        className="w-48" 
                    />
                    <Input 
                        name="emailStartWith" 
                        value={filters.emailStartWith} 
                        onChange={handleFilterChange} 
                        placeholder="Search by Email" 
                        className="w-48" 
                    />
                    {userType === 'staff' && (
                        <>
                            <Input 
                                name="titleStartWith" 
                                value={filters.titleStartWith}
                                onChange={handleFilterChange} 
                                placeholder="Search by Title" 
                                className="w-48" 
                            />
                            
                            <Select>
                                <SelectTrigger className="w-[180px] font-semibold text-lg pl-4">
                                    <SelectValue placeholder="All Roles" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="">All Roles</SelectItem>
                                    {uniqueRoleNames.map(name => (
                                        <SelectItem key={name} value={name}>{name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </>    
                    )}
                </div>
            </div>
            <div className={"border rounded-md bg-yellow-400"}>
                {isLoading ? ( 
                    // Loading Skeleton
                        <Skeleton className="px-4 py-1 w-full h-96">
                            <ComponentLoader />
                        </Skeleton> 

                ) : isError ? (
                        <p className=" py-2">
                            <span className="text-red-500 mr-2">Error:</span>
                            {error}
                        </p>
                ) : userList ? (
                    <Accordion type="single" collapsible className="px-4 bg-card rounded-md">
                        {filteredUserList?.map((user) => (
                            <AccordionItem value={user.id} key={user.id} className='py-1'>
                                <AccordionTrigger className="font-semibold text-xl text-gray-100 p-1">
                                    <div className="text-left w-full rounded-md mr-2 text-card-alternative">
                                    {user.firstName} {user.middleName ? user.middleName + ' ' : ''}{user.lastName}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 px-1 pt-1 -mb-2">
                                        <div className='col-span-1 relative'> 
                                            <div className='absolute left-2 h-full flex items-center text-foreground/50'>
                                                Login:
                                            </div>
                                            <Input className="pl-14 bg-slate-400 dark:bg-card-foreground" type="login" placeholder={user.login} 
                                            disabled={!manProtected && user.protected} 
                                            />
                                        </div>
                                        <div className='col-span-2 relative'> 
                                            <div className='absolute left-2 h-full flex items-center text-foreground/50'>
                                                Email:
                                            </div>
                                            <Input className="pl-14 bg-card-foreground" type="email" placeholder={user.email ? user.email : "No Email"}
                                            disabled={!manProtected && user.protected} 
                                            />
                                        </div>
                                        <div className='relative'>
                                            <div className='absolute left-2 h-full flex items-center text-foreground/50'>
                                                First:
                                            </div>
                                            <Input className="pl-14 bg-card-foreground" type="first" placeholder={user.firstName} 
                                            disabled={!manProtected && user.protected} 
                                            />
                                        </div>
                                        <div className='relative'>
                                            <div className='absolute left-2 h-full flex items-center text-foreground/50 text-xs'>
                                                Middle:
                                            </div>
                                            <Input className="pl-14 bg-card-foreground" type="middle" placeholder={user.middleName ? `${user.middleName}` : "N/A"}disabled={!manProtected && user.protected} 
                                            />
                                        </div>
                                        <div className='relative'>
                                            <div className='absolute left-2 h-full flex items-center text-foreground/50'>
                                                Last:
                                            </div>
                                            <Input className="pl-14 bg-card-foreground" type="last" placeholder={user.lastName}
                                            disabled={!manProtected && user.protected} 
                                            />
                                        </div>
                                        <div className='relative'>
                                            <div className='absolute left-2 h-full flex items-center text-foreground/50'>
                                                Title:
                                            </div>
                                            <Input className="pl-14 bg-card-foreground" type="title" placeholder={user.title}
                                            disabled={!manProtected && user.protected} 
                                            />
                                        </div>
                                            <div className='relative inline-flex gap-2'>
                                                <div className='absolute left-2 h-full flex items-center text-foreground/50 text-xs'>
                                                    TmpPw:
                                                </div>
                                                <Input className="pl-14 bg-card-foreground" type="title" placeholder={user.temppass ? user.temppass : "No Temp Password"} disabled={!user.temppass || !manProtected && user.protected}
                                                />
                                                {user.temppass && (
                                                    <ResetPasswordDialogue 
                                                        user={user} 
                                                        manProtected={manProtected}
                                                        iconKey='key' 
                                                        variant='secondary'
                                                    />
                                                )}
                                            </div>
                                            {manProtected && (
                                                <div className='relative inline-flex gap-2 px-8'>
                                                    <Button
                                                        className='flex-1'
                                                        variant={'destructive'}
                                                        disabled={user.protected}
                                                        onClick={() => console.log('Delete User')}
                                                    >
                                                        Delete User
                                                    </Button>
                                                </div>
                                            )}
                                        <div className="border-b-2 col-span-3" />
                                        <div className="col-span-3 flex items-center gap-3">
                                            <div className="text-right font-semibold">
                                                <p>User</p><p>Roles</p>
                                            </div>
                                            <div className='flex gap-2'>
                                                {user.roleId.map((role: any) => (
                                                    <div key={role.role.id} className="p-2 border rounded-md">
                                                        <p className="text-sm">Name: {role.role.name}</p>
                                                        <p className="text-sm">Super Admin: {role.role.superAdmin ? 'Yes' : 'No'}</p>
                                                        <p className="text-sm">Protected: {role.role.protected ? 'Yes' : 'No'}</p>
                                                        <p className="text-sm">Assigned By: {role.assignedBy}</p>
                                                        <p className="text-sm">Assigned At: {new Date(role.assignedAt).toLocaleString()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="border-b-2 col-span-3" />
                                        <div className="border-b-2 col-span-3">
                                            {/* Active Sessions */}
                                            {user.ActiveSessions.length > 0 ? (
                                                <div className="">
                                                <h3 className="text-md font-semibold">Active Sessions:</h3>
                                                    {user.ActiveSessions.map((session: any) => (
                                                        <SessionDialogue 
                                                            key={session.id} 
                                                            session={session} 
                                                            onRefetch={onRefetch} 
                                                        />
                                                    ))}
                                                </div>
                                            ) : ( 
                                                <h3 className=''>
                                                    No Active Sessions
                                                </h3> 
                                            )}
                                        </div>
                                        <div className="col-span-3 inline-flex items-center gap-2 justify-between">
                                            <div>
                                                <div className={"ml-2 inline-flex border h-10 rounded-md px-3 items-center gap-2 bg-card whitespace-nowrap"}>
                                                    <Checkbox
                                                        id="protecteduser"
                                                        disabled={!manProtected}
                                                        defaultChecked={user.protected}
                                                        onCheckedChange={(checked) => console.log(checked)}
                                                    />       
                                                    <label
                                                        htmlFor="protecteduser"
                                                        className="pl-2 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        PROTECTED USER
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-2 justify-end">
                                                <p className="text-md font-semibold">
                                                    Add/Remove Roles 
                                                </p>
                                                <Button disabled={!manProtected && user.protected}>
                                                    <BsPersonVcard size={"24"} />
                                                </Button>
                                                <Select disabled={!manProtected && user.protected}>
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
                                        </div>
                                        <div className="inline-flex items-center gap-2 justify-end">
                                            <p className="text-md font-semibold text-right">Logout All Sessions</p>
                                            
                                            <LogoutAllSessionsDialogue logoutUserId={user.id} onRefresh={onRefetch} />
                                        </div>
                                        <div className="inline-flex items-center gap-2 justify-end">
                                            <p className="text-md font-semibold text-right">Reset Password</p>
                                            <ResetPasswordDialogue user={user} manProtected={manProtected} />
                                        </div>
                                        <div className="inline-flex flex-row-reverse lg:flex-row items-center gap-2 justify-end">
                                            <p className="text-md font-semibold text-right">Save Changes</p>
                                            <Button 
                                            variant={"default"}
                                            disabled={!manProtected && user.protected}
                                            >
                                                <FaUserEdit size={"24"} />
                                            </Button>
                                        </div>
                                        <div className="border-b-2 col-span-3 -mb-2" />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default UserTemplate;