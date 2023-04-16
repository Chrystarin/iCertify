import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

import {useAuth } from "../../utils/AuthContext";

function Logout() {
    const { logout } = useAuth();

    // Logouts User
    const Logout = async () => {
        logout()
    }
    
    return (
        <Button 
            variant=''
            startIcon={<LogoutIcon/>} 
            onClick={() => Logout()}
        >
            Logout
        </Button>
    )
}

export default Logout