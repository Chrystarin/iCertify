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
    return <>
        <Button
            id='Button'
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => {
                login()
            }}
        >
            Login Metamask
        </Button>
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
    </>
}

export default Login