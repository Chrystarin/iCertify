import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({allowedRole}) => {
    //Gets locally stored user
    const user = localStorage.getItem("user");
    let type = {}
    if(user){
        type = JSON.parse(localStorage.getItem("user")).type;
    }

    return(
        // Checks if user exists, if yes proceeds to page, if not proceeds to login
        user
            ? allowedRole 
                ? type === allowedRole
                    ? <Outlet/>
                    : <Navigate to="/unauthorized"/>
                : <Outlet/>   
            : <Navigate to="/"/>
    );
}

export default ProtectedRoute;