import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import cn from "classnames";
import {useAuthStore} from "../../store/useAuthStore.ts";
import {useEffect} from "react";

import PageLoader from "../page-loader/page-loader.tsx";
import {Toaster} from "react-hot-toast";




const Layout = () => {
    const{checkAuth, isCheckingAuth} = useAuthStore();


    useEffect(() => {
        if (isCheckingAuth) {
            checkAuth();
        }
    },[checkAuth, isCheckingAuth]);

    if (isCheckingAuth) {
        return <PageLoader />;
    }

    return (
        <div className={cn(styles.layout)}>

                <Outlet />


            <Toaster />
        </div>
    );
};

export default Layout;
