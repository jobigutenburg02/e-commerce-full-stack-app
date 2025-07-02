import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

export const AuthContext = createContext(false) // context to provide authentication state throughout the app

export function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false) 
    const [username, setUsername] = useState("")

    // Function to check if the user is authenticated based on token validity
    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now()/1000
            // If token is not expired, set as authenticated
            if(expiry_date >= current_time){
                setIsAuthenticated(true)
            }
        }
    }

    // Function to fetch the username from the backend
    function get_username(){
        api.get("get_username")
        .then(res => {
            console.log(res.data)
            setUsername(res.data.username)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // On mount, check authentication and fetch username
    useEffect(function() {
        handleAuth()
        get_username()
    }, [])

    const authValue = {isAuthenticated, username, setIsAuthenticated, get_username}

    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}