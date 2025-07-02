import React, { useEffect } from 'react'
import OrderSummary from './OrderSummary'
import PaymentSection from './PaymentSection'
import useCartData from '../../hooks/useCartData'

// CheckoutPage is the main page for order checkout.
// It displays the order summary and payment options side by side.
const CheckoutPage = ({ setNumCartItems }) => {

  // Get cart data via custom hook
  const { cartItems, cartTotal, tax } = useCartData()

  // Update the total number of cart items in the parent state when cart changes
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
      setNumCartItems(totalItems);
    }
  }, [cartItems]);

  return (
    <div style={{ minHeight: "80vh" }}>
      <div className="container my-3">
        <div className="row">
          <OrderSummary cartItems={cartItems} cartTotal={cartTotal} tax={tax} />
          <PaymentSection />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage