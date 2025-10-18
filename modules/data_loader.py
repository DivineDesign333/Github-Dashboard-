"""Data loading module for fetching stock market data."""
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import streamlit as st


@st.cache_data
def load_data(ticker: str, start_date=None, end_date=None):
    """
    Load stock data from Yahoo Finance.
    
    Args:
        ticker (str): Stock ticker symbol (e.g., 'AAPL', 'TSLA')
        start_date: Start date for data retrieval
        end_date: End date for data retrieval
        
    Returns:
        pd.DataFrame: DataFrame with OHLCV data
    """
    try:
        # Set default dates if not provided
        if end_date is None:
            end_date = datetime.now()
        if start_date is None:
            start_date = end_date - timedelta(days=365)
        
        # Download data from Yahoo Finance
        df = yf.download(ticker, start=start_date, end=end_date, progress=False)
        
        if df.empty:
            st.error(f"No data found for ticker {ticker}")
            return pd.DataFrame()
        
        # Reset index to make Date a column
        df = df.reset_index()
        
        return df
    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        return pd.DataFrame()
