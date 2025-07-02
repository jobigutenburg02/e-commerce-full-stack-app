import React from 'react'
import { BASE_URL } from '../../api'

// OrderItem displays a single item in the order summary during checkout.
const OrderItem = ({ cartitem }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex align-items-center">
        {/* Product Image */}
        <img
          src={`${BASE_URL}${cartitem.product.image}`}
          alt="Product"
          className="img-fluid"
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
        />
        {/* Product Info */}
        <div className="ms-3">
          <h6 className="mb-0">{cartitem.product.name}</h6>
          <small>{`Quantity: ${cartitem.quantity}`}</small>
        </div>
      </div>
      <h6>{`\u20b9${cartitem.product.price}`}</h6> {/* Product Price */}
    </div>
  )
}

export default OrderItem