import { Select } from '@mantine/core';
import React from 'react';

function ChooseBank({availableBanks, refreshFlag}) {
    console.log('Available Banks:', availableBanks);
    const banksWithoutGXS = availableBanks.filter(bank => bank !== "GXS");

  return (
    <Select
      label="Selected Bank for Comparison:"
      placeholder="No Bank Selected"
      data={banksWithoutGXS}
      style={{ width: '300px' }}
      
      clearable
    />
  );
}

export default ChooseBank;
