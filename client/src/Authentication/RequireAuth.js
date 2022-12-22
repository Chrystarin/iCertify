import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ([allowedRoles]) => {
    const {auth} = useAuth();
    const location = useLocation();

    return(
        auth?.roles?.find(role=> allowedRoles?.includes(role))
        ? <Outlet/>
        : auth?.user
            ? <Navigate to="/unauthorized"/>
            : <Navigate to="/"/>
    );
}

export default RequireAuth;