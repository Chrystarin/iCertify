import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';

import {useAuth } from "../../utils/AuthContext";

function Login() {

    const { login } = useAuth();

    return (
        <Button
            id='Button'
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => login()}
        >
            Login Metamask
        </Button>
    )
}

export default Login