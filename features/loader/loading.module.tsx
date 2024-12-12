
import styles from '@/features/loader/loading.module.css'
import React from 'react';
import { cn } from '@/lib/utils/GeneralUtils';

interface fadeOutProps {
    fadeOut?: boolean;
    classProp?: string;
}

const LoadingAnimation: React.FC<fadeOutProps> = ({fadeOut, classProp}) => {
    return ( 
        <>
            <div className={cn(`${styles.loader} ${fadeOut ? styles['fade-out'] : ''}`, classProp)}>
                <div className={styles.logo}>
                    Water<span className={styles.altlogo}>MARK</span>
                </div>
                <div className={styles.dropcontainer}>
                    <div className={styles.drop}></div>
                </div>
            </div>
        </>
     );
}
 
export default LoadingAnimation;