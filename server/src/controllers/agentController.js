import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import arcService from '../services/arcService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

class AuthController {
  static login = asyncHandler(async (req, res) => {
    const { walletAddress, signature, message } = req.body;
    
    // Verify Signature
    const verification = await arcService.verifySignature(message, signature, walletAddress);
    if (!verification.verified) {
      res.status(401);
      throw new Error('Invalid Signature');
    }

    // Find/Create User
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    if (!user) {
      user = await User.create({ 
        walletAddress: walletAddress.toLowerCase(),
        username: `User_${walletAddress.slice(-4)}`
      });
    }

    // Issue Token
    const token = jwt.sign({ id: user._id, address: user.walletAddress }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ success: true, token, user });
  });

  static getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  });
}
export default AuthController;
