import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { PRODUCTS } from './src/data/products.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lumina_shop';

export const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected successfully.');

    // Seed Products
    const existingProductsCount = await Product.countDocuments();
    if (existingProductsCount === 0) {
      console.log('Seeding products database...');
      await Product.insertMany(PRODUCTS);
      console.log(`Successfully seeded ${PRODUCTS.length} products to MongoDB!`);
    } else {
      console.log(`Products collection already contains ${existingProductsCount} items.`);
    }

    // Seed Demo User
    const demoUserEmail = 'demo@lumina.shop';
    const existingDemoUser = await User.findOne({ email: demoUserEmail });
    if (!existingDemoUser) {
      await User.create({
        name: 'Alex Rivera',
        email: demoUserEmail,
        password: 'demo123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
      console.log('Demo user seeded into MongoDB: demo@lumina.shop');
    }

  } catch (err) {
    console.error('Seeding error (MongoDB connection warning):', err.message);
  }
};

// If run directly via node seed.js
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  seedDatabase().then(() => mongoose.connection.close());
}
