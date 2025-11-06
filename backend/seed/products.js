const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSZm0JB5ehVYJTUyasSkAGb4NxS_nIenfDCBgFD8LpDHD19l0Tn8W07sPni1p3WXB0j8QdzNCtk8u9P65-iT1Ss8afFQ6KSKYxNpBO5WTKgDhXFXRxjKVS8uw',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'electronics'
  },
  {
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://m.media-amazon.com/images/I/61pIzNaNRWL.jpg',
    description: 'Feature-rich smartwatch with health monitoring',
    category: 'electronics'
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    image: 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25008014/2023/10/31/44ffa8e6-8486-4b3a-b8a0-429e17dd040b1698729990869-Skybags-Unisex-Nexus-Laptop-Backpack-with-USB-Charging-Port--1.jpg',
    description: 'Durable laptop backpack with multiple compartments',
    category: 'accessories'
  },
  {
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://m.media-amazon.com/images/I/41wI7kT+qML._SR290,290_.jpg',
    description: 'Portable Bluetooth speaker with excellent sound quality',
    category: 'electronics'
  },
  {
    name: 'Phone Case',
    price: 24.99,
    image: 'https://i.etsystatic.com/23980716/r/il/2a0f2a/4432886386/il_fullxfull.4432886386_nsuh.jpg',
    description: 'Protective phone case with stylish design',
    category: 'accessories'
  },
  {
    name: 'USB-C Cable',
    price: 19.99,
    image: 'https://m.media-amazon.com/images/I/61MyHRuZHNL._AC_UF1000,1000_QL80_.jpg',
    description: 'Fast charging USB-C cable, 2m length',
    category: 'electronics'
  },
  {
    name: 'Wireless Mouse',
    price: 29.99,
    image: 'https://www.portronics.com/cdn/shop/files/Toad321500X1500Blue1.jpg?v=1699100039',
    description: 'Ergonomic wireless mouse with precision tracking',
    category: 'electronics'
  },
  {
    name: 'Desk Lamp',
    price: 39.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUimMSfDxTcA3XxI1QhiRokXzLBrgjuyoxdQ&s',
    description: 'LED desk lamp with adjustable brightness',
    category: 'home'
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = seedProducts;