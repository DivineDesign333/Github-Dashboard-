# 📈 Modular Trading Dashboard

A modular Streamlit-based trading dashboard for analyzing stock market data with technical indicators and bounce signal detection.

## Features

- **Real-time Stock Data**: Fetch data from Yahoo Finance for any ticker symbol
- **Technical Indicators**: 
  - Bollinger Bands
  - RSI (Relative Strength Index)
  - Price momentum analysis
- **Bounce Signal Detection**: Automated detection of potential bounce points using master bounce indicator
- **Interactive Charts**: Plotly-based candlestick charts with indicators overlay
- **Signal Logging**: Optional simulated trading mode with signal logging to CSV

## Project Structure

```
Github-Dashboard-/
├── app.py                  # Main Streamlit application
├── modules/
│   ├── __init__.py
│   ├── data_loader.py     # Data fetching from Yahoo Finance
│   ├── indicators.py      # Technical indicators (Bollinger Bands, RSI, bounce detection)
│   ├── visuals.py         # Chart visualization with Plotly
│   └── logger.py          # Signal logging functionality
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

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

The dashboard will open in your default web browser with the following features:

### Sidebar Controls
- **Ticker**: Enter any stock ticker symbol (default: AAPL)
- **Start Date**: Select the start date for data retrieval
- **End Date**: Select the end date for data retrieval
- **Simulated Trading Mode**: Enable to log detected signals to CSV
- **Show Bounce Signals**: Toggle bounce signal markers on the chart

### Main Display
- **Interactive Price Chart**: Candlestick chart with Bollinger Bands, SMA, and bounce signals
- **RSI Indicator**: Subplot showing RSI with overbought/oversold levels
- **Signal Alerts**: Success messages when bounce signals are detected
- **Signal Log**: Table of detected signals (when simulated trading mode is enabled)

## Technical Details

### Master Bounce Indicator
The bounce indicator identifies potential reversal points by combining:
1. Price near or below lower Bollinger Band (within 2%)
2. RSI in oversold territory (< 35)
3. Positive price momentum (price bounce up)

### Modules

#### `data_loader.py`
- `load_data(ticker, start_date, end_date)`: Fetches OHLCV data from Yahoo Finance

#### `indicators.py`
- `master_bounce_indicator(df, lookback)`: Applies technical indicators and detects bounce signals

#### `visuals.py`
- `plot_chart(df, show_signals)`: Creates interactive Plotly charts with indicators

#### `logger.py`
- `log_signals(signal_df, ticker)`: Logs and displays detected signals

## Dependencies

- streamlit >= 1.28.0
- pandas >= 2.0.0
- yfinance >= 0.2.28
- plotly >= 5.17.0
- numpy >= 1.24.0

## License

MIT License