// app/demo/layout.tsx
import React from 'react';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex justify-center items-center z-auto">
      {children}
    </div>
  );
}