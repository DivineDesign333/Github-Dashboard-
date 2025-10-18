import plotly.graph_objects as go
import streamlit as st
import pandas as pd
import yfinance as yf
import numpy as np


def calculate_bollinger_bands(df, window=20, num_std=2):
    """
    Calculate Bollinger Bands for the given dataframe.
    
    Args:
        df: DataFrame with 'Close' prices
        window: Rolling window size (default: 20)
        num_std: Number of standard deviations (default: 2)
    
    Returns:
        DataFrame with added bb_upper and bb_lower columns
    """
    df['bb_middle'] = df['Close'].rolling(window=window).mean()
    rolling_std = df['Close'].rolling(window=window).std()
    df['bb_upper'] = df['bb_middle'] + (rolling_std * num_std)
    df['bb_lower'] = df['bb_middle'] - (rolling_std * num_std)
    return df


def detect_bounce_signals(df):
    """
    Detect bounce signals where price touches lower Bollinger Band.
    
    Args:
        df: DataFrame with 'Close', 'Low', and 'bb_lower' columns
    
    Returns:
        DataFrame with added bounce_signal column
    """
    # Bounce signal when low price touches or goes below lower BB
    # and next candle closes higher
    df['bounce_signal'] = False
    
    for i in range(1, len(df)):
        if (df['Low'].iloc[i-1] <= df['bb_lower'].iloc[i-1] and 
            df['Close'].iloc[i] > df['Close'].iloc[i-1]):
            df.loc[df.index[i], 'bounce_signal'] = True
    
    return df


def plot_chart(df, show_signals):
    """
    Plot candlestick chart with Bollinger Bands and optional bounce signals.
    
    Args:
        df: DataFrame with OHLC data and Bollinger Band columns
        show_signals: Boolean to show/hide bounce signals
    """
    fig = go.Figure()
    
    # Add candlestick chart
    fig.add_trace(go.Candlestick(
        x=df.index, 
        open=df['Open'], 
        high=df['High'],
        low=df['Low'], 
        close=df['Close'], 
        name='Candlestick'
    ))
    
    # Add Bollinger Bands
    fig.add_trace(go.Scatter(
        x=df.index, 
        y=df['bb_upper'], 
        name='BB Upper',
        line=dict(color='rgba(250, 128, 114, 0.7)', width=1)
    ))
    
    fig.add_trace(go.Scatter(
        x=df.index, 
        y=df['bb_lower'], 
        name='BB Lower',
        line=dict(color='rgba(173, 216, 230, 0.7)', width=1),
        fill='tonexty',
        fillcolor='rgba(173, 216, 230, 0.1)'
    ))
    
    # Add bounce signals if enabled
    if show_signals:
        bounce = df[df['bounce_signal']]
        if not bounce.empty:
            fig.add_trace(go.Scatter(
                x=bounce.index, 
                y=bounce['Close'],
                mode='markers', 
                marker=dict(color='green', size=10, symbol='triangle-up'),
                name='Bounce Signal'
            ))
    
    # Update layout
    fig.update_layout(
        title='Stock Price with Bollinger Bands',
        yaxis_title='Price',
        xaxis_title='Date',
        template='plotly_white',
        hovermode='x unified',
        xaxis_rangeslider_visible=False
    )
    
    st.plotly_chart(fig, use_container_width=True)


def load_stock_data(ticker, period='3mo'):
    """
    Load stock data from Yahoo Finance.
    
    Args:
        ticker: Stock ticker symbol
        period: Time period (e.g., '1mo', '3mo', '6mo', '1y')
    
    Returns:
        DataFrame with OHLC data
    """
    try:
        stock = yf.Ticker(ticker)
        df = stock.history(period=period)
        
        if df.empty:
            st.error(f"No data found for ticker: {ticker}")
            return None
        
        return df
    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        return None


def main():
    """Main Streamlit application."""
    st.set_page_config(page_title="Stock Chart Dashboard", layout="wide")
    
    st.title("📈 Stock Chart Dashboard")
    st.markdown("Visualize stock prices with Bollinger Bands and bounce signals")
    
    # Sidebar controls
    st.sidebar.header("Settings")
    
    ticker = st.sidebar.text_input("Stock Ticker", value="AAPL")
    period = st.sidebar.selectbox(
        "Time Period",
        options=['1mo', '3mo', '6mo', '1y', '2y'],
        index=1
    )
    
    bb_window = st.sidebar.slider("BB Window", min_value=10, max_value=50, value=20)
    bb_std = st.sidebar.slider("BB Std Dev", min_value=1.0, max_value=3.0, value=2.0, step=0.5)
    
    show_signals = st.sidebar.checkbox("Show Bounce Signals", value=True)
    
    # Load data button
    if st.sidebar.button("Load Data") or 'df' not in st.session_state:
        with st.spinner(f"Loading data for {ticker}..."):
            df = load_stock_data(ticker, period)
            
            if df is not None:
                # Calculate Bollinger Bands
                df = calculate_bollinger_bands(df, window=bb_window, num_std=bb_std)
                
                # Detect bounce signals
                df = detect_bounce_signals(df)
                
                st.session_state.df = df
                st.session_state.ticker = ticker
                st.success(f"Data loaded successfully for {ticker}!")
    
    # Display chart if data is available
    if 'df' in st.session_state:
        df = st.session_state.df
        
        # Display metrics
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Current Price", f"${df['Close'].iloc[-1]:.2f}")
        with col2:
            price_change = df['Close'].iloc[-1] - df['Close'].iloc[-2]
            price_change_pct = (price_change / df['Close'].iloc[-2]) * 100
            st.metric("Daily Change", f"${price_change:.2f}", f"{price_change_pct:.2f}%")
        with col3:
            st.metric("BB Upper", f"${df['bb_upper'].iloc[-1]:.2f}")
        with col4:
            st.metric("BB Lower", f"${df['bb_lower'].iloc[-1]:.2f}")
        
        # Plot chart
        plot_chart(df, show_signals)
        
        # Display recent bounce signals
        if show_signals:
            bounce_dates = df[df['bounce_signal']].index
            if len(bounce_dates) > 0:
                st.subheader("Recent Bounce Signals")
                recent_bounces = df[df['bounce_signal']].tail(5)
                st.dataframe(
                    recent_bounces[['Open', 'High', 'Low', 'Close', 'bb_lower']],
                    use_container_width=True
                )
            else:
                st.info("No bounce signals detected in the current period.")
    else:
        st.info("👈 Enter a stock ticker and click 'Load Data' to get started!")


if __name__ == "__main__":
    main()
