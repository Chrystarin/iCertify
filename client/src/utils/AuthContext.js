import React, { useState, useContext, useEffect } from "react";
import axios from './axios';
import {useNavigate} from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is already logged in on first mount
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const login = async (walletAddress, signature) => {
        try {
            await axios
                .post(
                    'auth/login',
                    JSON.stringify({
                        walletAddress: walletAddress,
                        signature: signature
                    })
                )
                .then((response) => {
                    setUser(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    console.log(response.data)
                    navigate(`${response.data.type}s/${response.data.walletAddress}`)
                    window.location.reload(true); 
                });
        } catch (error) {
        console.log(error);
        }
    };

    const logout = async () => {
        try{
            await axios
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

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };