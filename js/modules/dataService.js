// Data Service Module - Handles data fetching and management
const DataService = {
    // Mock data for demonstration
    mockAssets: ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'ADA', 'DOGE', 'SOL'],
    
    // Initialize the service
    init() {
        console.log('DataService initialized');
    },

    // Generate mock market data
    getMarketData() {
        const totalVolume = DashboardHelpers.generateRandomPrice(1000000000, 500000000);
        const marketChange = DashboardHelpers.generateRandomChange(-10, 10);
        const activeTrades = Math.floor(Math.random() * 1000) + 500;

        return {
            totalVolume: totalVolume,
            marketChange: parseFloat(marketChange),
            activeTrades: activeTrades
        };
    },

    // Generate mock price data for charts
    generatePriceData(points = 50) {
        const data = [];
        let basePrice = 50000;
        const now = Date.now();

        for (let i = 0; i < points; i++) {
            const timestamp = now - (points - i) * 60000; // 1 minute intervals
            basePrice += (Math.random() - 0.5) * 500;
            data.push({
                timestamp: timestamp,
                price: basePrice,
                volume: Math.random() * 100
            });
        }

        return data;
    },

    // Get watchlist data
    getWatchlistData() {
        return this.mockAssets.slice(0, 5).map(symbol => {
            const price = DashboardHelpers.generateRandomPrice(1000, 500);
            const change = DashboardHelpers.generateRandomChange(-15, 15);
            return {
                symbol: symbol + '/USD',
                price: price,
                change: parseFloat(change)
            };
        });
    },

    // Get recent trades
    getRecentTrades(count = 10) {
        const trades = [];
        const now = Date.now();

        for (let i = 0; i < count; i++) {
            const symbol = this.mockAssets[Math.floor(Math.random() * this.mockAssets.length)];
            const price = DashboardHelpers.generateRandomPrice(1000, 500);
            const amount = Math.random() * 10;
            const isBuy = Math.random() > 0.5;

            trades.push({
                id: DashboardHelpers.generateId(),
                symbol: symbol + '/USD',
                price: price,
                amount: amount,
                type: isBuy ? 'buy' : 'sell',
                timestamp: now - i * 5000
            });
        }

        return trades;
    },

    // Get order book data
    getOrderBook() {
        const asks = [];
        const bids = [];
        const basePrice = 50000;

        for (let i = 0; i < 10; i++) {
            asks.push({
                price: basePrice + i * 10,
                amount: Math.random() * 5,
                total: (basePrice + i * 10) * Math.random() * 5
            });

            bids.push({
                price: basePrice - i * 10,
                amount: Math.random() * 5,
                total: (basePrice - i * 10) * Math.random() * 5
            });
        }

        return { asks, bids };
    },

    // Get portfolio data
    getPortfolioData() {
        return this.mockAssets.slice(0, 4).map(symbol => {
            const amount = Math.random() * 10;
            const avgPrice = DashboardHelpers.generateRandomPrice(1000, 500);
            const currentPrice = avgPrice + DashboardHelpers.generateRandomPrice(0, 100);
            const value = amount * currentPrice;
            const pnl = ((currentPrice - avgPrice) / avgPrice) * 100;

            return {
                symbol: symbol,
                amount: amount,
                avgPrice: avgPrice,
                currentPrice: currentPrice,
                value: value,
                pnl: pnl
            };
        });
    },

    // Simulate data refresh
    async refreshData() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    market: this.getMarketData(),
                    watchlist: this.getWatchlistData(),
                    trades: this.getRecentTrades(),
                    orderBook: this.getOrderBook(),
                    portfolio: this.getPortfolioData()
                });
            }, 500);
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataService;
}
