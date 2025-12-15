# Github-Dashboard-

## Installation

Clone the repository:

```bash
git clone https://github.com/DivineDesign333/Github-Dashboard-.git
cd Github-Dashboard-
```
# Modular Trading Dashboard

A modern, responsive trading dashboard built with vanilla JavaScript, HTML, and CSS. Features a modular architecture for easy maintenance and extensibility.

## Features

- **Real-time Market Overview**: Display total volume, 24h change, and active trades
- **Interactive Price Chart**: Visualize price movements with a custom canvas-based chart
- **Watchlist**: Track your favorite trading pairs
- **Recent Trades**: View the latest trades in real-time
- **Order Book**: See current bids and asks
- **Portfolio Management**: Monitor your holdings and P&L

## Project Structure

```
Github-Dashboard-/
├── index.html              # Main HTML file
├── config.js               # Dashboard configuration
├── README.md               # Documentation
├── styles/                 # CSS stylesheets
│   ├── main.css           # Base styles and utilities
│   ├── dashboard.css      # Dashboard layout and components
│   └── charts.css         # Chart-specific styles
└── js/                    # JavaScript modules
    ├── app.js             # Main application controller
    ├── modules/           # Feature modules
    │   ├── dataService.js       # Data fetching and management
    │   ├── chartModule.js       # Chart rendering
    │   ├── watchlistModule.js   # Watchlist functionality
    │   ├── tradesModule.js      # Trades display
    │   ├── orderBookModule.js   # Order book display
    │   └── portfolioModule.js   # Portfolio management
    └── utils/             # Utility functions
        ├── helpers.js           # Helper functions
        └── formatters.js        # Data formatting utilities
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DivineDesign333/Github-Dashboard-.git
   cd Github-Dashboard-
   ```

2. Open with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

### Alternative: Direct File Access

You can also open `index.html` directly in your browser, though some features may be limited without a web server.

## Usage

### Refresh Data
Click the "Refresh Data" button in the header to manually update all dashboard data.

### Change Timeframe
Use the timeframe selector dropdown to adjust the chart's time period:
- 1 Minute
- 5 Minutes
- 15 Minutes
- 1 Hour (default)
- 1 Day

### Auto-Refresh
The dashboard automatically refreshes data every 30 seconds.

## Customization

### Configuration
Edit `config.js` to customize:
- Refresh intervals
- Chart settings
- Trading pairs
- API endpoints
- UI preferences

### Styling
Modify CSS variables in `styles/main.css` to change the color scheme:
```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --danger-color: #ef4444;
    /* ... more variables */
}
```

## Architecture

The dashboard follows a modular architecture pattern:

### Modules
- **DataService**: Handles all data operations and mock data generation
- **ChartModule**: Renders the price chart using HTML5 Canvas
- **WatchlistModule**: Manages the watchlist display
- **TradesModule**: Displays recent trades
- **OrderBookModule**: Shows order book data
- **PortfolioModule**: Manages portfolio display

### Utilities
- **Helpers**: Common utility functions
- **Formatters**: Data formatting functions for currency, numbers, dates, etc.

### Main Controller
- **TradingDashboard**: Orchestrates all modules and handles application lifecycle

## Development

### Adding a New Module

1. Create a new file in `js/modules/yourModule.js`
2. Follow the existing module pattern:
   ```javascript
   const YourModule = {
       init() { /* initialization code */ },
       updateData(data) { /* update logic */ },
       render() { /* rendering logic */ }
   };
   ```
3. Include the module in `index.html`
4. Initialize it in `js/app.js`

### Mock Data
Currently, the dashboard uses mock data for demonstration. To integrate real APIs:
1. Update the configuration in `config.js`
2. Modify `DataService` methods to fetch from real endpoints
3. Add error handling and loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or feedback, please open an issue on GitHub.

