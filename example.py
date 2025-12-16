"""
Example usage of the signal_logger module.

This script demonstrates how to use the log_signals function to log
trading signals to Google Sheets.

Note: This example requires valid credentials.json file and a Google Sheet
named "Signal Log" to be set up before running.
"""

from signal_logger import log_signals
import pandas as pd


def main():
    """Main function demonstrating signal logging."""
    # Create a sample DataFrame with trading signals
    # In a real scenario, this would come from your trading algorithm
    df = pd.DataFrame({
        'Close': [150.25, 151.30, 149.80, 152.10, 150.90]
    })
    
    # Log the signals for Apple stock
    print("Logging signals for AAPL...")
    log_signals(df, 'AAPL')
    print("Successfully logged 5 signals to Google Sheets!")
    
    # You can also log signals for different tickers
    df_google = pd.DataFrame({
        'Close': [2800.50, 2810.25]
    })
    
    print("Logging signals for GOOGL...")
    log_signals(df_google, 'GOOGL')
    print("Successfully logged 2 signals to Google Sheets!")


if __name__ == '__main__':
    main()
