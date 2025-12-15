# GitHub Copilot Instructions for Trading Dashboard

## Project Overview

This is a **modular trading dashboard** built with vanilla JavaScript, HTML5, and CSS. The application features a modern, responsive design with real-time market data visualization, price charts, watchlists, trade history, order books, and portfolio management.

**Key Characteristics:**
- Pure vanilla JavaScript (no frameworks like React, Vue, or Angular)
- Modular architecture with clear separation of concerns
- HTML5 Canvas for chart rendering
- Mock data generation for demonstration purposes
- Designed to be extended with real API integration

## Architecture and Module Pattern

### Module Structure
All modules follow a consistent object literal pattern:

```javascript
const ModuleName = {
    init() {
        // Initialization code
        // Set up event listeners, DOM references, etc.
    },
    
    updateData(data) {
        // Update module's internal state with new data
    },
    
    render() {
        // Render/update the UI
    }
};
```

### Project File Organization
```
Github-Dashboard-/
├── index.html              # Main HTML file
├── config.js               # Dashboard configuration (DashboardConfig object)
├── styles/                 # CSS stylesheets
│   ├── main.css           # Base styles and CSS variables
│   ├── dashboard.css      # Dashboard layout and components
│   └── charts.css         # Chart-specific styles
└── js/                    # JavaScript modules
    ├── app.js             # Main application controller (TradingDashboard)
    ├── modules/           # Feature modules
    │   ├── dataService.js       # Data fetching and mock data generation
    │   ├── chartModule.js       # Canvas-based chart rendering
    │   ├── watchlistModule.js   # Watchlist functionality
    │   ├── tradesModule.js      # Recent trades display
    │   ├── orderBookModule.js   # Order book display
    │   └── portfolioModule.js   # Portfolio management
    └── utils/             # Utility functions
        ├── helpers.js           # Helper functions (DashboardHelpers)
        └── formatters.js        # Data formatting utilities (DashboardFormatters)
```

### Key Modules
- **TradingDashboard** (app.js): Main controller that orchestrates all modules
- **DataService**: Handles data operations and mock data generation
- **ChartModule**: Renders price charts using HTML5 Canvas with performance optimizations
- **WatchlistModule, TradesModule, OrderBookModule, PortfolioModule**: UI modules for specific dashboard sections
- **DashboardHelpers**: Common utility functions
- **DashboardFormatters**: Data formatting (currency, numbers, dates, percentages)

## Code Style and Conventions

### JavaScript Style
- Use modern JavaScript (ES6+) features
- Prefer `const` over `let`; avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use object and array destructuring where appropriate
- No semicolons are required but are used consistently

### Naming Conventions
- **Modules**: PascalCase object literals (e.g., `DataService`, `ChartModule`)
- **Functions**: camelCase (e.g., `updateData`, `generatePriceData`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., configuration values)
- **DOM IDs**: kebab-case (e.g., `price-chart`, `total-volume`)

### Comments
- Add comments for complex logic or non-obvious behavior
- Use single-line comments (`//`) for brief explanations
- Use JSDoc-style comments for module or function descriptions where helpful
- Avoid stating the obvious; comments should explain "why" not "what"

## Performance Optimization Patterns

### Canvas Rendering Optimization
- **Cache gradient objects**: Create gradients once at module level and reuse them
- **Recreate only on resize**: Only recreate cached gradients when window resizes
- **Use `requestAnimationFrame`**: Use `requestAnimationFrame` for smooth canvas updates instead of direct rendering

Example:
```javascript
let cachedGradient = null;

function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    // ... configure gradient
    return gradient;
}

function render() {
    requestAnimationFrame(() => {
        if (!cachedGradient) {
            cachedGradient = createGradient(ctx);
        }
        // Use cachedGradient
    });
}
```

### DOM Manipulation Best Practices
- **Use `replaceChildren()`**: Instead of `innerHTML = ''` for clearing DOM elements
- **Use `DocumentFragment`**: For batch DOM insertions to minimize reflows
- **Avoid excessive reflows**: Batch DOM reads and writes

