import React from 'react';

const FullScreenLayout = ({ children }: { children: React.ReactNode}) => {



    return (
        <div className={"grid"}>
            <div className={"z-50"}>
                {children}
            </div>
        </div>
    );
};

export default FullScreenLayout;