import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: String,
    originalPrice: Number,
    currentPrice: Number,
    targetPrice: Number,
    targetMembers: Number,
    owner: { type: String }, // wallet or user id
  },
  { timestamps: true }
);

export default mongoose.model('Group', groupSchema);
