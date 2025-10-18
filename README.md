# Stock Chart Dashboard

A Streamlit-based dashboard for visualizing stock prices with Bollinger Bands and bounce signals.

## Features

- 📊 **Candlestick Charts**: Interactive candlestick charts using Plotly
- 📈 **Bollinger Bands**: Configurable Bollinger Bands overlay
- 🎯 **Bounce Signals**: Automatic detection and visualization of bounce signals at lower Bollinger Band
- 🔧 **Customizable Parameters**: Adjust BB window size and standard deviation
- 📅 **Multiple Time Periods**: View data from 1 month to 2 years
- 💹 **Real-time Data**: Fetches live stock data from Yahoo Finance

## Installation

1. Clone the repository:
```bash
git clone https://github.com/DivineDesign333/Github-Dashboard-.git
cd Github-Dashboard-
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

Run the Streamlit app:
```bash
streamlit run app.py
```

The dashboard will open in your browser at `http://localhost:8501`.

## How to Use

1. **Enter a Stock Ticker**: Type a stock ticker symbol (e.g., AAPL, MSFT, GOOGL) in the sidebar
2. **Select Time Period**: Choose the historical period you want to analyze
3. **Adjust Bollinger Bands**: Customize the BB window size and standard deviation
4. **Toggle Bounce Signals**: Enable or disable bounce signal markers
5. **Load Data**: Click the "Load Data" button to fetch and visualize the data

## Technical Details

### Bollinger Bands Calculation

Bollinger Bands consist of:
- **Middle Band**: 20-day simple moving average (SMA) of closing prices
- **Upper Band**: Middle band + (2 × standard deviation)
- **Lower Band**: Middle band - (2 × standard deviation)

### Bounce Signal Detection

A bounce signal is detected when:
1. The low price touches or goes below the lower Bollinger Band
2. The next candle closes higher than the previous close

This can indicate a potential reversal or buying opportunity.

## Dependencies

- `streamlit`: Web application framework
- `plotly`: Interactive charting library
- `pandas`: Data manipulation and analysis
- `yfinance`: Yahoo Finance data fetcher
- `numpy`: Numerical computing

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.