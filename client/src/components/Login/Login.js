import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import SnackbarComponent from '../Snackbar/SnackbarComponent';
import {useAuth } from "../../utils/AuthContext";

function Login() {

    const { login } = useAuth();
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });

    function LoginClick() {
        try{
            login()
        }
        catch(err){
            console.log(err)
            alert("Error: " + err)
        }
        
    }

    return <>
        <Button
            id='Button'
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => {
                LoginClick();
            }}
        >
            Login Metamask
        </Button>
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
    </>
}

export default Login