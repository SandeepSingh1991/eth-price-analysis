async function fetchCryptoData(symbol = "ETH/USDT") {
    const exchange = new ccxt.binance();
    const since = Date.now() - (30 * 24 * 60 * 60 * 1000);  // Last 30 days
    const timeframe = "1h"; // 1-hour interval

    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, since);
    
    return ohlcv.map(data => ({
        date: new Date(data[0]).toISOString().split("T")[0], // Convert timestamp to date
        open: data[1],
        high: data[2],
        low: data[3],
        close: data[4],
    }));
}
