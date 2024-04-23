import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';
import classes from './insightsComparison.module.css';

function TableBanksCount({selectedDateRange, refreshFlag, setAvailableBanks }) {
  const [countData, setCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // save updated start and end dates into variable
  const newStartDate = selectedDateRange.startDate;
  const newEndDate = selectedDateRange.endDate;

  // change format of start and end date to dd-mm-yyyy
  const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
  const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

  const api = `http://127.0.0.1:5001/reviews/counts?start-date=${formattedStartDate}&end-date=${formattedEndDate}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api.toString());
        const jsonData = await response.json();
        setCountData(jsonData); // Set the fetched data in state
        // Select all banks by default
        setAvailableBanks(jsonData.map(entry => entry.bank));
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching count data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDateRange, refreshFlag ]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const rows = countData.map(item => (
    <Table.Tr key={item.bank}>
      <Table.Td >{item.bank}</Table.Td>
      <Table.Td>{item.count}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover className = {classes.custom}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th  style={{ textAlign: 'center' }}>Bank</Table.Th>
          <Table.Th  style={{ textAlign: 'center' }}>Count</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default TableBanksCount;
