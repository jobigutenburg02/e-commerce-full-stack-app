import { BASE_URL } from "../../api"
import { useState } from "react"
import api from "../../api"
import { toast } from "react-toastify"

// CartItem component represents a single item in the shopping cart.
// It handles updating quantity and removing the item from the cart.
const CartItem = ({item, cartItems, setCartTotal, setNumCartItems, setCartItems }) => {

  const [quantity, setQuantity] = useState(item.quantity)
  const [loading, setLoading] = useState(false)

  const itemData = { quantity: quantity, item_id: item.id } // used in updating cart item quantity
  const itemID = { item_id: item.id } // used in deleting cart item

  // Function to delete cart item
  function deleteCartItem() {
    const confirmDelete = window.confirm("Are you sure you want to delete this cart item?")
    if (confirmDelete) {
      api.post("delete_cartitem/", itemID)
        .then(res => {
          console.log(res.data)
          toast.success("Cart item deleted successfully")
          // Remove the item from the cart in the UI
          setCartItems(cartItems.filter(cartitem => (cartitem.id != item.id)))
          // Update the total cart value
          setCartTotal(cartItems.filter(cartitem => (cartitem.id != item.id))
            .reduce((acc, curr) => acc + curr.total, 0))
          // Update the number of items in the cart
          setNumCartItems(cartItems.filter(cartitem => (cartitem.id != item.id))
            .reduce((acc, curr) => acc + curr.quantity, 0))
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  // Function to update quantity of cart item
  function updateCartItem() {
    setLoading(true)
    api.patch("update_quantity/", itemData)
      .then(res => {
        console.log(res.data)
        setLoading(false)
        toast.success("Cart item updated successfully")
        // Update cart totals and quantities after successful update
        setCartTotal(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data : cartItem)
          .reduce((acc, curr) => acc + curr.total, 0))
        // Update the number of items in the cart
        setNumCartItems(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data : cartItem)
          .reduce((acc, curr) => acc + curr.quantity, 0))
      })
      .catch(err => {
        console.log(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="col-md-12">
      {/* Cart Item Display */}
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{ backgroundColor: "#f8f9fa", borderRadius: '8px' }}
      >
        {/* Product Image */}
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt="Product Image"
          className="img-fluid"
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
        />
        {/* Product Info */}
        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="mb-0 text-muted">{`\u20b9${item.product.price}`}</p>
        </div>
        {/* Quantity and Update/Remove Buttons */}
        <div className="d-flex align-items-center">
          <input
            type="number"
            min="1"
            className="form-control me-3"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: '70px' }}
          />
          <button
            className="btn btn-sm mx-2"
            onClick={updateCartItem}
            style={{ backgroundColor: "#4b3bcb", color: "white" }} disabled={loading}>
            {loading ? "Updating" : "Update"}
          </button>
          <button className="btn btn-danger btn-sm" onClick={deleteCartItem}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem