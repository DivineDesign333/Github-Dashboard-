"""
Signal Logger Module

This module provides functionality to log trading signals to Google Sheets.
"""

import pygsheets


def log_signals(df, ticker):
    """
    Log trading signals to a Google Sheet.
    
    Args:
        df: DataFrame containing signal data with a 'Close' column
        ticker: String representing the ticker symbol
        
    The function appends rows to the 'Signal Log' sheet with columns:
    - Index (from DataFrame)
    - Ticker symbol
    - Close price
    - Signal type (hardcoded as "Bounce")
    """
    gc = pygsheets.authorize(service_file='credentials.json')
    sheet = gc.open('Signal Log').sheet1
    for index, row in df.iterrows():
        sheet.append_table([str(index), ticker, row['Close'], "Bounce"])
