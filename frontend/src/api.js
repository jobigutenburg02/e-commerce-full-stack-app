import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Set base URL for API requests
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000";

// Create an Axios instance with base URL
const api = axios.create({
    baseURL: BASE_URL
})

// Add a request interceptor to include the access token in headers if valid
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now()/1000
            // Only add Authorization header if token is not expired
            if(expiry_date > current_time){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },

    // Handle request errors
    (error) => {
        return Promise.reject(error)
    }
)

export default api