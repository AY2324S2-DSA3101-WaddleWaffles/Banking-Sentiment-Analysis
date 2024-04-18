import React from 'react';


function Legend({ series, fontSize }) {
  return (
    <div className="legend-container" style={{ fontSize: fontSize, display: 'flex' }}>
      {series.map((item, index) => (
        <div key={index} className="legend-item-container">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }}></div>
            <span>{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
