const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const DEMO_SESSION_ID = 'demo-user-session';

const checkout = async (req, res) => {
  try {
    const { name, email, shippingAddress } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const cart = await Cart.findOne({ sessionId: DEMO_SESSION_ID }).populate('items.productId');
    
    if (!cart) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const validItems = cart.items.filter(item => item.productId !== null);

    if (validItems.length === 0) {
      cart.items = [];
      await cart.save();
      return res.status(400).json({ error: 'Cart is empty or all items are invalid.' });
    }
    const cartItems = validItems.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.image
    }));

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderNumber = 'ORD-' + Date.now();
    
    const order = new Order({
      orderNumber,
      customer: { name, email },
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      shippingAddress: shippingAddress || {},
      status: 'confirmed'
    });

    await order.save();

    cart.items = [];
    cart.lastUpdated = new Date();
    await cart.save();

    res.json({
      receipt: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        items: order.items,
        total: order.total,
        customer: order.customer,
        shippingAddress: order.shippingAddress,
        timestamp: order.createdAt,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

module.exports = { checkout, getOrders, getOrderById, updateOrderStatus };