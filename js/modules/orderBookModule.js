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
        this.asksContainer.innerHTML = '<h3 style="color: #ef4444; margin-bottom: 10px; font-size: 0.9rem;">ASKS</h3>';

        if (this.data.asks.length === 0) {
            this.asksContainer.innerHTML += '<p style="color: #94a3b8; font-size: 0.85rem;">No asks</p>';
            return;
        }

        this.data.asks.forEach(order => {
            const orderElement = this.createOrderItem(order);
            this.asksContainer.appendChild(orderElement);
        });
    },

    // Render bids (buy orders)
    renderBids() {
        this.bidsContainer.innerHTML = '<h3 style="color: #10b981; margin-bottom: 10px; font-size: 0.9rem;">BIDS</h3>';

        if (this.data.bids.length === 0) {
            this.bidsContainer.innerHTML += '<p style="color: #94a3b8; font-size: 0.85rem;">No bids</p>';
            return;
        }

        this.data.bids.forEach(order => {
            const orderElement = this.createOrderItem(order);
            this.bidsContainer.appendChild(orderElement);
        });
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
