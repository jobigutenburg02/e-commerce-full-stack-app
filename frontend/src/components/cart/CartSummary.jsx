import { Link } from "react-router-dom"

// CartSummary component displays the subtotal, tax, and total for the cart
// It also provides a button to proceed to the checkout page
const CartSummary = ({ cartTotal, tax }) => {

  // Calculate formatted values for subtotal, tax, and total
  const subTotal = cartTotal.toFixed(2)
  const cartTax = tax.toFixed(2)
  const total = (parseFloat(subTotal) + parseFloat(cartTax)).toFixed(2)

  return (
    <div className="col-md-4 align-self-start">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cart Summary</h5>
          <hr />
          {/* Subtotal */}
          <div className="d-flex justify-content-between">
            <span>Subtotal :</span>
            <span>{`\u20b9${subTotal}`}</span>
          </div>
          {/* Tax */}
          <div className="d-flex justify-content-between">
            <span>Tax:</span>
            <span>{`\u20b9${cartTax}`}</span>
          </div>
          {/* Total */}
          <div className="d-flex justify-content-between mb-3">
            <span>Total :</span>
            <strong>{`\u20b9${total}`}</strong>
          </div>
          {/* Proceed to checkout */}
          <Link to="/checkout">
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartSummary