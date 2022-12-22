import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const value = auth?.roles?.find(role=> allowedRoles?.includes(role));
    const roles = auth?.roles;

    return(
        auth?.roles?.find(role=> allowedRoles?.includes(role))
        ? <Outlet/>
        : auth?.user
            ? <Navigate to="/unauthorized"/>
            : <Navigate to="/"/>
    );

    // return(
    //     auth?.user
    //     ? <Outlet/>
    //     : <Navigate to="/"/>
    // );
}

export default RequireAuth;