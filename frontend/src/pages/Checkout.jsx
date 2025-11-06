import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { postCheckout } from '../lib/api'

function Checkout() {
  const { cart, refreshCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [checkoutData, setCheckoutData] = useState({ 
    name: '', 
    email: '',
    shippingAddress: {
      street: '', city: '', state: '', zipCode: '', country: ''
    }
  })

  const handleCustomerChange = (e) => {
    const { id, value } = e.target
    setCheckoutData(prev => ({ ...prev, [id]: value }))
  }

  const handleAddressChange = (e) => {
    const { id, value } = e.target
    setCheckoutData(prev => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [id]: value }
    }))
  }



  const handleCheckout = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await postCheckout(checkoutData)
      await refreshCart() 
      
      navigate('/receipt', { state: { receipt: response.data.receipt } })

    } catch (error) {
      console.error('Error during checkout:', error)

      if (error.response && error.response.data && error.response.data.error) {
        alert(`Checkout failed: ${error.response.data.error}`)
      } else {
        alert('Checkout failed. Please try again.')
      }

    } finally {
      setLoading(false)
    }
  }

  if (cart.items.length === 0 && !loading) {
    return (
      <div className="checkout-view">
        <h2>Checkout</h2>
        <p className="empty-cart">Your cart is empty. Add products to checkout.</p>
      </div>
    )
  }

  return (
    <div className="checkout-view">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout} className="checkout-form">
        <div className="form-section">
          <h3>Customer Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" value={checkoutData.name} onChange={handleCustomerChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" value={checkoutData.email} onChange={handleCustomerChange} required />
          </div>
        </div>

        <div className="form-section">
          <h3>Shipping Address (Optional)</h3>
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input type="text" id="street" value={checkoutData.shippingAddress.street} onChange={handleAddressChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" value={checkoutData.shippingAddress.city} onChange={handleAddressChange} />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input type="text" id="state" value={checkoutData.shippingAddress.state} onChange={handleAddressChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input type="text" id="zipCode" value={checkoutData.shippingAddress.zipCode} onChange={handleAddressChange} />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" value={checkoutData.shippingAddress.country} onChange={handleAddressChange} />
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.items.map(item => (
            <div key={item.id} className="checkout-item">
              <span>{item.product.name} x {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-total">
            <strong>Total: ${cart.total}</strong>
          </div>
        </div>

        <div className="checkout-actions">
          <button type="button" className="back-btn" onClick={() => navigate('/cart')}>
            Back to Cart
          </button>
          <button type="submit" className="confirm-checkout-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout