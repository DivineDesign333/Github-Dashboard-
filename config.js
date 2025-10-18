// Dashboard Configuration
const DashboardConfig = {
    // Application settings
    app: {
        name: 'Modular Trading Dashboard',
        version: '1.0.0',
        refreshInterval: 30000 // 30 seconds
    },

    // Chart settings
    chart: {
        defaultTimeframe: '1h',
        maxDataPoints: 100,
        animationDuration: 300
    },

    // Data settings
    data: {
        mockMode: true, // Use mock data instead of real API
        cacheTimeout: 5000 // 5 seconds
    },

    // UI settings
    ui: {
        theme: 'dark',
        compactMode: false,
        showAnimations: true
    },

    // API endpoints (for future use)
    api: {
        baseUrl: 'https://api.example.com',
        endpoints: {
            market: '/market/stats',
            prices: '/prices',
            trades: '/trades',
            orderbook: '/orderbook',
            portfolio: '/portfolio'
        }
    },

    // Trading pairs
    tradingPairs: [
        'BTC/USD',
        'ETH/USD',
        'USDT/USD',
        'BNB/USD',
        'XRP/USD',
        'ADA/USD',
        'DOGE/USD',
        'SOL/USD'
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardConfig;
}
