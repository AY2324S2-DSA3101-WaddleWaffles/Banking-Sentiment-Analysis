import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from '@mantine/core';

function TableBanksCount() {
  const [countData, setCountData] = useState(null);

  useEffect(() => {
    // Fetch data from API endpoint
    axios.get('http://127.0.0.1:5001/reviews/counts')
      .then(response => {
        console.log('Retrieved data:', response.data);
        setCountData(response.data); // Set the fetched data in state
      })
      .catch(error => {
        console.error('Error fetching count data:', error);
      });
  }, []); // Only run this effect once, similar to componentDidMount

  if (!countData) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  // Map over the fetched data to generate table rows
  const rows = countData.map(item => (
    <Table.Tr key={item.bank}>
      <Table.Td>{item.bank}</Table.Td>
      <Table.Td>{item.count}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Bank</Table.Th>
          <Table.Th>Count</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default TableBanksCount;
