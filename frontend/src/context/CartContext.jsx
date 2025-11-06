import React, { createContext, useState, useEffect, useContext } from 'react'
import * as api from '../lib/api' 

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 })

  const refreshCart = async () => {
    try {
      const response = await api.fetchCart()
      setCart(response.data)
    } catch (error) {
      console.error('Error fetching cart:', error)
      setCart({ items: [], total: 0, itemCount: 0 }) 
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  const addToCart = async (productId) => {
    try {
      await api.addToCart(productId)
      await refreshCart()
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      await api.removeFromCart(itemId)
      await refreshCart()
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }



  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId)
      } else {
        await api.updateQuantity(itemId, quantity) 
        await refreshCart()
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const value = { cart, refreshCart, addToCart, removeFromCart, updateQuantity, }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}