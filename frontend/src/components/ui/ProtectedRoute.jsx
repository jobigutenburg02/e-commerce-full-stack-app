import { jwtDecode } from 'jwt-decode'
import Spinner from './Spinner'
import api from '../../api'
import { useState, useEffect, Children } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// This component restricts access to routes based on authentication
const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(null)
    const location = useLocation() // Get current location for redirecting after login

    // Run authentication check on mount
    useEffect(function(){
        auth().catch(() => setIsAuthorized(false))
    },[])

    // Function to refresh access token using refresh token
    async function refreshToken(){
        const refreshToken = localStorage.getItem("refresh")
        try{
            const res = await api.post("/token/refresh/",{
                refresh:refreshToken,
            });
            if(res.status === 200){ // If refresh successful
                localStorage.setItem("access", res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }
        catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // Function to check authentication and token validity
    async function auth(){
        const token = localStorage.getItem("access")
        if(!token){
            setIsAuthorized(false)
            return;
        }

        // Decode token to check expiry
        const decoded = jwtDecode(token)
        const expiry_date = decoded.exp
        const current_time = Date.now()/1000

        // If token expired, try to refresh
        if(current_time > expiry_date){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }
    }
    
    // Show spinner while checking authorization
    if(isAuthorized === null){
        return <Spinner />
    }

    // Render children if authorized, otherwise redirect to login
    return (
        isAuthorized ? children : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default ProtectedRoute