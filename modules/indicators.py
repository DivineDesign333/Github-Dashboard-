"""Technical indicators module for bounce detection."""
import pandas as pd
import numpy as np


def master_bounce_indicator(df: pd.DataFrame, lookback: int = 20) -> pd.DataFrame:
    """
    Apply master bounce indicator to identify potential bounce points.
    
    This indicator looks for:
    - Price touching or crossing below a support level (lower Bollinger Band)
    - RSI oversold conditions (< 30)
    - Potential reversal patterns
    
    Args:
        df (pd.DataFrame): DataFrame with OHLCV data
        lookback (int): Lookback period for calculations
        
    Returns:
        pd.DataFrame: DataFrame with bounce_signal column added
    """
    if df.empty:
        df['bounce_signal'] = False
        return df
    
    # Calculate Bollinger Bands
    df['SMA'] = df['Close'].rolling(window=lookback).mean()
    df['STD'] = df['Close'].rolling(window=lookback).std()
    df['Upper_BB'] = df['SMA'] + (2 * df['STD'])
    df['Lower_BB'] = df['SMA'] - (2 * df['STD'])
    
    # Calculate RSI
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # Calculate price momentum
    df['Price_Change'] = df['Close'].pct_change()
    
    # Bounce signal conditions:
    # 1. Price is near or below lower Bollinger Band
    # 2. RSI is oversold (< 30)
    # 3. Price shows positive momentum (bounce up)
    bounce_condition = (
        (df['Close'] <= df['Lower_BB'] * 1.02) &  # Within 2% of lower BB
        (df['RSI'] < 35) &  # Oversold
        (df['Price_Change'] > 0)  # Positive momentum
    )
    
    df['bounce_signal'] = bounce_condition
    
    return df
