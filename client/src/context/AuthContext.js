import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let contextData = {};
    // let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    // const navigate = useNavigate();

    // const ConnectWallet = async () => {
    //     // Check if metamask is installed
    //     if (typeof window.ethereum == undefined) {
    //         window.open('https://metamask.io/download/', '_blank');
    //         return;
    //     }
    //     try{
    //         // Requests Metamask
    //         await window.ethereum.request({ method: 'eth_requestAccounts' });
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);

    //         // Get signer of Metamask
    //         const signer = provider.getSigner();

    //         // Sign message
    //         const signature = await signer.signMessage('Test message')

    //         // Get address
    //         const address = await signer.getAddress()

    //         // console.log({address, signature})
    //         return {address, signature}
            
    //     } catch(err) {
    //         console.error(err.message);
    //     }
    // }

    // let loginUser = async ()=> {
    //     // Gets wallet info
    //     const wallet = await ConnectWallet()

    //     let response = await fetch('http://localhost:4000/auth/login', {
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         withCredentials: true,
    //         body: JSON.stringify({
    //             walletAddress: wallet.address,
    //             signature: wallet.signature
    //         })
    //     })
    //     let data = await response.json()

    //     if(response.status === 200){
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //         navigate('/')
    //     }else{
    //         alert('Something went wrong!')
    //     }
    // }


    // let logoutUser = () => {
    //     setAuthTokens(null)
    //     setUser(null)
    //     localStorage.removeItem('authTokens')
    //     navigate('/login')
    // }

    // let contextData = {
    //     user:user,
    //     authTokens:authTokens,
    //     setAuthTokens:setAuthTokens,
    //     setUser:setUser,
    //     loginUser:loginUser,
    //     logoutUser:logoutUser,
    // }

    // useEffect(()=> {
    //     if(authTokens){
    //         setUser(jwt_decode(authTokens.access))
    //     }
    //     setLoading(false)
    // }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
        // <p>Teset</p>
    )
}