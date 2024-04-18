import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  console.log("table api:" , api);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(api.toString());
        const jsonData = await response.json();
        console.log('Retrieved data:', response.data);
        setCountData(jsonData); // Set the fetched data in state

        // Select all banks by default
        setAvailableBanks(jsonData.map(entry => entry.bank));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching count data:', error);
      } finally {
        //setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDateRange, refreshFlag ]); // Only run this effect once, similar to componentDidMount

  if (!countData) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  // Map over the fetched data to generate table rows
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
          {/* need to fix alignment of header */}
          <Table.Th  style={{ textAlign: 'center' }}>Bank</Table.Th>
          <Table.Th  style={{ textAlign: 'center' }}>Count</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default TableBanksCount;
