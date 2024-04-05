import { useEffect, useState } from 'react';
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

  // Convert the dictionary into an array of objects
  const rows = Object.entries(countData).map(([bank, count]) => (
    <Table.Tr key={bank}>
      <Table.Td>{bank}</Table.Td>
      <Table.Td>{count}</Table.Td>
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
