const mongoose = require('mongoose');
require('dotenv').config(); 
const seedProducts = require('../seed/products');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const deleteResult = await Product.deleteMany({});
    await seedProducts();

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;