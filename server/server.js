import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

import authRoutes from './src/routes/authRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import groupRoutes from './src/routes/groupRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';

dotenv.config();
connectDB();

const app = express(); // ✅ THIS LINE MUST EXIST BEFORE app.use

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🚀 SwarmDeal Backend Running');
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
