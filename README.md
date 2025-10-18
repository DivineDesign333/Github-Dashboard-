# Github-Dashboard-

Trading Signal Logger - A Python utility to log trading signals to Google Sheets.

## Features

- Log trading signals from pandas DataFrames to Google Sheets
- Automatic authentication using service account credentials
- Simple API for recording ticker, close price, and signal type

## Installation

```bash
pip install -r requirements.txt
```

## Setup

1. Create a Google Cloud project and enable the Google Sheets API
2. Create a service account and download the credentials JSON file
3. Save the credentials as `credentials.json` in the project directory
4. Create a Google Sheet named "Signal Log" and share it with the service account email

## Usage

```python
from signal_logger import log_signals
import pandas as pd

# Create a sample DataFrame with trading signals
df = pd.DataFrame({
    'Close': [150.25, 151.30, 149.80]
})

# Log the signals to Google Sheets
log_signals(df, 'AAPL')
```

The function will append rows to the "Signal Log" sheet with the following columns:
- Index (from DataFrame)
- Ticker symbol
- Close price
- Signal type (currently "Bounce")

## Requirements

- Python 3.7+
- pygsheets
- pandas

## Security Note

Never commit your `credentials.json` file to version control. It contains sensitive authentication information.