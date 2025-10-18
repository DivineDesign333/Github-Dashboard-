# Usage Guide for Modular Trading Dashboard

## Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   streamlit run app.py
   ```

3. **Access the dashboard:**
   Open your browser to `http://localhost:8501`

## Features Guide

### 1. Selecting a Stock

In the sidebar, enter a stock ticker symbol (e.g., AAPL, GOOGL, MSFT, TSLA).

### 2. Setting Date Range

- **Start Date**: Click the date picker to select when you want the historical data to begin
- **End Date**: Click the date picker to select when you want the historical data to end

**Note**: Make sure the date range includes at least 20+ trading days for the moving average calculation to be meaningful.

### 3. Viewing the Chart

The main area displays an interactive candlestick chart with:
- **Candlesticks**: Green (price up) and Red (price down)
- **MA20 Line**: 20-day moving average in orange
- **Bounce Signals**: Green triangle markers (if enabled)

You can:
- Zoom in/out by dragging or using the zoom controls
- Pan by dragging the chart
- Hover over data points to see detailed information

### 4. Bounce Signals

Toggle "Show Bounce Signals" in the sidebar to display/hide signals.

A bounce signal is detected when:
1. Price crosses above the 20-day moving average
2. Positive price momentum is present
3. Volume is above the 20-day average

### 5. Simulated Trading Mode

Enable "Simulated Trading Mode" to:
- Log all detected bounce signals
- See detailed information about each signal
- View suggested BUY actions

## Module Structure

### data_loader.py
Fetches stock data from Yahoo Finance using the yfinance library.

### indicators.py
Calculates technical indicators:
- 20-day Moving Average (MA20)
- Price Change percentage
- Volume Moving Average
- Bounce Signal detection logic

### visuals.py
Creates interactive Plotly charts with:
- Candlestick patterns
- Moving averages
- Signal markers

### logger.py
Logs trading signals with:
- Signal date
- Price at signal
- Recommended action

## Tips

- **Best practices**: Use at least 30-60 days of historical data for more accurate signals
- **Volume matters**: Signals with high volume are generally more reliable
- **Not financial advice**: This is an educational tool, not investment advice
- **Paper trading**: Always test strategies with simulated trading before using real money

## Troubleshooting

**Issue**: No data loads
- Check that the ticker symbol is correct
- Ensure you have internet connectivity
- Verify the date range is valid (not in the future)

**Issue**: No signals detected
- Try a longer date range
- Some stocks may not have bounce signals in the selected period
- Adjust the date range to include more volatile periods

**Issue**: Charts not displaying
- Ensure all dependencies are installed
- Check browser console for errors
- Try refreshing the page
