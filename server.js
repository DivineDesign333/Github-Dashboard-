const express = require('express');
const cors = require('cors');
const path = require('path');

// Import modular services
const marketDataService = require('./modules/marketData');
const portfolioService = require('./modules/portfolio');
const tradesService = require('./modules/trades');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/market-data', async (req, res) => {
  try {
    const data = await marketDataService.getMarketData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

app.get('/api/portfolio', async (req, res) => {
  try {
    const marketData = await marketDataService.getMarketData();
    const portfolio = portfolioService.calculatePortfolio(marketData);
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

app.get('/api/trades', (req, res) => {
  try {
    const { symbol, type, limit } = req.query;
    const filters = {};
    if (symbol) filters.symbol = symbol;
    if (type) filters.type = type.toUpperCase();
    if (limit) filters.limit = parseInt(limit);
    
    const trades = tradesService.getTrades(filters);
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

app.get('/api/trades/stats', (req, res) => {
  try {
    const stats = tradesService.getStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trade statistics' });
  }
});

// Serve the dashboard
// Note: For production deployment, add rate limiting middleware
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Trading Dashboard server running on http://localhost:${PORT}`);
});
