import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../lib/api'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

function Products() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    loadProducts()
  }, [])

  return (
    <div className="products-view">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  )
}

export default Products