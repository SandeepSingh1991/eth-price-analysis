async function updateCharts() {
    const data = await fetchCryptoData();

    const dates = data.map(d => d.date);
    const openingPrices = data.map(d => d.open);
    const highPrices = data.map(d => d.high);
    const lowPrices = data.map(d => d.low);

    // Line Chart: Opening, High, Low Prices
    new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: dates,
            datasets: [
                { label: "Opening", data: openingPrices, borderColor: "blue", fill: false },
                { label: "High", data: highPrices, borderColor: "red", fill: false },
                { label: "Low", data: lowPrices, borderColor: "green", fill: false },
            ],
        },
    });

    // Bar Chart: High - Low Differences
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: dates,
            datasets: [
                { label: "High - Opening", data: highPrices.map((h, i) => h - openingPrices[i]), backgroundColor: "red" },
                { label: "Low - Opening", data: lowPrices.map((l, i) => l - openingPrices[i]), backgroundColor: "green" },
            ],
        },
    });
}

updateCharts();
