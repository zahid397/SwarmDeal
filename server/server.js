// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/payments', paymentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'SwarmDeal API',
    status: 'running',
    version: '1.0.0'
  });
});

// Health Check
app.get('/health', (req, res) =>
  res.json({ status: 'healthy', timestamp: new Date() })
);
