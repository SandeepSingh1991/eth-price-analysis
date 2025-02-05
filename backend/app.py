from flask import Flask, jsonify
from flask_cors import CORS
import ccxt
from datetime import datetime, timedelta
import pytz

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

def fetch_ohlcv(symbol, timeframe, since, until):
    exchange = ccxt.binance()
    all_ohlcv = []
    current_since = since

    while current_since < until:
        ohlcv = exchange.fetch_ohlcv(symbol, timeframe, since=current_since)
        if not ohlcv:
            break
        all_ohlcv.extend(ohlcv)
        current_since = ohlcv[-1][0] + 1

    return all_ohlcv

@app.route('/api/data', methods=['GET'])
def get_data():
    symbol = 'ETH/USDT'
    timeframe = '15m'
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)

    since = int(start_date.timestamp() * 1000)
    until = int(end_date.timestamp() * 1000)

    ohlcv_data = fetch_ohlcv(symbol, timeframe, since, until)
    columns = ['Timestamp', 'Open', 'High', 'Low', 'Close', 'Volume']
    df = pd.DataFrame(ohlcv_data, columns=columns)

    # Convert timestamp to IST
    ist_timezone = pytz.timezone('Asia/Kolkata')
    df['DateTime_IST'] = pd.to_datetime(df['Timestamp'], unit='ms').dt.tz_localize('UTC').dt.tz_convert(ist_timezone)
    df['Date'] = df['DateTime_IST'].dt.date
    df['Time'] = df['DateTime_IST'].dt.time

    # Filter data for 00:15:00 to 08:00:00 IST
    df_filtered = df[(df['Time'] >= datetime.strptime("00:15:00", "%H:%M:%S").time()) & 
                     (df['Time'] <= datetime.strptime("08:00:00", "%H:%M:%S").time())]

    # Group by Date and calculate Opening, High, and Low
    df_summary = df_filtered.groupby('Date').agg(
        Opening=('Open', 'first'),
        High_Value=('High', 'max'),
        Low_Value=('Low', 'min')
    ).reset_index()

    # Calculate Differences
    df_summary['High_Difference'] = df_summary['High_Value'] - df_summary['Opening']
    df_summary['Low_Difference'] = df_summary['Low_Value'] - df_summary['Opening']

    return jsonify(df_summary.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)