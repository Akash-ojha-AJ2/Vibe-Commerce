import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const fetchProducts = () => axios.get(`${API_BASE}/products`)
export const fetchCart = () => axios.get(`${API_BASE}/cart`)
export const fetchOrders = () => axios.get(`${API_BASE}/orders`)

export const addToCart = (productId) => axios.post(`${API_BASE}/cart`, { productId })
export const removeFromCart = (itemId) => axios.delete(`${API_BASE}/cart/${itemId}`)
export const updateQuantity = (itemId, quantity) => axios.put(`${API_BASE}/cart/${itemId}`, { quantity })

export const postCheckout = (checkoutData) => axios.post(`${API_BASE}/checkout`, checkoutData)