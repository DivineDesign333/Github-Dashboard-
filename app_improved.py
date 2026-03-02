import numpy as np
import pandas as pd

def calculate_bounce_signal(data: pd.DataFrame) -> pd.Series:
    """
    Calculate the bounce signals based on input data.

    Parameters:
    - data: DataFrame containing price information

    Returns:
    - Series containing bounce signals
    """
    if not isinstance(data, pd.DataFrame):
        raise ValueError("Input data must be a Pandas DataFrame.")

    try:
        # Assume the DataFrame has 'close' prices necessary for bounce calculations
        prices = data['close'].values
        bounce_signals = np.where(prices > np.roll(prices, 1), 1, 0)
        return pd.Series(bounce_signals, index=data.index)
    except Exception as e:
        raise RuntimeError("Error calculating bounce signals: " + str(e))

# Example usage
if __name__ == "__main__":
    # Sample data -- this would typically be loaded from a file or API
    sample_data = pd.DataFrame({
        'close': [100, 105, 102, 110, 108, 112]
    })
    
    try:
        signals = calculate_bounce_signal(sample_data)
        print("Bounce Signals:", signals)
    except Exception as error:
        print("An error occurred:", error)