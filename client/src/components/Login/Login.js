import React from 'react';
import {ethers} from 'ethers';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';

import {useAuth } from "../../utils/AuthContext";

function Login() {

    const { login } = useAuth();

    const ConnectWallet = async () => {
        // Check if metamask is installed
        if (typeof window.ethereum == undefined) {
            window.open('https://metamask.io/download/', '_blank');
            return;
        }
        try{
            // Requests Metamask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Get signer of Metamask
            const signer = provider.getSigner();

            // Sign message
            const signature = await signer.signMessage('Test message')

            // Get address
            const address = await signer.getAddress()

            // console.log({address, signature})
            return {address, signature}
            
        } catch(err) {
            console.error(err.message);
        }
    }

    // Logins User
    const LoginUser = async (e) => {
        const wallet = await ConnectWallet()
        login(wallet.address, wallet.signature);
       
    }
    return (
        
        <Button
            id='Button'
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => LoginUser()}
        >
            Login Metamask
        </Button>
    )
}

export default Login