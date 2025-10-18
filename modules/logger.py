"""Logging module for trading signals."""

import streamlit as st
from datetime import datetime


def log_signals(signal_df, ticker):
    """
    Log bounce signals for simulated trading.
    
    Args:
        signal_df (pd.DataFrame): DataFrame containing rows with bounce signals
        ticker (str): Stock ticker symbol
    """
    if signal_df.empty:
        st.info("No signals to log")
        return
    
    st.subheader(f"📊 Simulated Trading Signals for {ticker}")
    
    # Display signal details
    for idx, row in signal_df.iterrows():
        date = row['Date'].strftime('%Y-%m-%d') if hasattr(row['Date'], 'strftime') else str(row['Date'])
        price = row['Close']
        
        st.write(f"**Signal Date:** {date}")
        st.write(f"**Price:** ${price:.2f}")
        st.write(f"**Action:** BUY (Bounce Signal Detected)")
        st.write("---")
    
    # Summary
    total_signals = len(signal_df)
    st.success(f"Total signals logged: {total_signals}")
