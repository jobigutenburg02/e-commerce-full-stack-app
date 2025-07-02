import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import api from '../../api';

/**
 * PaymentStatusPage handles payment verification callback for both PayPal and Flutterwave.
 * It parses query parameters from the URL, triggers appropriate API callbacks,
 * updates payment status messages, and empties the cart on success.
 */
const PaymentStatusPage = ({ setNumCartItems }) => {

    // UI state for main and sub status messages
    const [statusMessage, setStatusMessage] = useState('Verifying your payment...');
    const [statusSubMessage, setStatusSubMessage] = useState('Wait a moment, your payment is being verified!')
    const location = useLocation();

    // Handle PayPal callback: expects paymentId, PayerID, and ref in the query params
    useEffect(function () {
        const queryParams = new URLSearchParams(location.search);
        const paymentId = queryParams.get('paymentId')
        const payerID = queryParams.get('PayerID')
        const ref = queryParams.get('ref')

        if (paymentId && payerID && ref) {
            api.post(`paypal_payment_callback/?paymentId=${paymentId}&payerID=${payerID}&ref=${ref}`)
                .then(res => {
                    setStatusMessage(res.data.message)
                    setStatusSubMessage(res.data.subMessage)
                    localStorage.removeItem("cart_code")
                    setNumCartItems(0) // empty the cart
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [])

    // Handle Flutterwave callback: expects status, tx_ref, and transaction_id in the query params
    useEffect(function () {
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get('status')
        const txRef = queryParams.get('tx_ref')
        const transactionId = queryParams.get('transaction_id')

        if (status && txRef && transactionId) {
            api.post(`payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`)
                .then(res => {
                    setStatusMessage(res.data.message)
                    setStatusSubMessage(res.data.subMessage)
                    localStorage.removeItem("cart_code")
                    setNumCartItems(0) // empty the cart
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }, [])

    return (
        <header className="py-5" style={{ backgroundColor: "#6050DC" }}>
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h2 className="display-4 fw-bold">{statusMessage}</h2>
                    <p className="lead fw-normal text-white-75 mb-4">{statusSubMessage}</p>
                    <span>
                        <Link to='/profile' className="btn btn-light btn-lg px-4 py-2 mx-3">View Order Details</Link>
                        <Link to='/' className="btn btn-light btn-lg px-4 py-2">Continue Shopping</Link>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default PaymentStatusPage