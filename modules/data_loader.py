"""Data loader module for fetching stock market data."""

import yfinance as yf
import pandas as pd
import streamlit as st


def load_data(ticker, start_date, end_date):
    """
    Load stock data from Yahoo Finance.
    
    Args:
        ticker (str): Stock ticker symbol
        start_date (datetime.date): Start date for data
        end_date (datetime.date): End date for data
    
    Returns:
        pd.DataFrame: Stock data with OHLCV columns
    """
    try:
        data = yf.download(ticker, start=start_date, end=end_date, progress=False)
        
        if data.empty:
            st.error(f"No data found for ticker {ticker}")
            return pd.DataFrame()
        
        # Reset index to have Date as a column
        data.reset_index(inplace=True)
        
        return data
    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        return pd.DataFrame()
