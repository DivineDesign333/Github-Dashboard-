// Market Data Module
// This module handles fetching and processing market data

class MarketDataService {
    constructor() {
        this.cache = null;
        this.cacheTime = null;
        this.cacheDuration = 5000; // 5 seconds
    }

    /**
     * Get current market data for stocks and crypto
     * In production, this would fetch from real APIs
     */
    async getMarketData() {
        // Check if cache is still valid
        if (this.cache && this.cacheTime && 
            (Date.now() - this.cacheTime < this.cacheDuration)) {
            return this.cache;
        }

        // Simulate API delay
        await this.delay(100);

        // Generate simulated market data
        const data = {
            stocks: this.generateStockData(),
            crypto: this.generateCryptoData(),
            timestamp: new Date().toISOString()
        };

        // Update cache
        this.cache = data;
        this.cacheTime = Date.now();

        return data;
    }

    generateStockData() {
        const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA'];
        const basePrice = { 
            AAPL: 178.50, GOOGL: 142.30, MSFT: 378.91, 
            AMZN: 145.20, TSLA: 242.80, META: 325.50, NVDA: 495.20 
        };

        return stocks.map(symbol => {
            const base = basePrice[symbol];
            const change = (Math.random() - 0.5) * 10;
            const changePercent = (change / base) * 100;

            return {
                symbol,
                price: parseFloat((base + change).toFixed(2)),
                change: parseFloat(change.toFixed(2)),
                changePercent: parseFloat(changePercent.toFixed(2))
            };
        });
    }

    generateCryptoData() {
        const crypto = ['BTC', 'ETH', 'SOL', 'ADA', 'DOT'];
        const basePrice = { 
            BTC: 43250.00, ETH: 2280.75, SOL: 98.50, 
            ADA: 0.52, DOT: 7.25 
        };

        return crypto.map(symbol => {
            const base = basePrice[symbol];
            const change = (Math.random() - 0.5) * (base * 0.05);
            const changePercent = (change / base) * 100;

            return {
                symbol,
                price: parseFloat((base + change).toFixed(2)),
                change: parseFloat(change.toFixed(2)),
                changePercent: parseFloat(changePercent.toFixed(2))
            };
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new MarketDataService();
