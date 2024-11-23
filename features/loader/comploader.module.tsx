// @/features/loader/componentLoader.tsx
import { cn } from '@/lib/utils';
import styles from '@/features/loader/comploader.module.css'
import { Skeleton } from '@/components/ui/skeleton';

interface ComponentLoaderProps {
    className?: string;
}

const ComponentLoader = ({className}: ComponentLoaderProps) => {
    return (
        <Skeleton>
            <div className={cn( 
                "bg-gradient-to-b from-zinc-700/10 to-neutral-700/70 flex justify-center", className
            )}>
                <div className={cn(`${styles.wrapper} mt-24`)}>
                    <div className={cn(`${styles.wave_1} ${styles.outerShadow}`)}>
                        <div className={cn(`${styles.innerShadow} ${styles.alignCenter}`)}></div>
                    </div>
                    <div className={cn(`${styles.wave_2} ${styles.outerShadow} ${styles.alignCenter}`)}>
                        <div className={cn(`${styles.innerShadow} ${styles.alignCenter}`)}></div>
                    </div>
                    <div className={cn(`${styles.wave_3} ${styles.outerShadow} ${styles.alignCenter}`)}>
                        <div className={cn(`${styles.innerShadow} ${styles.alignCenter}`)}></div>
                    </div>
                    <div className={cn(`${styles.drop} ${styles.alignCenter}`)}></div>
                </div>
            </div>
        </Skeleton>
    );
};

export default ComponentLoader;