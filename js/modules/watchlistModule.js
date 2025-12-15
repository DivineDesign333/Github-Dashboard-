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

        // Clear all children efficiently
        this.container.replaceChildren();

        if (this.data.length === 0) {
            const emptyMsg = DashboardHelpers.createElement('p', '', 'No items in watchlist');
            emptyMsg.style.color = '#94a3b8';
            emptyMsg.style.textAlign = 'center';
            this.container.appendChild(emptyMsg);
            return;
        }

        // Use DocumentFragment for batch DOM insertion
        const fragment = document.createDocumentFragment();
        this.data.forEach(item => {
            const itemElement = this.createWatchlistItem(item);
            fragment.appendChild(itemElement);
        });
        this.container.appendChild(fragment);
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
