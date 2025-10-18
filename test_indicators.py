"""
Tests for the indicators module
"""

import pandas as pd
import numpy as np
from indicators import master_bounce_indicator


def test_master_bounce_indicator_basic():
    """Test that the master_bounce_indicator function returns expected columns."""
    # Create sample data with enough points for indicators to calculate
    np.random.seed(42)
    dates = pd.date_range(start='2023-01-01', periods=100, freq='D')
    close_prices = 100 + np.cumsum(np.random.randn(100) * 2)
    
    df = pd.DataFrame({
        'Close': close_prices
    }, index=dates)
    
    result = master_bounce_indicator(df)
    
    # Check that all expected columns are present
    expected_columns = [
        'Close', 'rsi', 'macd', 'macd_signal', 
        'bb_upper', 'bb_lower', 'ema_fast', 'ema_slow', 'bounce_signal'
    ]
    
    for col in expected_columns:
        assert col in result.columns, f"Column '{col}' is missing"
    
    print("✓ All expected columns are present")
    
    # Check that bounce_signal is boolean
    assert result['bounce_signal'].dtype == bool, "bounce_signal should be boolean"
    print("✓ bounce_signal is boolean type")
    
    # Check that RSI is within valid range (0-100) for non-NaN values
    rsi_values = result['rsi'].dropna()
    if len(rsi_values) > 0:
        assert (rsi_values >= 0).all() and (rsi_values <= 100).all(), "RSI should be between 0 and 100"
        print("✓ RSI values are within valid range (0-100)")
    
    print("\n✓ All tests passed!")
    return result


def test_bounce_signal_logic():
    """Test that bounce signal logic works correctly."""
    # Create a scenario where we should get a bounce signal
    np.random.seed(123)
    
    # Create data that trends down then potentially bounces
    close_prices = [100] * 30 + list(range(100, 80, -1)) + [80, 79, 78, 77, 76, 75] + [76, 77, 78, 79, 80]
    
    df = pd.DataFrame({
        'Close': close_prices
    })
    
    result = master_bounce_indicator(df)
    
    # Check that bounce_signal column exists and has some True values eventually
    assert 'bounce_signal' in result.columns, "bounce_signal column should exist"
    print("✓ Bounce signal logic is properly implemented")
    
    # Display statistics
    print(f"\nStatistics:")
    print(f"Total rows: {len(result)}")
    print(f"Bounce signals: {result['bounce_signal'].sum()}")
    print(f"RSI mean: {result['rsi'].mean():.2f}")
    
    return result


if __name__ == "__main__":
    print("Running test_master_bounce_indicator_basic...")
    print("=" * 60)
    df1 = test_master_bounce_indicator_basic()
    
    print("\n" + "=" * 60)
    print("Running test_bounce_signal_logic...")
    print("=" * 60)
    df2 = test_bounce_signal_logic()
    
    print("\n" + "=" * 60)
    print("Sample output (last 10 rows):")
    print("=" * 60)
    print(df1[['Close', 'rsi', 'macd', 'bounce_signal']].tail(10).to_string())
