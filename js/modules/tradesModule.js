// Trades Module - Handles recent trades display
const TradesModule = {
    container: null,
    data: [],

    // Initialize the module
    init() {
        this.container = DashboardHelpers.getElement('trades-list');
        if (!this.container) {
            console.error('Trades container not found');
            return;
        }
        console.log('TradesModule initialized');
    },

    // Update trades data
    updateData(data) {
        this.data = data || [];
        this.render();
    },

    // Render trade items
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (this.data.length === 0) {
            this.container.innerHTML = '<p style="color: #94a3b8; text-align: center;">No recent trades</p>';
            return;
        }

        this.data.forEach(trade => {
            const tradeElement = this.createTradeItem(trade);
            this.container.appendChild(tradeElement);
        });
    },

    // Create a trade item element
    createTradeItem(trade) {
        const div = DashboardHelpers.createElement('div', 'trade-item');

        const infoDiv = DashboardHelpers.createElement('div');
        const symbolSpan = DashboardHelpers.createElement('span', '', trade.symbol);
        symbolSpan.style.fontWeight = '600';
        const timeSpan = DashboardHelpers.createElement('span', 'trade-time', 
            ' • ' + DashboardFormatters.formatTime(trade.timestamp));
        
        infoDiv.appendChild(symbolSpan);
        infoDiv.appendChild(timeSpan);

        const detailsDiv = DashboardHelpers.createElement('div');
        detailsDiv.style.textAlign = 'right';

        const priceSpan = DashboardHelpers.createElement('span', 'trade-price', 
            DashboardFormatters.formatCurrency(trade.price, 'USD', 2));
        priceSpan.classList.add(trade.type === 'buy' ? 'positive' : 'negative');

        const amountSpan = DashboardHelpers.createElement('span', 'trade-amount', 
            ' ' + DashboardFormatters.formatNumber(trade.amount, 4));

        detailsDiv.appendChild(priceSpan);
        detailsDiv.appendChild(amountSpan);

        div.appendChild(infoDiv);
        div.appendChild(detailsDiv);

        return div;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TradesModule;
}
