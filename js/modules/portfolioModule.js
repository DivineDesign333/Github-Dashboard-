// Portfolio Module - Handles portfolio display
const PortfolioModule = {
    container: null,
    data: [],

    // Initialize the module
    init() {
        this.container = DashboardHelpers.getElement('portfolio-items');
        if (!this.container) {
            console.error('Portfolio container not found');
            return;
        }
        console.log('PortfolioModule initialized');
    },

    // Update portfolio data
    updateData(data) {
        this.data = data || [];
        this.render();
    },

    // Render portfolio items
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (this.data.length === 0) {
            this.container.innerHTML = '<p style="color: #94a3b8; text-align: center;">No assets in portfolio</p>';
            return;
        }

        this.data.forEach(item => {
            const itemElement = this.createPortfolioItem(item);
            this.container.appendChild(itemElement);
        });
    },

    // Create portfolio item element
    createPortfolioItem(item) {
        const div = DashboardHelpers.createElement('div', 'portfolio-item');

        const assetSpan = DashboardHelpers.createElement('span', 'portfolio-asset', item.symbol);
        
        const amountSpan = DashboardHelpers.createElement('span', 'portfolio-amount', 
            DashboardFormatters.formatNumber(item.amount, 4) + ' ' + item.symbol);
        
        const valueSpan = DashboardHelpers.createElement('span', 'portfolio-value', 
            DashboardFormatters.formatCurrency(item.value, 'USD', 2));
        
        const pnlSpan = DashboardHelpers.createElement('span', 'portfolio-pnl', 
            DashboardFormatters.formatPercentage(item.pnl, 2) + ' P&L');
        pnlSpan.classList.add(item.pnl >= 0 ? 'positive' : 'negative');

        div.appendChild(assetSpan);
        div.appendChild(amountSpan);
        div.appendChild(valueSpan);
        div.appendChild(pnlSpan);

        return div;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioModule;
}
