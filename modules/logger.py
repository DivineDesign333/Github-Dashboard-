"""Logger module for recording trading signals and events."""
import pandas as pd
import streamlit as st
from datetime import datetime
import os


def log_signals(signal_df: pd.DataFrame, ticker: str):
    """
    Log bounce signals to file and display them.
    
    Args:
        signal_df (pd.DataFrame): DataFrame containing rows with bounce signals
        ticker (str): Stock ticker symbol
    """
    if signal_df.empty:
        st.info("No signals to log")
        return
    
    # Prepare log entry
    log_entries = []
    for idx, row in signal_df.iterrows():
        log_entry = {
            'Timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'Ticker': ticker,
            'Date': row['Date'],
            'Close': row['Close'],
            'RSI': row.get('RSI', 'N/A'),
            'Signal': 'BOUNCE'
        }
        log_entries.append(log_entry)
    
    # Display signals in Streamlit
    st.subheader("🔔 Detected Signals")
    st.dataframe(
        pd.DataFrame(log_entries),
        use_container_width=True,
        hide_index=True
    )
    
    # Save to log file
    log_file = 'trading_signals.csv'
    log_df = pd.DataFrame(log_entries)
    
    try:
        # Append to existing log file or create new one
        if os.path.exists(log_file):
            existing_log = pd.read_csv(log_file)
            log_df = pd.concat([existing_log, log_df], ignore_index=True)
        
        log_df.to_csv(log_file, index=False)
        st.success(f"✅ Logged {len(log_entries)} signal(s) to {log_file}")
    except Exception as e:
        st.warning(f"Could not save to file: {str(e)}")
