const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

connectDB();


app.use(cors(corsOptions));


app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api', require('./routes/orderRoutes'));


app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

app.use((error, req, res, next) => {
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS Error: This origin is not allowed.' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Accepting requests from: ${process.env.FRONTEND_URL}`);
  console.log(`📊 MongoDB connected for persistent data storage`);
});