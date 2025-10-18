// Portfolio Module
// This module manages portfolio data and calculations

class PortfolioService {
    constructor() {
        this.holdings = [
            { symbol: 'AAPL', shares: 50, avgPrice: 175.00 },
            { symbol: 'GOOGL', shares: 30, avgPrice: 140.50 },
            { symbol: 'BTC', shares: 2, avgPrice: 41000.00 },
            { symbol: 'ETH', shares: 10, avgPrice: 2200.00 }
        ];
    }

    /**
     * Calculate portfolio value based on current market prices
     * @param {Object} marketData - Current market prices
     */
    calculatePortfolio(marketData) {
        let totalValue = 0;
        let totalCost = 0;
        const holdingsData = [];

        this.holdings.forEach(holding => {
            // Find current price from market data
            let currentPrice = 0;
            const stockData = marketData.stocks?.find(s => s.symbol === holding.symbol);
            const cryptoData = marketData.crypto?.find(c => c.symbol === holding.symbol);
            
            if (stockData) {
                currentPrice = stockData.price;
            } else if (cryptoData) {
                currentPrice = cryptoData.price;
            }

            const value = holding.shares * currentPrice;
            const cost = holding.shares * holding.avgPrice;
            const change = value - cost;

            totalValue += value;
            totalCost += cost;

            holdingsData.push({
                symbol: holding.symbol,
                shares: holding.shares,
                value: parseFloat(value.toFixed(2)),
                change: parseFloat(change.toFixed(2)),
                changePercent: parseFloat(((change / cost) * 100).toFixed(2))
            });
        });

        const dayChange = totalValue - totalCost;
        const dayChangePercent = (dayChange / totalCost) * 100;

        return {
            totalValue: parseFloat(totalValue.toFixed(2)),
            dayChange: parseFloat(dayChange.toFixed(2)),
            dayChangePercent: parseFloat(dayChangePercent.toFixed(2)),
            holdings: holdingsData
        };
    }

    /**
     * Add a new holding to the portfolio
     */
    addHolding(symbol, shares, avgPrice) {
        const existing = this.holdings.find(h => h.symbol === symbol);
        if (existing) {
            // Update existing holding
            const totalShares = existing.shares + shares;
            const totalCost = (existing.shares * existing.avgPrice) + (shares * avgPrice);
            existing.avgPrice = totalCost / totalShares;
            existing.shares = totalShares;
        } else {
            // Add new holding
            this.holdings.push({ symbol, shares, avgPrice });
        }
    }

    /**
     * Remove shares from a holding
     */
    removeShares(symbol, shares) {
        const holding = this.holdings.find(h => h.symbol === symbol);
        if (holding) {
            holding.shares -= shares;
            if (holding.shares <= 0) {
                // Remove holding if no shares left
                this.holdings = this.holdings.filter(h => h.symbol !== symbol);
            }
        }
    }
}

module.exports = new PortfolioService();
