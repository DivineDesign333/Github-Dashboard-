// Trading Dashboard JavaScript Module
const API_BASE_URL = window.location.origin;

class TradingDashboard {
    constructor() {
        this.marketData = null;
        this.portfolio = null;
        this.trades = null;
        this.init();
    }

    async init() {
        await this.loadAllData();
        this.setupEventListeners();
        this.updateLastRefreshTime();
        
        // Auto-refresh every 30 seconds
        setInterval(() => {
            this.loadAllData();
        }, 30000);
    }

    setupEventListeners() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadAllData();
            });
        }
    }

    async loadAllData() {
        try {
            await Promise.all([
                this.loadMarketData(),
                this.loadPortfolio(),
                this.loadTrades()
            ]);
            this.updateLastRefreshTime();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    async loadMarketData() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/market-data`);
            this.marketData = await response.json();
            this.renderMarketData();
        } catch (error) {
            console.error('Error loading market data:', error);
        }
    }

    async loadPortfolio() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/portfolio`);
            this.portfolio = await response.json();
            this.renderPortfolio();
        } catch (error) {
            console.error('Error loading portfolio:', error);
        }
    }

    async loadTrades() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/trades`);
            this.trades = await response.json();
            this.renderTrades();
        } catch (error) {
            console.error('Error loading trades:', error);
        }
    }

    renderMarketData() {
        if (!this.marketData) return;

        // Render stocks
        const stocksContainer = document.getElementById('stocks-container');
        if (stocksContainer) {
            stocksContainer.innerHTML = this.marketData.stocks.map(stock => 
                this.createDataItem(stock)
            ).join('');
        }

        // Render crypto
        const cryptoContainer = document.getElementById('crypto-container');
        if (cryptoContainer) {
            cryptoContainer.innerHTML = this.marketData.crypto.map(crypto => 
                this.createDataItem(crypto)
            ).join('');
        }
    }

    createDataItem(item) {
        const changeClass = item.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = item.change >= 0 ? '+' : '';
        
        return `
            <div class="data-item">
                <div class="data-item-symbol">${item.symbol}</div>
                <div class="data-item-price">$${item.price.toFixed(2)}</div>
                <div class="data-item-change ${changeClass}">
                    ${changeSymbol}${item.change.toFixed(2)} (${changeSymbol}${item.changePercent.toFixed(2)}%)
                </div>
            </div>
        `;
    }

    renderPortfolio() {
        if (!this.portfolio) return;

        // Update summary cards
        const totalValueEl = document.getElementById('total-value');
        if (totalValueEl) {
            totalValueEl.textContent = `$${this.portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        const dayChangeEl = document.getElementById('day-change');
        const dayChangePercentEl = document.getElementById('day-change-percent');
        const changeClass = this.portfolio.dayChange >= 0 ? 'positive' : 'negative';
        const changeSymbol = this.portfolio.dayChange >= 0 ? '+' : '';
        
        if (dayChangeEl) {
            dayChangeEl.textContent = `${changeSymbol}$${Math.abs(this.portfolio.dayChange).toFixed(2)}`;
            dayChangeEl.className = `card-value ${changeClass}`;
        }
        
        if (dayChangePercentEl) {
            dayChangePercentEl.textContent = `${changeSymbol}${this.portfolio.dayChangePercent.toFixed(2)}%`;
            dayChangePercentEl.className = `card-subvalue ${changeClass}`;
        }

        // Render holdings table
        const holdingsContainer = document.getElementById('holdings-container');
        if (holdingsContainer && this.portfolio.holdings) {
            const tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Shares</th>
                            <th>Value</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.portfolio.holdings.map(holding => {
                            const changeClass = holding.change >= 0 ? 'positive' : 'negative';
                            const changeSymbol = holding.change >= 0 ? '+' : '';
                            return `
                                <tr>
                                    <td><strong>${holding.symbol}</strong></td>
                                    <td>${holding.shares}</td>
                                    <td>$${holding.value.toFixed(2)}</td>
                                    <td class="${changeClass}">${changeSymbol}$${holding.change.toFixed(2)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
            holdingsContainer.innerHTML = tableHTML;
        }
    }

    renderTrades() {
        if (!this.trades) return;

        const tradesContainer = document.getElementById('trades-container');
        if (tradesContainer) {
            const tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Shares</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.trades.map(trade => {
                            const date = new Date(trade.date);
                            const typeClass = trade.type === 'BUY' ? 'trade-buy' : 'trade-sell';
                            return `
                                <tr>
                                    <td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
                                    <td><strong>${trade.symbol}</strong></td>
                                    <td class="${typeClass}">${trade.type}</td>
                                    <td>${trade.shares}</td>
                                    <td>$${trade.price.toFixed(2)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
            tradesContainer.innerHTML = tableHTML;
        }
    }

    updateLastRefreshTime() {
        const lastUpdateEl = document.getElementById('last-update');
        if (lastUpdateEl) {
            const now = new Date();
            lastUpdateEl.textContent = `Last updated: ${now.toLocaleTimeString()}`;
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TradingDashboard();
});
