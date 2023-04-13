import React from 'react';
import {useNavigate} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import axios from '../../utils/axios';

function Logout(props) {
    const navigate = useNavigate();

    // Logouts User
    const Logout = async (e) => {
        try{
            await axios
            .post('auth/logout')
            .then((response) => {
                console.log(response)
            });
        } catch(err) {
            console.log(err)
        } finally{
            localStorage.clear()
            navigate("/");
            window.location.reload();
        }
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