import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { getStatusColor } from '../lib/utils'

function OrderReceipt() {
  const location = useLocation()
  const navigate = useNavigate()
  const receipt = location.state?.receipt 

  if (!receipt) {
    return (
      <div className="receipt-view">
        <div className="receipt-modal">
          <h2>Order Not Found</h2>
          <p>We couldn't find the receipt details.</p>
          <div className="receipt-actions">
            <Link to="/orders" className="view-orders-btn">View All Orders</Link>
            <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="receipt-view">
      <div className="receipt-modal">
        <h2>Order Confirmed! 🎉</h2>
        <div className="receipt-details">
          <p><strong>Order Number:</strong> {receipt.orderNumber}</p>
          <p><strong>Customer:</strong> {receipt.customer.name}</p>
          <p><strong>Email:</strong> {receipt.customer.email}</p>
          <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
          <p><strong>Status:</strong> 
            <span style={{color: getStatusColor(receipt.status), marginLeft: '0.5rem'}}>
              {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
            </span>
          </p>
          
          <div className="receipt-items">
            <h3>Items:</h3>
            {receipt.items.map(item => (
              <div key={item._id} className="receipt-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="receipt-total">
            <strong>Total: ${receipt.total}</strong>
          </div>
        </div>
        
        <div className="receipt-actions">
          <button 
            className="view-orders-btn"
            onClick={() => navigate('/orders')}
          >
            View All Orders
          </button>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderReceipt