import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  badge: { type: String, default: '' },
  description: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  stock: { type: Number, default: 10 },
  specs: { type: Map, of: String }
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
