
import styles from '@/features/loader/loading.module.css'
import React from 'react';

interface fadeOutProps {
    fadeOut?: boolean;
}

const LoadingAnimation: React.FC<fadeOutProps> = ({fadeOut}) => {
    return ( 
        <>
            <div className={`${styles.loader} ${fadeOut ? styles['fade-out'] : ''}`}>
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