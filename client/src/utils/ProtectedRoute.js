import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    //Gets locally stored user
    const user = localStorage.getItem("user");

    return(
        // Checks if user exists, if yes proceeds to page, if not proceeds to login
        user
        ? <Outlet/>
        : <Navigate to="/"/>
    );
}

export default ProtectedRoute;