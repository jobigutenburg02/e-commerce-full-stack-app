import React from 'react'
import OrderItem from './OrderItem'
import styles from "./OrderSummary.module.css"

// OrderSummary lists all items in the order and shows the total
const OrderSummary = ({ cartItems, cartTotal, tax }) => {
  // Calculate the final total (cart + tax)
  const total = (parseFloat(cartTotal) + parseFloat(tax)).toFixed(2)
  return (
    <div className="col-md-8">
      <div className={`card mb-4 ${styles.card}`}>
        <div className="card-header" style={{ backgroundColor: '#6050DC', color: "white" }}>
          <h5>Cart Summary</h5>
        </div>
        <div className="card-body">
          <div className="px-3" style={{ height: "300px", overflow: "auto" }}>
            {/* List each item in the cart */}
            {cartItems.map(cartitem => <OrderItem key={cartitem.id} cartitem={cartitem} />)}
          </div>
          <hr />
          {/* Order total */}
          <div className="d-flex justify-content-between">
            <h6>Total</h6>
            <h6>{`\u20b9${total}`}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary