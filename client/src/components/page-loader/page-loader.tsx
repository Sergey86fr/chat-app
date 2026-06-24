import {Loader} from "lucide-react";
import styles from "./page-loader.module.css"
import cn from "classnames"

const PageLoader = () => {
    return (
        <div className={cn(styles.pageLoader)}>
            <Loader size={48} className={cn(styles.loader)} />
        </div>

    );
};

export default PageLoader;
