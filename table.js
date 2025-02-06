async function updateTable() {
    const tableBody = document.querySelector("#cryptoTable tbody");
    tableBody.innerHTML = ""; // Clear old data

    const data = await fetchCryptoData();

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.date}</td>
                        <td>${row.open.toFixed(2)}</td>
                        <td>${row.high.toFixed(2)}</td>
                        <td>${row.low.toFixed(2)}</td>
                        <td>${row.close.toFixed(2)}</td>`;
        tableBody.appendChild(tr);
    });
}

updateTable();
