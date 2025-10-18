"""
Example usage of the master_bounce_indicator function

This script demonstrates how to use the master_bounce_indicator function
with sample stock price data.
"""

import pandas as pd
import numpy as np
from indicators import master_bounce_indicator


def main():
    """Run example with sample data."""
    print("Master Bounce Indicator - Example Usage")
    print("=" * 70)
    
    # Create sample data
    np.random.seed(42)
    dates = pd.date_range(start='2023-01-01', periods=100, freq='D')
    
    # Simulate stock price movement with a potential bounce pattern
    base_price = 100
    trend = np.linspace(0, -20, 60)  # Downward trend
    bounce = np.linspace(-20, -10, 40)  # Bounce back
    price_movement = np.concatenate([trend, bounce])
    noise = np.random.randn(100) * 2
    close_prices = base_price + price_movement + noise
    
    df = pd.DataFrame({
        'Close': close_prices
    }, index=dates)
    
    print(f"\nInput data shape: {df.shape}")
    print(f"Date range: {df.index[0].date()} to {df.index[-1].date()}")
    print(f"Price range: ${df['Close'].min():.2f} to ${df['Close'].max():.2f}")
    
    # Apply the master bounce indicator
    result = master_bounce_indicator(df)
    
    print("\n" + "=" * 70)
    print("Indicator Results:")
    print("=" * 70)
    
    # Display summary statistics
    print(f"\nRSI:")
    print(f"  Mean: {result['rsi'].mean():.2f}")
    print(f"  Min: {result['rsi'].min():.2f}")
    print(f"  Max: {result['rsi'].max():.2f}")
    
    print(f"\nMACD:")
    print(f"  Mean: {result['macd'].mean():.2f}")
    print(f"  MACD > Signal: {(result['macd'] > result['macd_signal']).sum()} times")
    
    print(f"\nBollinger Bands:")
    print(f"  Price below lower band: {(result['Close'] < result['bb_lower']).sum()} times")
    print(f"  Price above upper band: {(result['Close'] > result['bb_upper']).sum()} times")
    
    print(f"\nEMA:")
    print(f"  Fast EMA > Slow EMA: {(result['ema_fast'] > result['ema_slow']).sum()} times")
    
    print(f"\nBounce Signals:")
    print(f"  Total bounce signals: {result['bounce_signal'].sum()}")
    
    # Show rows where bounce signal is True
    if result['bounce_signal'].any():
        print("\n" + "=" * 70)
        print("Dates with Bounce Signals:")
        print("=" * 70)
        bounce_dates = result[result['bounce_signal']]
        print(bounce_dates[['Close', 'rsi', 'macd', 'macd_signal', 'bb_lower']].to_string())
    else:
        print("\nNo bounce signals detected in this dataset.")
    
    # Display last 10 rows
    print("\n" + "=" * 70)
    print("Last 10 rows of data:")
    print("=" * 70)
    display_cols = ['Close', 'rsi', 'macd', 'bounce_signal']
    print(result[display_cols].tail(10).to_string())
    
    print("\n" + "=" * 70)
    print("Explanation:")
    print("=" * 70)
    print("""
A bounce signal is triggered when ALL of the following conditions are met:
1. RSI < 30 (oversold condition)
2. Price < Lower Bollinger Band (price below typical range)
3. MACD > MACD Signal (momentum turning positive)
4. Fast EMA > Slow EMA (short-term trend is bullish)

These conditions together suggest a potential bounce from oversold levels.
    """)


if __name__ == "__main__":
    main()
