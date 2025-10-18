"""Visualization module for creating charts and plots."""
import streamlit as st
import plotly.graph_objects as go
from plotly.subplots import make_subplots


def plot_chart(df, show_signals: bool = True):
    """
    Create an interactive chart with price data and optional bounce signals.
    
    Args:
        df (pd.DataFrame): DataFrame with OHLCV data and indicators
        show_signals (bool): Whether to display bounce signals on the chart
    """
    if df.empty:
        st.warning("No data to display")
        return
    
    # Create figure with secondary y-axis for RSI
    fig = make_subplots(
        rows=2, cols=1,
        shared_xaxes=True,
        vertical_spacing=0.03,
        row_heights=[0.7, 0.3],
        subplot_titles=('Price Chart with Indicators', 'RSI')
    )
    
    # Add candlestick chart
    fig.add_trace(
        go.Candlestick(
            x=df['Date'],
            open=df['Open'],
            high=df['High'],
            low=df['Low'],
            close=df['Close'],
            name='Price'
        ),
        row=1, col=1
    )
    
    # Add Bollinger Bands if they exist
    if 'Upper_BB' in df.columns:
        fig.add_trace(
            go.Scatter(
                x=df['Date'],
                y=df['Upper_BB'],
                name='Upper BB',
                line=dict(color='gray', dash='dash', width=1)
            ),
            row=1, col=1
        )
        
        fig.add_trace(
            go.Scatter(
                x=df['Date'],
                y=df['Lower_BB'],
                name='Lower BB',
                line=dict(color='gray', dash='dash', width=1)
            ),
            row=1, col=1
        )
        
        fig.add_trace(
            go.Scatter(
                x=df['Date'],
                y=df['SMA'],
                name='SMA',
                line=dict(color='orange', width=1)
            ),
            row=1, col=1
        )
    
    # Add bounce signals if requested
    if show_signals and 'bounce_signal' in df.columns:
        bounce_points = df[df['bounce_signal']]
        if not bounce_points.empty:
            fig.add_trace(
                go.Scatter(
                    x=bounce_points['Date'],
                    y=bounce_points['Low'],
                    mode='markers',
                    name='Bounce Signal',
                    marker=dict(
                        color='green',
                        size=10,
                        symbol='triangle-up',
                        line=dict(color='darkgreen', width=2)
                    )
                ),
                row=1, col=1
            )
    
    # Add RSI indicator
    if 'RSI' in df.columns:
        fig.add_trace(
            go.Scatter(
                x=df['Date'],
                y=df['RSI'],
                name='RSI',
                line=dict(color='purple', width=2)
            ),
            row=2, col=1
        )
        
        # Add RSI reference lines
        fig.add_hline(y=70, line_dash="dash", line_color="red", 
                      annotation_text="Overbought", row=2, col=1)
        fig.add_hline(y=30, line_dash="dash", line_color="green", 
                      annotation_text="Oversold", row=2, col=1)
    
    # Update layout
    fig.update_layout(
        title='Trading Chart',
        xaxis_title='Date',
        yaxis_title='Price',
        height=800,
        showlegend=True,
        hovermode='x unified'
    )
    
    fig.update_xaxes(rangeslider_visible=False)
    
    # Display the chart
    st.plotly_chart(fig, use_container_width=True)
