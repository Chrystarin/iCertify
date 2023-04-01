import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Button from '@mui/material/Button';
import axios from '../../utils/axios';

function Login(props) {
    // const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();

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

        // Gets wallet info
        const wallet = await ConnectWallet()

        try{
            // Login with the address and signature
            await axios
            .post(
                'auth/login',
                JSON.stringify({
                    walletAddress: wallet.address,
                    signature: wallet.signature
                })
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data))
                const { message, type, accessToken } = response.data
                // if (response.data.type == 'user') navigate(`user/${wallet.address}`)
                // if (response.data.type == 'institution') navigate(`institution/${wallet.address}`) 
                // setAuth({ wallet.address, roles, accessToken });
                navigate(`users/${wallet.address}`)
                window.location.reload(true); 
            });
        } catch(err) {
            alert(err)
        }
       
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