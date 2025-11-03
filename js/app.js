// Main Application Controller
const TradingDashboard = {
    isInitialized: false,
    updateInterval: null,

    // Initialize the dashboard
    async init() {
        console.log('Initializing Trading Dashboard...');

        // Initialize all modules
        DataService.init();
        ChartModule.init();
        WatchlistModule.init();
        TradesModule.init();
        OrderBookModule.init();
        PortfolioModule.init();

        // Load initial data
        await this.loadData();

        // Set up event listeners
        this.setupEventListeners();

        // Start auto-refresh
        this.startAutoRefresh();

        this.isInitialized = true;
        console.log('Trading Dashboard initialized successfully');
    },

    // Load all dashboard data
    async loadData() {
        try {
            // Update market stats
            const marketData = DataService.getMarketData();
            this.updateMarketStats(marketData);

            // Update chart
            const priceData = DataService.generatePriceData(50);
            ChartModule.updateData(priceData);

            // Update watchlist
            const watchlistData = DataService.getWatchlistData();
            WatchlistModule.updateData(watchlistData);

            // Update recent trades
            const tradesData = DataService.getRecentTrades(15);
            TradesModule.updateData(tradesData);

            // Update order book
            const orderBookData = DataService.getOrderBook();
            OrderBookModule.updateData(orderBookData);

            // Update portfolio
            const portfolioData = DataService.getPortfolioData();
            PortfolioModule.updateData(portfolioData);

        } catch (error) {
            console.error('Error loading data:', error);
        }
    },

    // Update market statistics
    updateMarketStats(data) {
        const volumeElement = DashboardHelpers.getElement('total-volume');
        const changeElement = DashboardHelpers.getElement('market-change');
        const tradesElement = DashboardHelpers.getElement('active-trades');

        if (volumeElement) {
            volumeElement.textContent = DashboardFormatters.formatCurrency(data.totalVolume, 'USD', 0);
        }

        if (changeElement) {
            changeElement.textContent = DashboardFormatters.formatPercentage(data.marketChange);
            changeElement.className = 'stat-value ' + (data.marketChange >= 0 ? 'positive' : 'negative');
        }

        if (tradesElement) {
            tradesElement.textContent = DashboardFormatters.formatNumber(data.activeTrades, 0);
        }
    },

    // Set up event listeners
    setupEventListeners() {
        // Refresh button
        const refreshBtn = DashboardHelpers.getElement('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.handleRefresh();
            });
        }

        // Timeframe selector
        const timeframeSelect = DashboardHelpers.getElement('timeframe-select');
        if (timeframeSelect) {
            timeframeSelect.addEventListener('change', (e) => {
                this.handleTimeframeChange(e.target.value);
            });
        }
    },

    // Handle refresh button click
    async handleRefresh() {
        console.log('Refreshing dashboard data...');
        const refreshBtn = DashboardHelpers.getElement('refresh-btn');
        
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.textContent = 'Refreshing...';
        }

        await this.loadData();

        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.textContent = 'Refresh Data';
        }
    },

    // Handle timeframe change
    handleTimeframeChange(timeframe) {
        console.log('Timeframe changed to:', timeframe);
        
        // Generate new chart data based on timeframe
        let points;
        switch(timeframe) {
            case '1m': points = 60; break;
            case '5m': points = 50; break;
            case '15m': points = 48; break;
            case '1h': points = 50; break;
            case '1d': points = 30; break;
            default: points = 50;
        }

        const priceData = DataService.generatePriceData(points);
        ChartModule.updateData(priceData);
    },

    // Start auto-refresh
    startAutoRefresh() {
        // Refresh data every 30 seconds
        this.updateInterval = setInterval(() => {
            this.loadData();
        }, 30000);

        console.log('Auto-refresh started (30 second interval)');
    },

    // Stop auto-refresh
    stopAutoRefresh() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('Auto-refresh stopped');
        }
    }
};

// Initialize dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        TradingDashboard.init();
    });
} else {
    TradingDashboard.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TradingDashboard;
}
