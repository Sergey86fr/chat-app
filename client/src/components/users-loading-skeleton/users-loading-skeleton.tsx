import cn from 'classnames'
import styles from "./users-loading-skeleton.module.css"

const UsersLoadingSkeleton = () => {

    return (
        <div className={cn(styles.skeletonsWrapper)} >
            {[1,2,3].map((item) => (
                    <div className={cn(styles.userSkeleton)} key={item} >
                        <div className={cn(styles.avatar)} ></div>
                        <div className={cn(styles.info)} >
                            <div className={cn(styles.infoPrimary)} ></div>
                            <div className={cn(styles.infoSecondary)} ></div>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default UsersLoadingSkeleton;
