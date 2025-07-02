import { useState, useEffect } from "react"
import api from "../api"

// Custom hook to fetch and manage cart data for the current user
function useCartData(){
    const cart_code = localStorage.getItem("cart_code")
    
    const [cartItems, setCartItems] = useState([]) 
    const [cartTotal, setCartTotal] = useState(0.00)
    const tax = 4.00
    const [loading, setLoading] = useState(false) 
  
    // Fetch cart data from the backend whenever cart_code changes
    useEffect(function(){
        setLoading(true)
        api.get(`get_cart?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data);
          setLoading(false)
          setCartItems(res.data.items) // Update cart items
          setCartTotal(res.data.sum_total) // Update cart total
        })
        .catch(err => {
          console.log(err.message)
          setLoading(false)
        })
    },[cart_code])

    // Return cart data and setters for use in components
    return {cartItems, setCartItems, cartTotal, setCartTotal, loading, tax}
}

export default useCartData