// Trades Module
// This module manages trade history and execution

class TradesService {
    constructor() {
        this.trades = [
            { 
                id: 1, 
                symbol: 'AAPL', 
                type: 'BUY', 
                shares: 10, 
                price: 175.20, 
                date: '2025-10-15T10:30:00Z' 
            },
            { 
                id: 2, 
                symbol: 'GOOGL', 
                type: 'SELL', 
                shares: 5, 
                price: 143.50, 
                date: '2025-10-14T14:20:00Z' 
            },
            { 
                id: 3, 
                symbol: 'BTC', 
                type: 'BUY', 
                shares: 0.5, 
                price: 42000.00, 
                date: '2025-10-13T09:15:00Z' 
            },
            { 
                id: 4, 
                symbol: 'MSFT', 
                type: 'BUY', 
                shares: 15, 
                price: 375.80, 
                date: '2025-10-12T11:45:00Z' 
            },
            { 
                id: 5, 
                symbol: 'ETH', 
                type: 'BUY', 
                shares: 5, 
                price: 2250.00, 
                date: '2025-10-11T16:20:00Z' 
            }
        ];
        this.nextId = 6;
    }

    /**
     * Get all trades, optionally filtered
     * @param {Object} filters - Optional filters (symbol, type, limit)
     */
    getTrades(filters = {}) {
        let result = [...this.trades];

        // Filter by symbol
        if (filters.symbol) {
            result = result.filter(t => t.symbol === filters.symbol);
        }

        // Filter by type
        if (filters.type) {
            result = result.filter(t => t.type === filters.type);
        }

        // Sort by date (most recent first)
        result.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Limit results
        if (filters.limit) {
            result = result.slice(0, filters.limit);
        }

        return result;
    }

    /**
     * Add a new trade
     * @param {Object} trade - Trade details
     */
    addTrade(trade) {
        const newTrade = {
            id: this.nextId++,
            symbol: trade.symbol,
            type: trade.type,
            shares: trade.shares,
            price: trade.price,
            date: trade.date || new Date().toISOString()
        };

        this.trades.unshift(newTrade);
        return newTrade;
    }

    /**
     * Get trade statistics
     */
    getStatistics() {
        const stats = {
            totalTrades: this.trades.length,
            buyCount: 0,
            sellCount: 0,
            totalVolume: 0
        };

        this.trades.forEach(trade => {
            if (trade.type === 'BUY') {
                stats.buyCount++;
            } else {
                stats.sellCount++;
            }
            stats.totalVolume += trade.shares * trade.price;
        });

        stats.totalVolume = parseFloat(stats.totalVolume.toFixed(2));

        return stats;
    }

    /**
     * Get trades by date range
     */
    getTradesByDateRange(startDate, endDate) {
        return this.trades.filter(trade => {
            const tradeDate = new Date(trade.date);
            return tradeDate >= startDate && tradeDate <= endDate;
        });
    }
}

module.exports = new TradesService();
