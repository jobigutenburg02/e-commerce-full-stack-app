import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/home/HomePage"
import NotFoundPage from "./components/ui/NotFoundPage"
import ProductPage from "./components/product/ProductPage"
import { useEffect, useState } from "react"
import api from "./api"
import CartPage from "./components/cart/CartPage"
import CheckoutPage from "./components/checkout/CheckoutPage"
import LoginPage from "./components/user/LoginPage"
import RegisterPage from "./components/user/RegisterPage"
import ProtectedRoute from "./components/ui/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import UserProfilePage from "./components/user/UserProfilePage"
import PaymentStatusPage from "./components/payment/PaymentStatusPage"

// App component sets up the main structure and routing for the e-commerce website.
const App = () => {
  const [numCartItems, setNumCartItems] = useState(0); // State to track the number of items in the cart
  const cart_code = localStorage.getItem("cart_code") // Retrieve cart code from local storage
  
  // Fetch the number of items in the cart when cart_code changes
  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res => {
        console.log(res.data)
        setNumCartItems(res.data.total_quantity)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  },[cart_code])

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />}/>
            <Route path="products/:slug" element={<ProductPage setNumCartItems={setNumCartItems} />} />
            <Route path="cart" element={<CartPage setNumCartItems={setNumCartItems} />} />
            <Route path="checkout" element={
              <ProtectedRoute>
                <CheckoutPage setNumCartItems={setNumCartItems} /> 
              </ProtectedRoute>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="payment-status" element={<PaymentStatusPage setNumCartItems={setNumCartItems} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App