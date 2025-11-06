const express = require('express');
const router = express.Router();
const { checkout, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');

router.post('/checkout', checkout);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;