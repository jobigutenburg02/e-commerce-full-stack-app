import { useEffect } from "react"
import CartItem from "./CartItem"
import Spinner from "../ui/Spinner"
import useCartData from "../../hooks/useCartData"
import CartSummary from "./CartSummary"

// CartPage component displays the user's shopping cart
// It handles display logic based on cart status and loading state
const CartPage = ({ setNumCartItems }) => {

  // useCartData is a custom hook that retrieves cart items, loading state, totals, and tax
  const { cartItems, setCartItems, cartTotal, setCartTotal, loading, tax } = useCartData()

  // Update the number of cart items in the parent state whenever cartItems changes
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setNumCartItems(totalItems);
    }
  }, [cartItems]);

  // Show a loading spinner while cart data is being fetched
  if (loading) {
    return <Spinner Loading={loading} />
  }

  // If cart is empty, show an informational message
  if (cartItems.length < 1) {
    return (
      <div className="alert alert-primary my-5" role="alert">
        The list is empty. You haven't added any item to your cart
      </div>
    )
  }

  return (
    <div className="container my-3 py-3" style={{ height: "80vh", overflow: "scroll" }}>
      <h5 className="mb-4">Shopping Cart</h5>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map(item => <CartItem key={item.id} item={item}
            cartItems={cartItems}
            setCartTotal={setCartTotal}
            setNumCartItems={setNumCartItems}
            setCartItems={setCartItems}
          />)}
        </div>
        
        <CartSummary cartTotal={cartTotal} tax={tax} />
      </div>
    </div>
  )
}

export default CartPage