Example:
```javascript
// Good: Clear with replaceChildren()
container.replaceChildren();

// Good: Batch insert with DocumentFragment
const fragment = document.createDocumentFragment();
items.forEach(item => {
    const element = document.createElement('div');
    element.textContent = item;
    fragment.appendChild(element);
});
container.appendChild(fragment);

// Avoid: innerHTML = ''
container.innerHTML = '';
```

### Event Handler Optimization
- **Debounce resize handlers**: Use a 250ms delay to prevent excessive reflows during window resizing
- Use `DashboardHelpers.debounce()` utility function

Example:
```javascript
window.addEventListener('resize', DashboardHelpers.debounce(() => {
    // Resize handling code
}, 250));
```

### Type Conversion
- **Use unary `+` operator**: For string-to-number conversion instead of `parseFloat()` when the value is already numeric

Example:
```javascript
// Good
const change = +(Math.random() * 10).toFixed(2);

// Avoid
const change = parseFloat((Math.random() * 10).toFixed(2));
```

### Modern API Usage
- **Use `substring()` instead of deprecated `substr()`**: For string operations

Example:
```javascript
// Good
const short = longString.substring(0, 10);

// Avoid (deprecated)
const short = longString.substr(0, 10);
```

## Development Workflow

### Running the Application
The dashboard can be run with any local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in a browser.

### Configuration
- Edit `config.js` to modify refresh intervals, chart settings, trading pairs, or API endpoints
- CSS variables in `styles/main.css` control the color scheme and theming

### Adding New Modules
1. Create a new file in `js/modules/yourModule.js`
2. Follow the standard module pattern with `init()`, `updateData()`, and `render()` methods
3. Include the script in `index.html` in the correct order
4. Initialize the module in `TradingDashboard.init()` in `js/app.js`

### Mock Data
- Currently uses mock data via `DataService`
- To integrate real APIs, update `config.js` and modify `DataService` methods
- Add proper error handling and loading states when connecting to real APIs

## Testing

**Current State**: This project does not have automated tests or a testing framework.

**If adding tests:**
- Consider using vanilla JavaScript testing libraries (e.g., Jest, Mocha, or Jasmine)
- Follow existing module patterns when creating testable code
- Test individual modules independently
- Mock `DataService` for module tests

## Code Quality and Maintenance

### When Making Changes
- Make minimal, surgical changes to accomplish the task
- Preserve existing code style and patterns
- Avoid reformatting unrelated code
- Test changes manually in a browser
- Ensure changes work with mock data

### Security Considerations
- Never commit API keys or secrets (use environment variables)
- Sanitize any user input before rendering to the DOM
- Be cautious with `innerHTML`; prefer safer DOM manipulation methods

### Documentation
- Keep README.md updated with new features
- Document configuration options in `config.js`
- Add inline comments for complex logic

## Common Tasks and Examples

### Formatting Data
Use `DashboardFormatters` utilities:
- `formatCurrency(value)`: Format as currency ($1,234.56)
- `formatNumber(value)`: Format with thousand separators
- `formatPercentage(value)`: Format as percentage (12.34%)
- `formatDateTime(timestamp)`: Format timestamps with date and time
- `formatTime(timestamp)`: Format timestamps with time only
- `formatCompactNumber(value)`: Format large numbers with K, M, B suffixes
- `truncateText(text, maxLength)`: Truncate text with ellipsis

### Working with Charts
The `ChartModule` uses HTML5 Canvas:
- Canvas element ID: `price-chart`
- Data format: Array of `{timestamp, price, volume}` objects
- Update with `ChartModule.updateData(priceData)`

### Accessing Configuration
Use the global `DashboardConfig` object:
```javascript
const refreshInterval = DashboardConfig.app.refreshInterval;
const tradingPairs = DashboardConfig.tradingPairs;
```

## Important Notes

- **No dependencies**: This is a zero-dependency project. Don't add npm packages unless absolutely necessary
- **Browser compatibility**: Target modern browsers (latest Chrome, Firefox, Safari, Edge)
- **Responsive design**: Ensure all changes work on different screen sizes
- **Console logging**: Use `console.log()` for debugging, but remove or minimize in production code

## Questions and Support

For questions about the codebase or to report issues, open a GitHub issue in the repository.
