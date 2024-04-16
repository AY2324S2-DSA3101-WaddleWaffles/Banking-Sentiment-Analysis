import { Select } from '@mantine/core';
import React from 'react';

function ChooseBank({ availableBanks, onSelectBank }) {
  console.log('Available Banks:', availableBanks);
  const banksWithoutGXS = availableBanks.filter(bank => bank !== "GXS");

  const handleBankSelect = (value) => {
    onSelectBank(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Select
        label="Selected Bank for Comparison:"
        placeholder="No Bank Selected"
        data={banksWithoutGXS}
        style={{ width: '300px' }}
        clearable
        onChange={handleBankSelect}
      />
    </div>
  );
}

export default ChooseBank;
