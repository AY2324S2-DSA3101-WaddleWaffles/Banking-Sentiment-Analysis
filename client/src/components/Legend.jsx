import React from 'react';

function Legend({ series }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {series.map((item, index) => (
        <div key={index} style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: item.color, marginRight: '5px' }}></div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
