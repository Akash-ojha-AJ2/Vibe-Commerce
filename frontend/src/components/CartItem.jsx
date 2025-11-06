import React from 'react'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.name} />
      <div className="item-details">
        <h3>{item.product.name}</h3>
        <p className="price">${item.product.price}</p>
      </div>
      <div className="quantity-controls">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}  
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      <button 
        className="remove-btn"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  )
}

export default CartItem