import Header from "./Header"
import CardContainer from "./CardContainer"
import api from "../../api"
import { useState, useEffect } from "react"
import PlaceHolderContainer from "../ui/PlaceHolderContainer"
import Error from "../ui/Error"
import { randomValue } from "../../GenerateCartCode"

// HomePage is the main landing page for the app.
// It loads products from the API and manages loading and error states.
const HomePage = () => {

  // State variables for products, loading, and error
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // On initial mount, ensure a cart code exists in localStorage
  useEffect(function () {
    if (localStorage.getItem("cart_code") === null) {
      localStorage.setItem("cart_code", randomValue)
    }
  }, [])

  // Fetch product data from the API when the component mounts
  useEffect(function () {
    setLoading(true)
    api.get("products")
      .then(res => {
        console.log(res.data)
        setProducts(res.data)
        setLoading(false)
        setError("")
      })
      .catch(err => {
        console.log(err.message)
        setLoading(false)
        setError(err.message)
      })
  }, [])

  return (
    <>
      <Header />
      {error && <Error error={error} />} {/* Show error message if there's an error */}
      {loading && <PlaceHolderContainer />} {/* Show loading placeholders while fetching */}
      {loading || error !== "" || <CardContainer products={products} />} {/* Show product cards if not loading and no error */}
    </>
  )
}

export default HomePage