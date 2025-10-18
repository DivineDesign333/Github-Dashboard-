// Watchlist Module - Handles watchlist display and updates
const WatchlistModule = {
    container: null,
    data: [],

    // Initialize the module
    init() {
        this.container = DashboardHelpers.getElement('watchlist-items');
        if (!this.container) {
            console.error('Watchlist container not found');
            return;
        }
        console.log('WatchlistModule initialized');
    },

    // Update watchlist data
    updateData(data) {
        this.data = data || [];
        this.render();
    },

    // Render watchlist items
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (this.data.length === 0) {
            this.container.innerHTML = '<p style="color: #94a3b8; text-align: center;">No items in watchlist</p>';
            return;
        }

        this.data.forEach(item => {
            const itemElement = this.createWatchlistItem(item);
            this.container.appendChild(itemElement);
        });
    },

    // Create a watchlist item element
    createWatchlistItem(item) {
        const div = DashboardHelpers.createElement('div', 'watchlist-item');

        const symbolDiv = DashboardHelpers.createElement('div');
        const symbolSpan = DashboardHelpers.createElement('span', 'watchlist-symbol', item.symbol);
        symbolDiv.appendChild(symbolSpan);

        const priceDiv = DashboardHelpers.createElement('div');
        priceDiv.style.textAlign = 'right';

        const priceSpan = DashboardHelpers.createElement('span', 'watchlist-price', 
            DashboardFormatters.formatCurrency(item.price, 'USD', 2));
        
        const changeSpan = DashboardHelpers.createElement('span', 'watchlist-change', 
            DashboardFormatters.formatPercentage(item.change));
        changeSpan.classList.add(item.change >= 0 ? 'positive' : 'negative');

        priceDiv.appendChild(priceSpan);
        priceDiv.appendChild(document.createElement('br'));
        priceDiv.appendChild(changeSpan);

        div.appendChild(symbolDiv);
        div.appendChild(priceDiv);

        return div;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WatchlistModule;
}
