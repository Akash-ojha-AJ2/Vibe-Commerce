import React, { useState, useEffect } from 'react'
import { fetchOrders } from '../lib/api'
import OrderCard from '../components/OrderCard'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true)
        const response = await fetchOrders()
        setOrders(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  if (loading) {
    return <h2>Loading orders...</h2>
  }

  return (
    <div className="orders-view">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="empty-orders">No orders found. Start shopping!</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders