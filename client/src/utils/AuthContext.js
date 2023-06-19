import React, { useState, useContext, useEffect, createContext } from "react";
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';

import axiosInstance from './axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
    // Constants Declaration
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    let globalWallet = {}
    
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    const baseUrl = process.env.REACT_APP_API_URL
    const RPC = process.env.REACT_APP_RPC
    
    // Executes onLoad
    useEffect(() => {
        // Check if user is already logged in on first mount
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    // Login Function
    const login = async () => {

        try {
            // Gets wallet info
            const wallet = await ConnectWallet('Connect your wallet to iCertify')
            globalWallet = wallet;

            await axiosInstance
                .post(
                    'auth/login',
                    JSON.stringify({
                        walletAddress: wallet.address,
                        signature: wallet.signature
                    })
                )
                .then((response) => {
                    setUser(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    navigate(`${response.data.type}s/${response.data.walletAddress}`)
                    window.location.reload(true); 
                });
        } catch (error) {
            alert(error.response.data.message)
        }
    };

    // Logout Function
    const logout = async () => {
        try{
            await axiosInstance
            .post('auth/logout')
            .then((response) => {
                console.log(response)
            });
        } catch(err) {
            console.log(err)
        } finally{
            setUser(null)
            localStorage.clear()
            navigate("/");
            window.location.reload(true); 
        }
    };

    // Register Function
    const register = async ({userType, memberForm, institutionForm }) => {
        // Gets wallet info
        const wallet = await ConnectWallet('Connect your wallet to iCertify')
        globalWallet = wallet;

        try {
            // Checks selected user type then registers user
            switch(userType){
                case 'user':
                    // Registers Member
                    await axiosInstance.post(
                        `auth/register`,
                        JSON.stringify({ 
                            userType: userType,
                            walletAddress: wallet.address, 
                            email: memberForm.email,
                            details: {
                                firstName: memberForm.firstName,
                                middleName: memberForm.middleName,
                                lastName: memberForm.lastName,
                                birthDate: memberForm.birthDate
                            }
                        })
                    )
                    .then((response)=>{
                        const login = async () => {
                            try {
                                await axiosInstance
                                    .post(
                                        'auth/login',
                                        JSON.stringify({
                                            walletAddress: wallet.address,
                                            signature: wallet.signature
                                        })
                                    )
                                    .then((response) => {
                                        setUser(response.data)
                                        localStorage.setItem('user', JSON.stringify(response.data))
                                        navigate(`${response.data.type}s/${response.data.walletAddress}`)
                                        window.location.reload(true); 
                                    });
                            } catch (error) {
                                alert(error.response.data.message);
                            }
                        };
                        login()
                    })
                    break;
                case 'institution':

                    // Contract Transaction
                    const contract = new ethers.Contract(contractAddress, await fetchContract(), wallet.signer);
                    const txHash = await contract.registerInstitution();
                    
                    // Registers Institution
                    await axiosInstance.post(
                        `auth/register`,
                        JSON.stringify({ 
                            userType: userType,
                            walletAddress: wallet.address, 
                            email: institutionForm.email,
                            details: {
                                name: institutionForm.name,
                                type: institutionForm.type,
                                txHash: txHash.hash
                            }
                        })
                    )
                    .then((response)=>{
                        alert("Processing registration. Wait for transaction to complete.")
                        navigate('/')
                    })
                    break;
            }
        } catch (error) {      
            alert(error.response.data.message)
        }
    }

    // Fetch Smart Contract Function
    const fetchContract = async () => {
        try {
            const response = await axiosInstance.get(`abi`);
            return response.data;
        } 
        catch (error) {
            alert(error.response.data.message)
        }
    }

    const getContract = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(RPC);
            const contract = new ethers.Contract(contractAddress,  await fetchContract(), provider);
            return contract;
        } 
        catch (error) {
            alert(error.response.data.message)
        }
    }

    // Connect User's Wallet
    const ConnectWallet = async (message) => {
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
            const signature = await signer.signMessage((message ? message : 'Welcome to iCertify!'))

            // Get address
            const address = await signer.getAddress()

            return {provider, signer, signature, address}
            
        } catch(error) {
            alert(error.response.data.message)
        }
    }
    
    // Check if User is Logged in
    const isLoggedIn = () => {
        if (!user) {
            // User is not logged in
            return false;
        }
        // User is logged in
        return true;
    }

    // Function to check if user is authorized to access the page
    const isAuth = (id) => {
        if (!(JSON.parse(localStorage.getItem("user")))) {
            // User is not logged in, so they are not authorized
            return false;
        }

        if ((JSON.parse(localStorage.getItem("user"))).walletAddress !== id) {
            // User is logged in, but they are not authorized
            return false;
        }

        // User is logged in and authorized
        return true;
    };

    // Function to check if user is joined to an institution
    const isJoined = (list) => {
        try{
            // const address = user.walletAddress;
            function containsValue(obj, val) {
                for (let key in obj) {
                    if (typeof obj[key] === 'object') {
                    if (containsValue(obj[key], val)) {
                        return true;
                    }
                    } else if (obj[key] === val) {
                    return true;
                    }
                }
                return false;
            }
            return containsValue(list.members, JSON.parse(localStorage.getItem("user")).walletAddress);
        }
        catch(error){
            alert(error.response.data.message)
        }
    };

    const value = { 
        user, 
        contractAddress,
        globalWallet,
        baseUrl,
        login, 
        logout, 
        register, 
        fetchContract, 
        getContract,
        ConnectWallet, 
        isLoggedIn, 
        isAuth, 
        isJoined
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };