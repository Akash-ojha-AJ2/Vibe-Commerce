import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const navigate = useNavigate()

  return (
    <div className="cart-view">
      <h2>Your Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${cart.total}</h3>
            <button 
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart