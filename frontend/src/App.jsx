import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderReceipt from './pages/OrderReceipt'
import Orders from './pages/Orders'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="receipt" element={<OrderReceipt />} />
        <Route path="orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App