import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true, lowercase: true },
  username: String,
  stats: {
    totalDeals: { type: Number, default: 0 },
    reputation: { type: Number, default: 10 }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
