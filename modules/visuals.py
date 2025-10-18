"""Visualization module for creating charts."""

import plotly.graph_objects as go
import streamlit as st


def plot_chart(df, show_signals=True):
    """
    Create an interactive candlestick chart with optional bounce signals.
    
    Args:
        df (pd.DataFrame): DataFrame with OHLCV data and indicators
        show_signals (bool): Whether to show bounce signals on the chart
    """
    if df.empty:
        st.warning("No data to display")
        return
    
    fig = go.Figure()
    
    # Add candlestick chart
    fig.add_trace(go.Candlestick(
        x=df['Date'],
        open=df['Open'],
        high=df['High'],
        low=df['Low'],
        close=df['Close'],
        name='Price'
    ))
    
    # Add moving average if available
    if 'MA20' in df.columns:
        fig.add_trace(go.Scatter(
            x=df['Date'],
            y=df['MA20'],
            mode='lines',
            name='MA20',
            line=dict(color='orange', width=2)
        ))
    
    # Add bounce signals if requested
    if show_signals and 'bounce_signal' in df.columns:
        bounce_points = df[df['bounce_signal'] == True]
        if not bounce_points.empty:
            fig.add_trace(go.Scatter(
                x=bounce_points['Date'],
                y=bounce_points['Low'],
                mode='markers',
                name='Bounce Signal',
                marker=dict(
                    symbol='triangle-up',
                    size=15,
                    color='green',
                    line=dict(color='darkgreen', width=2)
                )
            ))
    
    # Update layout
    fig.update_layout(
        title='Stock Price Chart with Indicators',
        yaxis_title='Price',
        xaxis_title='Date',
        template='plotly_white',
        height=600,
        xaxis_rangeslider_visible=False
    )
    
    st.plotly_chart(fig, use_container_width=True)
