// app/demo/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/features/loader/loading.module'; // Assuming this is your loader component

export default function DemoPage() {
  const [demoloading, setDemoLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setDemoLoading(true);
    setTimeout(() => {
      // After 3 seconds, navigate to the home page
      router.push('/');
      setDemoLoading(false);
    }, 8000);
  };

  if (demoloading) {
    return (
        <div className='h-screen w-screen z-50'>
        <LoadingAnimation classProp='z-50' />
        </div>); // Show demoloading animation when demoloading is true
  }

  // Otherwise, show the clickable title
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-400 dark:bg-gray-800 z-50">
      <h1 
        className="text-4xl font-bold text-center cursor-pointer"
        onClick={handleClick}
      >
        WELCOME
      </h1>
    </div>
  );
}