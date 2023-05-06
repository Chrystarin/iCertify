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
                try {
                    login()
                } catch (error) {
                    // alert("Test");
                    // setOpenSnackBar(openSnackBar => ({
                    //     ...openSnackBar,
                    //     open:true,
                    //     type:'error',
                    //     note: "Error" + error,
                    //     action: ()=>{}
                    // }));
                }
            }}
        >
            Login Metamask
        </Button>
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
    </>
}

export default Login