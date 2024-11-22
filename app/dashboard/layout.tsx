import React from 'react';

const FullScreenLayout = ({ children }: { children: React.ReactNode}) => {



    return (
        <div className={"w-full h-screen overflow-hidden z-auto"}>
            {children}
        </div>
    );
};

export default FullScreenLayout;