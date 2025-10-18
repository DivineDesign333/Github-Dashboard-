# Trading Dashboard

A modern, modular trading dashboard for monitoring real-time market data, portfolio performance, and trading activity. Built with a clean architecture separating frontend and backend concerns.

## 🚀 Features

- **Real-time Market Data**: Track stocks and cryptocurrency prices
- **Portfolio Management**: Monitor your holdings and daily performance
- **Trade History**: View recent trading activity
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-refresh**: Data updates automatically every 30 seconds
- **RESTful API**: Clean API endpoints for data access

## 📁 Project Structure

```
trading-dashboard/
├── public/                 # Frontend files
│   ├── index.html         # Main dashboard UI
│   ├── css/
│   │   └── styles.css     # Dashboard styling
│   └── js/
│       └── dashboard.js   # Dashboard logic
├── server.js              # Express backend server
├── package.json           # Project dependencies
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/trading-dashboard.git
cd trading-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🔌 API Endpoints

The dashboard provides the following REST API endpoints:

### GET /api/market-data
Returns current market data for stocks and cryptocurrency.

**Response:**
```json
{
  "stocks": [
    {
      "symbol": "AAPL",
      "price": 178.50,
      "change": 2.5,
      "changePercent": 1.42
    }
  ],
  "crypto": [
    {
      "symbol": "BTC",
      "price": 43250.00,
      "change": 1250.50,
      "changePercent": 2.98
    }
  ]
}
```

### GET /api/portfolio
Returns portfolio summary and holdings.

**Response:**
```json
{
  "totalValue": 125430.50,
  "dayChange": 2340.75,
  "dayChangePercent": 1.90,
  "holdings": [
    {
      "symbol": "AAPL",
      "shares": 50,
      "value": 8925.00,
      "change": 125.00
    }
  ]
}
```

### GET /api/trades
Returns recent trade history.

**Response:**
```json
[
  {
    "id": 1,
    "symbol": "AAPL",
    "type": "BUY",
    "shares": 10,
    "price": 175.20,
    "date": "2025-10-15T10:30:00Z"
  }
]
```

## 🎨 Customization

### Modifying Market Data
Edit the API endpoints in `server.js` to integrate with real market data providers:
- Replace simulated data with API calls to services like Alpha Vantage, IEX Cloud, or CoinGecko
- Add authentication and rate limiting as needed

### Styling
Customize the dashboard appearance by editing `public/css/styles.css`:
- Color scheme is defined in CSS variables at the top of the file
- Layout uses CSS Grid for responsive design

### Adding Features
The modular structure makes it easy to extend:
- Add new API endpoints in `server.js`
- Add new UI sections in `index.html`
- Add new functionality in `public/js/dashboard.js`

## 🔒 Security Notes

- This dashboard currently uses simulated data for demonstration
- Before deploying to production:
  - Add proper authentication and authorization
  - Implement HTTPS
  - Add rate limiting
  - Validate and sanitize all inputs
  - Use environment variables for sensitive data

## 📦 Dependencies

- **express**: Fast, minimalist web framework for Node.js
- **cors**: Enable Cross-Origin Resource Sharing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🔮 Future Enhancements

- [ ] Real-time WebSocket data streaming
- [ ] Advanced charting with historical data
- [ ] Order placement functionality
- [ ] Multiple portfolio support
- [ ] Price alerts and notifications
- [ ] Dark/Light theme toggle
- [ ] Export data to CSV/PDF
- [ ] Integration with real trading APIs

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Note**: This dashboard uses simulated data for demonstration purposes. To use with real market data, integrate with appropriate financial data APIs.