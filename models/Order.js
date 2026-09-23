import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true },
  items: [
    {
      id: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  shipping: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  subtotal: Number,
  shippingFee: Number,
  tax: Number,
  discount: Number,
  total: Number,
  paymentLast4: String,
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
