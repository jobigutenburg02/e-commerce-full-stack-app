import React from 'react'
import styles from "./PaymentSection.module.css"
import { useState } from 'react'
import api from '../../api'

// PaymentSection provides buttons to initiate payment using PayPal or Flutterwave
const PaymentSection = () => {

  const cart_code = localStorage.getItem("cart_code")
  const [loading, setLoading] = useState(false)

  // Initiate Flutterwave payment, redirect user to payment link from backend
  function makePayment() {
    api.post(`initiate_payment/`, { cart_code })
      .then(res => {
        console.log(res.data)
        window.location.href = res.data.data.link
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  // Initiate PayPal payment, redirect user to PayPal approval URL
  function paypalPayment() {
    setLoading(true)
    api.post(`initiate_paypal_payment/`, { cart_code })
      .then(res => {
        console.log(res.data)
        setLoading(false)
        if (res.data.approval_url) {
          window.location.href = res.data.approval_url
        }
      })
      .catch(err => {
        console.error('Error initiating payment: ', err.message);
        setLoading(false)
      })
  }

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div className="card-header" style={{ backgroundColor: '#6050DC', color: "white" }}>
          <h5>Payment Options</h5>
        </div>
        <div className="card-body">
          {/* PayPal Button */}
          <button className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`} onClick={paypalPayment} id="paypal-button">
            <i className="bi bi-paypal"></i> Pay with PayPal
          </button>

          {/* Flutterwave Button */}
          <button className={`btn btn-warning w-100 ${styles.flutterwaveButton}`} onClick={makePayment} id="flutterwave-button">
            <i className="bi bi-credit-card"></i> Pay with Flutterwave
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSection