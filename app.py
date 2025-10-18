import streamlit as st
from modules.data_loader import load_data
from modules.indicators import master_bounce_indicator
from modules.visuals import plot_chart
from modules.logger import log_signals

st.set_page_config(page_title="Modular Trading Dashboard", layout="wide")
st.title("📈 Modular Trading Dashboard")

ticker = st.sidebar.text_input("Ticker", "AAPL")
start_date = st.sidebar.date_input("Start Date")
end_date = st.sidebar.date_input("End Date")
simulate = st.sidebar.checkbox("Simulated Trading Mode")
show_signals = st.sidebar.checkbox("Show Bounce Signals", True)

df = load_data(ticker, start_date, end_date)
df = master_bounce_indicator(df)
plot_chart(df, show_signals)

if show_signals and df['bounce_signal'].any():
    st.success("Bounce signals detected!")
    if simulate:
        log_signals(df[df['bounce_signal']], ticker)
