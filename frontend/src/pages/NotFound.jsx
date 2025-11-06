import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="continue-shopping-btn" style={{ textDecoration: 'none' }}>
        Go to Homepage
      </Link>
    </div>
  )
}

export default NotFound