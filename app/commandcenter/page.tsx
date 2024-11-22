"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { ImExit } from "react-icons/im";

const CommandCenterPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className='h-screen w-screen z-auto'>
            <div className='h-screen w-screen grid z-50'>
                <div className='relative h-screen w-screen grid grid-cols-5 gap-2 p-2 bg-card z-50'>
                    <div className="col-span-1 grid grid-rows-6 gap-2">
                        <div className="row-span-1 border bg-slate-100/5">
                            Row 1
                        </div>
                        <div className="row-span-3 border bg-slate-100/5">
                            Row 2
                        </div>
                        <div className="row-span-2 border bg-slate-100/5">
                            Row 3
                        </div>
                    </div>
                    <div className="col-span-3 grid grid-rows-6 gap-2">
                        <div className="row-span-1 grid grid-cols-5 gap-2">
                            <div className="border bg-slate-100/5">
                                Row 1, Column 1
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 1, Column 2
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 1, Column 3
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 1, Column 4
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 1, Column 5
                            </div>
                        </div>
                        <div className="row-span-4 border bg-slate-100/5">
                            -- Map Here --
                        </div>
                        <div className="row-span-1 grid grid-cols-5 gap-2">
                            <div className="border bg-slate-100/5">
                                Row 3, Column 1
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 3, Column 2
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 3, Column 3
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 3, Column 4
                            </div>
                            <div className="border bg-slate-100/5">
                                Row 3, Column 5
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 grid grid-rows-6 gap-2">
                        <div className="row-span-5 border bg-slate-100/5">
                            Row 1
                        </div>
                        <div className="row-span-1 border bg-slate-100/5">
                            Row 2
                        </div>
                        
                    </div>
                    <div 
                        className={"absolute top-2 right-0 p-2 hover:top-4 hover:right-4 hover:bg-slate-600/25 hover:dark:bg-slate-100/25 hover:scale-150 hover:text-center hover:text-yellow-600 hover:dark:text-yellow-400 hover:pt-3 hover:pl-4 cursor-pointer transition-transform duration-300 rounded-md flex items-center justify-center"}
                        onClick={() => {router.push('/');}}
                    >
                        <ImExit size={30} className='self-center justify-self-center' />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CommandCenterPage;