# Github-Dashboard-

A technical analysis toolkit for stock market indicators.

## Features

### Master Bounce Indicator

The `master_bounce_indicator` function combines multiple technical indicators to identify potential bounce points in stock prices:

- **RSI (Relative Strength Index)**: Identifies oversold conditions (RSI < 30)
- **MACD (Moving Average Convergence Divergence)**: Detects momentum shifts
- **Bollinger Bands**: Identifies when prices are outside typical ranges
- **EMA (Exponential Moving Averages)**: Confirms short-term trend direction

## Installation

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### Basic Example

```python
import pandas as pd
from indicators import master_bounce_indicator

# Create or load your price data
df = pd.DataFrame({
    'Close': [100, 102, 98, 95, 97, 99, 101, 103]
})

# Apply the indicator
result = master_bounce_indicator(df)

# Check for bounce signals
bounce_points = result[result['bounce_signal'] == True]
print(bounce_points)
```

### Run Example Script

```bash
python example_usage.py
```

### Run Tests

```bash
python test_indicators.py
```

## Indicator Details

The master bounce indicator generates a signal when ALL of the following conditions are met:

1. **RSI < 30**: Stock is in oversold territory
2. **Price < Lower Bollinger Band**: Price is below the typical range
3. **MACD > MACD Signal**: Momentum is turning positive
4. **Fast EMA > Slow EMA**: Short-term trend is bullish (9-period EMA above 21-period EMA)

These combined conditions suggest a potential bounce from oversold levels with positive momentum building.

## Files

- `indicators.py`: Main module containing the `master_bounce_indicator` function
- `test_indicators.py`: Test suite for the indicators
- `example_usage.py`: Example script demonstrating usage
- `requirements.txt`: Python dependencies

## Requirements

- Python 3.7+
- pandas >= 1.3.0
- ta >= 0.10.0
- numpy >= 1.21.0

## License

MIT