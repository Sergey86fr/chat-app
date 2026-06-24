import {useAuthStore} from "../../store/useAuthStore.ts";
import {Outlet, Navigate} from "react-router-dom";



const ProtectedRoute = () => {
    const{authUser} = useAuthStore();


    return authUser ? <Outlet />: <Navigate to="/login" replace />
};

export default ProtectedRoute;
