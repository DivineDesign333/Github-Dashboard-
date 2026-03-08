import yfinance as yf

def load_data(ticker: str, start: str, end: str):
    """
    Load historical price data for a given ticker symbol and date range.

    Parameters
    ----------
    ticker : str
        Ticker symbol understood by `yfinance` (for example, "AAPL" or "MSFT").
    start : str
        Start date for the time series, typically in "YYYY-MM-DD" format or any
        date-like string accepted by `yfinance.download`.
    end : str
        End date for the time series, typically in "YYYY-MM-DD" format or any
        date-like string accepted by `yfinance.download`.

    Returns
    -------
    DataFrame
        A pandas DataFrame of historical market data with all rows containing
        missing values removed (`dropna` is called with `inplace=True`).
    """
    df = yf.download(ticker, start=start, end=end)
    df.dropna(inplace=True)
    return df
