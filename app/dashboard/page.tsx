"use client";
import { Geo } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react';
import { ImExit } from "react-icons/im";
import GeoMapInterface from '@/components/cards/GeoMapInterface'; // Adjust the path as necessary
import ComponentLoader from '@/features/loader/comploader.module';

const CommandCenterPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className='relative h-screen w-screen grid grid-cols-5 gap-2 p-2 bg-card'>
            <div className="col-span-1 grid grid-rows-6 gap-2">
                <div className="row-span-1 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">Lahontan Level</h1>
                </div>
                <div className="row-span-3 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">Reservoir Levels</h1>
                </div>
                <div className="row-span-2 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">USFW Flows</h1>
                </div>
            </div>
            <div className="col-span-3 grid grid-rows-6 gap-2">
                <div className="row-span-1 grid grid-cols-5 gap-2">
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">River Below Diversion</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"6.00"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">V-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-md bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">T-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-lg bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">A-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">S-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div className="row-span-4 border rounded-xl bg-slate-100/5">
                    {/* <Suspense fallback={<ComponentLoader className='h-full'/>}> */}
                        <GeoMapInterface 
                            sizeClass={"h-full w-full"} 
                            type={'card'}
                        />
                    {/* </Suspense> */}
                </div>
                <div className="row-span-1 grid grid-cols-5 gap-2">
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">L-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">L1-Lateral</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-md bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">D-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-lg bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">G-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">D-Line</h1>
                        <div className="row-span-2 flex justify-center">
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 grid grid-rows-6 gap-2">
                <div className="row-span-5 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">District Stats</h1>
                </div>
                <div className="row-span-1 border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                    <h1 className="row-span-1 text-center font-bold">Division Demand</h1>
                    <div className="row-span-2 grid grid-cols-2 -mt-2">
                        <div className='grid'>
                            <h1 className='font-medium text-center'>Carson</h1>
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                        </div>
                        <div className='grid'>
                            <h1 className='font-medium text-center'>Truckee</h1>
                            <h1 className="relative m-auto text-5xl text-orange-500 font-semibold text-center">
                                {"--"}<span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                        </div>
                    </div>
                </div>
                
            </div>
            <div 
                className={"absolute top-2 right-0 p-2 hover:top-4 hover:right-4 hover:bg-slate-600/25 hover:dark:bg-slate-100/25 hover:scale-150 hover:text-center hover:text-yellow-600 hover:dark:text-yellow-400 hover:pt-3 hover:pl-4 cursor-pointer transition-transform duration-300 rounded-md flex items-center justify-center"}
                onClick={() => {router.push('/');}}
            >
                <ImExit size={30} className='self-center justify-self-center' />
            </div>
            
        </div>
    );
};

export default CommandCenterPage;