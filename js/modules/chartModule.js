// Chart Module - Handles price chart rendering
const ChartModule = {
    canvas: null,
    ctx: null,
    chartData: [],
    
    // Initialize the chart module
    init() {
        this.canvas = DashboardHelpers.getElement('price-chart');
        if (!this.canvas) {
            console.error('Chart canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Add resize listener
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.render();
        });
        
        console.log('ChartModule initialized');
    },

    // Resize canvas to match container
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight || 350;
    },

    // Update chart data
    updateData(data) {
        this.chartData = data || [];
        this.render();
    },

    // Render the chart
    render() {
        if (!this.ctx || this.chartData.length === 0) return;

        const { width, height } = this.canvas;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Get price range
        const prices = this.chartData.map(d => d.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = maxPrice - minPrice;

        // Draw background
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, 0, width, height);

        // Draw grid lines
        this.ctx.strokeStyle = '#334155';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(padding, y);
            this.ctx.lineTo(width - padding, y);
            this.ctx.stroke();

            // Draw price labels
            const price = maxPrice - (priceRange / 5) * i;
            this.ctx.fillStyle = '#94a3b8';
            this.ctx.font = '12px sans-serif';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(DashboardFormatters.formatCurrency(price, 'USD', 0), padding - 5, y + 4);
        }

        // Draw price line
        this.ctx.strokeStyle = '#3b82f6';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        this.chartData.forEach((point, index) => {
            const x = padding + (chartWidth / (this.chartData.length - 1)) * index;
            const y = padding + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;

            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });

        this.ctx.stroke();

        // Draw area fill
        this.ctx.lineTo(width - padding, height - padding);
        this.ctx.lineTo(padding, height - padding);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Draw current price indicator
        if (this.chartData.length > 0) {
            const lastPoint = this.chartData[this.chartData.length - 1];
            const lastX = width - padding;
            const lastY = padding + chartHeight - ((lastPoint.price - minPrice) / priceRange) * chartHeight;

            this.ctx.fillStyle = '#3b82f6';
            this.ctx.beginPath();
            this.ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw price label
            this.ctx.fillStyle = '#3b82f6';
            this.ctx.fillRect(lastX + 10, lastY - 12, 80, 24);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '14px sans-serif';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(DashboardFormatters.formatCurrency(lastPoint.price, 'USD', 0), lastX + 15, lastY + 5);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartModule;
}
