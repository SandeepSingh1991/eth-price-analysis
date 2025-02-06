import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import Charts from './components/Charts';
import './styles.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app">
      <h1>ETH Price Analysis (IST)</h1>
      <div className="container">
        <div className="table-container">
          <Table data={data} />
        </div>
        <div className="chart-container">
          <Charts data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;