import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: String,
  productName: { type: String, required: true },
  category: String,
  originalPrice: Number,
  currentPrice: Number,
  targetPrice: Number,
  targetMembers: Number,
  dealExpiresAt: Date,
  currentMembers: [{
    walletAddress: { type: String, lowercase: true },
    status: { type: String, default: 'pending' }
  }],
  status: { 
    type: String, 
    enum: ['forming', 'ready', 'completed'], 
    default: 'forming' 
  },
  paymentDetails: {
    paymentIntentId: String,
    currency: String,
    arcTransactionHash: String
  }
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);
