"""Technical indicators module for trading signals."""

import pandas as pd
import numpy as np


def master_bounce_indicator(df):
    """
    Calculate bounce signals based on price action.
    
    This indicator identifies potential bounce points using:
    - Price below moving average
    - Recent upward momentum
    - Volume confirmation
    
    Args:
        df (pd.DataFrame): DataFrame with OHLCV data
    
    Returns:
        pd.DataFrame: DataFrame with added bounce_signal column
    """
    if df.empty:
        return df
    
    # Calculate 20-period moving average
    df['MA20'] = df['Close'].rolling(window=20).mean()
    
    # Calculate price change
    df['Price_Change'] = df['Close'].pct_change()
    
    # Calculate volume moving average
    df['Volume_MA'] = df['Volume'].rolling(window=20).mean()
    
    # Initialize bounce signal column
    df['bounce_signal'] = False
    
    # Bounce signal conditions:
    # 1. Price crosses above MA20
    # 2. Positive price change
    # 3. Volume above average
    for i in range(1, len(df)):
        if pd.notna(df['MA20'].iloc[i]) and pd.notna(df['MA20'].iloc[i-1]):
            price_below_ma_prev = df['Close'].iloc[i-1] < df['MA20'].iloc[i-1]
            price_above_ma_curr = df['Close'].iloc[i] >= df['MA20'].iloc[i]
            positive_momentum = df['Price_Change'].iloc[i] > 0
            volume_confirm = df['Volume'].iloc[i] > df['Volume_MA'].iloc[i]
            
            if price_below_ma_prev and price_above_ma_curr and positive_momentum and volume_confirm:
                df.loc[df.index[i], 'bounce_signal'] = True
    
    return df
