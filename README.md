# Modular Trading Dashboard

A comprehensive Streamlit-based trading dashboard that provides real-time stock data analysis with bounce signal detection.

## Features

- 📊 **Real-time Stock Data**: Fetch and display stock data from Yahoo Finance
- 📈 **Technical Indicators**: Master bounce indicator with moving averages
- 🎯 **Signal Detection**: Automatic detection of bounce signals
- 📉 **Interactive Charts**: Candlestick charts with plotly
- 🔔 **Simulated Trading**: Log trading signals for analysis

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

Run the Streamlit application:
```bash
streamlit run app.py
```

The dashboard will open in your browser at `http://localhost:8501`

## Configuration

Use the sidebar to configure:
- **Ticker**: Enter a stock symbol (e.g., AAPL, MSFT)
- **Start Date**: Select the start date for historical data
- **End Date**: Select the end date for historical data
- **Simulated Trading Mode**: Enable to log trading signals
- **Show Bounce Signals**: Toggle signal visualization on the chart

## Modules

- `modules/data_loader.py`: Fetches stock data from Yahoo Finance
- `modules/indicators.py`: Calculates technical indicators and bounce signals
- `modules/visuals.py`: Creates interactive charts
- `modules/logger.py`: Logs trading signals

## Requirements

- Python 3.8+
- streamlit>=1.28.0
- yfinance>=0.2.28
- pandas>=2.0.0
- plotly>=5.17.0

## License

This project is open source and available under the MIT License.