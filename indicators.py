"""
Technical Analysis Indicators Module

This module provides various technical analysis indicators for stock market analysis.
"""

import ta


def master_bounce_indicator(df):
    """
    Calculate the master bounce indicator based on multiple technical indicators.
    
    This indicator combines RSI, MACD, Bollinger Bands, and EMAs to identify 
    potential bounce points in the market.
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame containing stock price data with at least a 'Close' column
        
    Returns:
    --------
    pandas.DataFrame
        Original DataFrame with additional columns:
        - rsi: Relative Strength Index
        - macd: MACD line
        - macd_signal: MACD signal line
        - bb_upper: Bollinger Bands upper band
        - bb_lower: Bollinger Bands lower band
        - ema_fast: Fast EMA (9 period)
        - ema_slow: Slow EMA (21 period)
        - bounce_signal: Boolean indicating potential bounce signal
        
    Example:
    --------
    >>> import pandas as pd
    >>> df = pd.DataFrame({'Close': [100, 102, 98, 95, 97, 99, 101]})
    >>> result = master_bounce_indicator(df)
    """
    # Calculate RSI
    df['rsi'] = ta.momentum.RSIIndicator(close=df['Close']).rsi()
    
    # Calculate MACD
    macd = ta.trend.MACD(close=df['Close'])
    df['macd'] = macd.macd()
    df['macd_signal'] = macd.macd_signal()
    
    # Calculate Bollinger Bands
    boll = ta.volatility.BollingerBands(close=df['Close'])
    df['bb_upper'] = boll.bollinger_hband()
    df['bb_lower'] = boll.bollinger_lband()
    
    # Calculate EMAs
    df['ema_fast'] = ta.trend.EMAIndicator(close=df['Close'], window=9).ema_indicator()
    df['ema_slow'] = ta.trend.EMAIndicator(close=df['Close'], window=21).ema_indicator()
    
    # Generate bounce signal
    df['bounce_signal'] = (
        (df['rsi'] < 30) &
        (df['Close'] < df['bb_lower']) &
        (df['macd'] > df['macd_signal']) &
        (df['ema_fast'] > df['ema_slow'])
    )
    
    return df
