import React from 'react'
import { getStatusColor } from '../lib/utils'

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <h3>Order #{order.orderNumber}</h3>
          <p className="order-date">
            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="order-status">
          <span 
            className="status-badge"
            style={{backgroundColor: getStatusColor(order.status)}}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="order-details">
        <div className="order-customer">
          <p><strong>Customer:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
        </div>
        
        <div className="order-items">
          <h4>Items ({order.items.length}):</h4>
          {order.items.map(item => (
            <div key={item._id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="order-item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="order-total">
          <strong>Total: ${order.total}</strong>
        </div>
      </div>
    </div>
  )
}

export default OrderCard