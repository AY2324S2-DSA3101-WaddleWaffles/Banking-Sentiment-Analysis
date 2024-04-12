import React from 'react';

function Legend({ series, fontSize }) {
  return (
    <div className="legend-container" style={{ fontSize: fontSize }}>
      {series.map((item, index) => (
        <div key={index} className="legend-item">
          <div className="legend-color" style={{ backgroundColor: item.color }}></div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
