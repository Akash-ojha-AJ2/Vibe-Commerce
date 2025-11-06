const Cart = require('../models/Cart');
const Product = require('../models/Product');

const DEMO_SESSION_ID = 'demo-user-session';


const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: DEMO_SESSION_ID }).populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({
        sessionId: DEMO_SESSION_ID,
        items: []
      });
      
      return res.json({
        items: [],
        total: 0,
        itemCount: 0
      });
    }
    const validItems = cart.items.filter(item => item.productId !== null);
   
    const cartWithDetails = validItems.map(item => ({
      id: item._id,
      productId: item.productId._id, 
      quantity: item.quantity,
      product: item.productId     
    }));

    const total = cartWithDetails.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    res.json({
      items: cartWithDetails,
      total: parseFloat(total.toFixed(2)),
      itemCount: cartWithDetails.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ sessionId: DEMO_SESSION_ID });
    
    if (!cart) {
      cart = await Cart.create({
        sessionId: DEMO_SESSION_ID,
        items: []
      });
    }

    const existingItem = cart.items.find(item => 
      item.productId.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.items.push({
        productId: productId,
        quantity: parseInt(quantity)
      });
    }

    cart.lastUpdated = new Date();
    await cart.save();

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    
    const cart = await Cart.findOne({ sessionId: DEMO_SESSION_ID });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    cart.lastUpdated = new Date();
    await cart.save();

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ sessionId: DEMO_SESSION_ID });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    } else {
      item.quantity = parseInt(quantity);
    }

    cart.lastUpdated = new Date();
    await cart.save();

    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: DEMO_SESSION_ID });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    cart.lastUpdated = new Date();
    await cart.save();

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem, clearCart };