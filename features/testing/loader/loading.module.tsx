import styles from '@/features/testing/loader/loading.module.css'

const LoadingAnimation = () => {
    return ( 
        <>
            <div className={styles.animationbg}>
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