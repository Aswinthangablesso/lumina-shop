import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Order } from './models/Order.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lumina_shop';

// Middleware
app.use(cors());
app.use(express.json());

let isMongoConnected = false;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(async () => {
    isMongoConnected = true;
    console.log(`Connected to MongoDB database at ${MONGODB_URI}`);
    await seedDatabase();
  })
  .catch((err) => {
    console.warn(`MongoDB Connection Notice: ${err.message}`);
    console.warn('Backend API running with resilient memory fallback mode.');
  });

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongodb: isMongoConnected ? 'connected' : 'fallback_mode' });
});

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, minRating, sort } = req.query;

    if (!isMongoConnected) {
      const { PRODUCTS } = await import('./src/data/products.js');
      let results = [...PRODUCTS];

      if (category && category !== 'All') {
        results = results.filter(p => p.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (minPrice) results = results.filter(p => p.price >= parseFloat(minPrice));
      if (maxPrice) results = results.filter(p => p.price <= parseFloat(maxPrice));
      if (minRating) results = results.filter(p => p.rating >= parseFloat(minRating));

      if (sort === 'price-low') results.sort((a, b) => a.price - b.price);
      if (sort === 'price-high') results.sort((a, b) => b.price - a.price);
      if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
      if (sort === 'name') results.sort((a, b) => a.title.localeCompare(b.title));

      return res.json(results);
    }

    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (minRating) query.rating = { $gte: parseFloat(minRating) };

    let sortOption = {};
    if (sort === 'price-low') sortOption.price = 1;
    if (sort === 'price-high') sortOption.price = -1;
    if (sort === 'rating') sortOption.rating = -1;
    if (sort === 'name') sortOption.title = 1;

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    if (!isMongoConnected) {
      const { PRODUCTS } = await import('./src/data/products.js');
      const item = PRODUCTS.find(p => p.id === req.params.id);
      if (!item) return res.status(404).json({ error: 'Product not found' });
      return res.json(item);
    }

    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailNormalized = email.trim().toLowerCase();

    if (!isMongoConnected) {
      return res.json({
        success: true,
        user: {
          id: `usr_${Date.now()}`,
          name,
          email: emailNormalized,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
        }
      });
    }

    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const newUser = await User.create({
      name,
      email: emailNormalized,
      password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
    });

    res.json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const emailNormalized = email.trim().toLowerCase();

    if (!isMongoConnected) {
      return res.json({
        success: true,
        user: {
          id: 'usr_demo_99',
          name: emailNormalized === 'demo@lumina.shop' ? 'Alex Rivera' : 'User',
          email: emailNormalized,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        }
      });
    }

    const user = await User.findOne({ email: emailNormalized, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    if (!isMongoConnected) {
      return res.json({ success: true, order: orderData });
    }

    const newOrder = await Order.create(orderData);
    res.json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Lumina Express Server running on http://localhost:${PORT}`);
});
