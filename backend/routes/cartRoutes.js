const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartItem, clearCart } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeFromCart);
router.delete('/', clearCart);

module.exports = router;

