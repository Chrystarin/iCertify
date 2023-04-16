import React, { useState, useContext, useEffect } from "react";
import axiosInstance from './axios';
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
            await axiosInstance
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
                    navigate(`${response.data.type}s/${response.data.walletAddress}`)
                    window.location.reload(true); 
                });
        } catch (error) {
        console.log(error);
        }
    };

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

    // Function to check if user is authorized to access the page
    const isAuth = (id) => {
        if (!user) {
            // User is not logged in, so they are not authorized
            return false;
        }

        if (user.walletAddress !== id) {
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
        catch(err){
            console.log(err)
        }
    };

    // Function to check if user is owns the document
    const isOwned = async (id) => {
        try {
            // await axiosInstance
			// 	.get(`documents`,{
            //         params: {
            //             code: id
            //         }
            //     })
			// 	.then((response) => {
			// 		console.log(response.data)
            //         let data = response.data
            //         console.log(data.some((obj) => obj['walletAddress'] === user.walletAddress))
			// 	});
            return true;
        } catch (error) {
        console.log(error);
        }
    };

    const value = { user, login, logout, isAuth, isJoined, isOwned };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };