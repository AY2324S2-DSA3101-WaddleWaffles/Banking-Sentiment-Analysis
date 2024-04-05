import React, { useState, useEffect } from 'react';
import { LineChart } from '@mantine/charts';
import axios from 'axios';
import Legend from './Legend';
import { Paper, Text, Button, Grid } from '@mantine/core';

export default function ComparisonLine() {
  const [banksData, setBanksData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBanks, setSelectedBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/reviews/average-rating');
        setBanksData(response.data);
      } catch (error) {
        console.error('Error fetching count data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, []); 

  const toggleBankSelection = (bank) => {
    if (selectedBanks.includes(bank)) {
      setSelectedBanks(selectedBanks.filter((selectedBank) => selectedBank !== bank));
    } else {
      setSelectedBanks([...selectedBanks, bank]);
    }
  };

  const processDataForLineChart = (data) => {
    if (!data) {
      return []; // Return an empty array if data is undefined or null
    }
  
    const dates = Object.keys(data['DBS']).filter(date => date !== 'total'); // Assuming all banks have the same dates
    
    const processedData = [];

    // Loop through each date 
    dates.forEach((date) => {
      // Initialize object for each date
      const obj = { date };

      // Loop through each bank 
      selectedBanks.forEach((bank) => {
        // Assign bank's rating for current date to object
        obj[bank] = data[bank][date] || null;
      });

      // Push object to the processed data array
      processedData.push(obj);
    });

    return processedData;
  };
   
  const processedData = processDataForLineChart(banksData);

  console.log('Processed data: ', processedData);
  
  return (
    <div>
      {isLoading ? (
        <div>
          <h2>Bank Ratings Over Time</h2>
          <p>Loading...</p>
        </div>
      ) : (
        <Grid gutter="md" style={{ width: '100%', height: '100vh' }}>
          <Grid.Col span={8}>
            <Legend series={[
              { name: 'GXS', color: 'violet' },
              { name: 'DBS', color: '#b01717' },
              { name: 'MariBank', color: '#ffaf00' },
              { name: 'OCBC', color: '#ff69b4' },
              { name: 'UOB', color: '#00b7c2' },
              { name: 'Trust', color: '#006fff' },
            ]} />
            <LineChart
              h={300}
              data={processedData}
              dataKey="date"
              series={[
                { name: 'GXS', color: 'violet', dataKey: 'GXS', strokeWidth: 4 },
                { name: 'DBS', color: '#b01717', dataKey: 'DBS' },
                { name: 'MariBank', color: '#ffaf00', dataKey: 'MariBank' },
                { name: 'OCBC', color: '#ff69b4', dataKey: 'OCBC' },
                { name: 'UOB', color: '#00b7c2', dataKey: 'UOB' },
                { name: 'Trust', color: '#006fff', dataKey: 'Trust' },
              ]}
              connectNulls
              tooltipProps={{
                content: ({ label, payload }) => (<ChartTooltip label={label} payload={payload} />),
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <div>
              {Object.keys(banksData).map((bank) => (
                <Button
                  key={bank}
                  onClick={() => toggleBankSelection(bank)}
                  color={selectedBanks.includes(bank) ? 'violet' : 'gray'}
                  variant="outline"
                  style={{ marginBottom: '10px' }}
                  fullWidth
                >
                  {bank}
                </Button>
              ))}
            </div>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};

function ChartTooltip({ label, payload }) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map(item => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}
