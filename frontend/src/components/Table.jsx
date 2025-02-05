import React from 'react';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Opening</th>
          <th>High</th>
          <th>Low</th>
          <th>High Diff</th>
          <th>Low Diff</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Date}</td>
            <td>{row.Opening.toFixed(2)}</td>
            <td>{row.High_Value.toFixed(2)}</td>
            <td>{row.Low_Value.toFixed(2)}</td>
            <td>{row.High_Difference.toFixed(2)}</td>
            <td>{row.Low_Difference.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;