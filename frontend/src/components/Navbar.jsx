import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cart } = useCart()

  return (
    <header className="header">
      <div className="container">
        <h1>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit', }}>
            Vibe Commerce
          </NavLink>
        </h1>
        <nav className="nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none', color: 'inherit', }}
          >
            Products
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none', color: 'inherit', }}
          >
            Cart ({cart.itemCount})
          </NavLink>
          <NavLink 
            to="/orders" 
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none', color: 'inherit', }}
          >
            My Orders
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar