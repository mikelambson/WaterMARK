"use client";
import { Geo } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { ImExit } from "react-icons/im";
import GeoMapInterface from '@/components/cards/GeoMapInterface'; // Adjust the path as necessary
// import ComponentLoader from '@/features/loader/comploader.module';
import { Button } from '@/components/ui/button';
import LahontanLakeLevel from '@/components/cards/LahontanLevel';
import { measurementNumber } from '@/lib/utils';


const CommandCenterPage: React.FC = () => {
    const router = useRouter();
    const [centralDisplay, setCentralDisplay] = useState('map');

    const centralDisplayObj = (() => {
        const classes = 'h-full w-full p-4';

        switch(centralDisplay) {
            case 'map':
                return <GeoMapInterface 
                    sizeClass={"h-full w-full"} 
                    type={'card'}
                />;
            case 'graph':
                return <LahontanLakeLevel className='h-full pt-14' />;
            case 'table':
                return <div className={classes}>Table</div>;
            case 'fullmap':
                return (
                    <div className={classes}>
                        <div className={"absolute top-0 left-0 w-screen h-screen z-10"}>
                            <GeoMapInterface 
                            sizeClass={"h-full w-full"} 
                            type={'screen'}
                            />
                        </div>
                    </div>
                );
            default:
                return <GeoMapInterface 
                    sizeClass={"h-full w-full"} 
                    type={'card'}
                />;
        }
    })();

    return (
        <div className='relative h-screen w-screen grid grid-cols-5 gap-2 p-2 bg-card'>
            <div className="col-span-1 grid grid-rows-6 gap-2">
                <div className="row-span-1 border rounded-xl bg-slate-100/5 p-4 grid">
                    <h1 className="row-span-1 text-center font-bold">Lahontan Level</h1>
                    <div className='w-full grid grid-cols-2 justify-items-center'>
                        <div>Lake Level</div>
                        <div className='text-orange-500'>
                            {measurementNumber({number: 120100, precision: 0})} 
                            <span className='text-foreground pl-1 text-sm'>AF</span>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-4 justify-items-center'>
                        <div className='text-xs'>
                            <h3>InFlow</h3>
                        </div>
                        <div className='text-orange-500'>
                            {measurementNumber({number: 64.8, precision: 2})} 
                            <span className='text-foreground pl-1 text-[.5rem]'></span>
                        </div>
                        <div className='text-xs'>Outflow</div>
                        <div className='text-orange-500'>
                            {measurementNumber({number: 2.05, precision: 2})}
                        </div>
                    </div>
                    
                </div>
                <div className="row-span-3 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">Reservoir Levels</h1>
                    <div className="row-span-2 h-full grid grid-cols-3 justify-center p-4">
                        <div className='col-span-2 grid grid-rows-4 gap-4'>
                                <p>Sheckler Reservoir</p>
                                <p>S-Line Reservoir</p>
                                <p>Harmon Reservoir</p>
                                <p>Stillwater Point</p>
                        </div>
                        <div className='col-span-1 grid grid-rows-4 gap-4 text-2xl text-orange-500 font-semibold pl-4'>
                            <p>{measurementNumber({number: 0, precision: 2})}</p>
                            <p>{measurementNumber({number: 0, precision: 2})}</p>
                            <p>{measurementNumber({number: 0, precision: 2})}</p>
                            <p>{measurementNumber({number: 0, precision: 2})}</p>
                        </div>
                    </div>
                </div>
                <div className="row-span-2 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">USFW Flows</h1>
                </div>
            </div>
            <div className="h-[calc(100dvh-.7rem)] col-span-3 grid grid-rows-6 gap-2">
                <div className="row-span-1 grid grid-cols-5 gap-2">
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 py-4">
                        <h1 className="row-span-1 text-center font-bold">River at Diversion</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">V-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-md bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">T-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-lg bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">A-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">S-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                </div>
                <div className="row-span-4 border rounded-xl bg-slate-100/5">
{/* <Suspense fallback={<ComponentLoader className='h-full'/>}> */}

                    {centralDisplayObj}
                    <div className="absolute top-0 right-[50%] h-14 w-96 group">
                        {/* Inner div that slides down on hover */}
                            <div className="relative h-2 w-full rounded-b-xl drop-shadow-lg border-x border-neutral-600/70 border-b-2 bg-gray-600/70 transform translate-x-1/2 z-50 transition-all duration-300 ease-in-out group-hover:h-full group-hover:border-neutral-700/90 group-hover:bg-neutral-700/90">
                                <div className='hidden group-hover:inline-flex w-full px-2 pt-[0.4rem] gap-3 justify-center'>
                                    <Button 
                                        variant={"secondary"}
                                        onClick={() => centralDisplay === "map" ? setCentralDisplay('fullmap') : setCentralDisplay('map')}
                                    >
                                            {centralDisplay === "map" ? "Full Screen" : centralDisplay === "fullmap" ? "Small Map" : "Map"}
                                    </Button>
                                    <Button 
                                        variant={"secondary"}
                                        onClick={() => setCentralDisplay('graph')}>
                                            Graph
                                    </Button>
                                    <Button 
                                        variant={"secondary"}
                                        onClick={() => setCentralDisplay('table')}>
                                            Table
                                    </Button>
                                    <Button 
                                        variant={"secondary"}
                                        onClick={() => router.push('/')}>
                                            <ImExit size={26} className='self-center justify-self-center' />
                                    </Button>
                                </div>
                            </div>
                        </div>    
                </div>
                <div className="row-span-1 grid grid-cols-5 gap-2">
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">L-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">L1-Lateral</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-md bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">D-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-lg bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">G-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                    <div className="border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                        <h1 className="row-span-1 text-center font-bold">D-Line</h1>
                        <div className="row-span-2 grid justify-center">
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 grid grid-rows-6 gap-2">
                <div className="row-span-5 border rounded-xl bg-slate-100/5 p-4">
                    <h1 className="row-span-1 text-center font-bold">District Stats</h1>
                    <div className='text-orange-500 text-center px-4 pt-8'>
                        Important information for each district.
                    </div>
                </div>
                <div className="row-span-1 border rounded-xl bg-slate-100/5 grid grid-rows-3 p-4">
                    <h1 className="row-span-1 text-center font-bold">Division Demand</h1>
                    <div className="row-span-2 grid grid-cols-2 -mt-2">
                        <div className='grid'>
                            <h1 className='font-medium text-center'>Carson</h1>
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                        </div>
                        <div className='grid'>
                            <h1 className='font-medium text-center'>Truckee</h1>
                            <h1 className="relative m-auto text-2xl text-orange-500 font-semibold text-center">
                                {measurementNumber({number: 0, precision: 2})}
                                <span className='absolute text-xs text-foreground/50'>CFS</span>
                            </h1>
                        </div>
                    </div>
                </div>
                
            </div>
            {/* <div 
                className={"absolute top-2 right-0 p-2 hover:top-4 hover:right-4 hover:bg-slate-600/25 hover:dark:bg-slate-100/25 hover:scale-150 hover:text-center hover:text-yellow-600 hover:dark:text-yellow-400 hover:pt-3 hover:pl-4 cursor-pointer transition-transform duration-300 rounded-md flex items-center justify-center"}
                onClick={() => {router.push('/');}}
            >
                <ImExit size={30} className='self-center justify-self-center' />
            </div> */}
            
        </div>
    );
};

export default CommandCenterPage;