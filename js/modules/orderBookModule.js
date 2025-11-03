// Order Book Module - Handles order book display
const OrderBookModule = {
    asksContainer: null,
    bidsContainer: null,
    data: { asks: [], bids: [] },

    // Initialize the module
    init() {
        this.asksContainer = DashboardHelpers.getElement('order-asks');
        this.bidsContainer = DashboardHelpers.getElement('order-bids');
        
        if (!this.asksContainer || !this.bidsContainer) {
            console.error('Order book containers not found');
            return;
        }
        console.log('OrderBookModule initialized');
    },

    // Update order book data
    updateData(data) {
        this.data = data || { asks: [], bids: [] };
        this.render();
    },

    // Render order book
    render() {
        if (!this.asksContainer || !this.bidsContainer) return;

        this.renderAsks();
        this.renderBids();
    },

    // Render asks (sell orders)
    renderAsks() {
        // More efficient DOM clearing
        while (this.asksContainer.firstChild) {
            this.asksContainer.removeChild(this.asksContainer.firstChild);
        }
        
        const header = DashboardHelpers.createElement('h3', '', 'ASKS');
        header.style.color = '#ef4444';
        header.style.marginBottom = '10px';
        header.style.fontSize = '0.9rem';
        this.asksContainer.appendChild(header);

        if (this.data.asks.length === 0) {
            const emptyMsg = DashboardHelpers.createElement('p', '', 'No asks');
            emptyMsg.style.color = '#94a3b8';
            emptyMsg.style.fontSize = '0.85rem';
            this.asksContainer.appendChild(emptyMsg);
            return;
        }

        // Use DocumentFragment for batch DOM insertion
        const fragment = document.createDocumentFragment();
        this.data.asks.forEach(order => {
            const orderElement = this.createOrderItem(order);
            fragment.appendChild(orderElement);
        });
        this.asksContainer.appendChild(fragment);
    },

    // Render bids (buy orders)
    renderBids() {
        // More efficient DOM clearing
        while (this.bidsContainer.firstChild) {
            this.bidsContainer.removeChild(this.bidsContainer.firstChild);
        }
        
        const header = DashboardHelpers.createElement('h3', '', 'BIDS');
        header.style.color = '#10b981';
        header.style.marginBottom = '10px';
        header.style.fontSize = '0.9rem';
        this.bidsContainer.appendChild(header);

        if (this.data.bids.length === 0) {
            const emptyMsg = DashboardHelpers.createElement('p', '', 'No bids');
            emptyMsg.style.color = '#94a3b8';
            emptyMsg.style.fontSize = '0.85rem';
            this.bidsContainer.appendChild(emptyMsg);
            return;
        }

        // Use DocumentFragment for batch DOM insertion
        const fragment = document.createDocumentFragment();
        this.data.bids.forEach(order => {
            const orderElement = this.createOrderItem(order);
            fragment.appendChild(orderElement);
        });
        this.bidsContainer.appendChild(fragment);
    },

    // Create order item element
    createOrderItem(order) {
        const div = DashboardHelpers.createElement('div', 'order-item');

        const priceSpan = DashboardHelpers.createElement('span', '', 
            DashboardFormatters.formatCurrency(order.price, 'USD', 0));
        
        const amountSpan = DashboardHelpers.createElement('span', '', 
            DashboardFormatters.formatNumber(order.amount, 4));

        div.appendChild(priceSpan);
        div.appendChild(amountSpan);

        return div;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrderBookModule;
}
