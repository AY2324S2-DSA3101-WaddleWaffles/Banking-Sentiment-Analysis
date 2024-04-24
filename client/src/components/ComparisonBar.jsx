import { BarChart } from '@mantine/charts';
import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

function ComparisonBar({ selectedDateRange, refreshFlag  }) {
  const [sentimentData, setSentiments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const newStartDate = selectedDateRange.startDate;
  const newEndDate = selectedDateRange.endDate;
  // change format of start and end date to dd-mm-yyyy
  const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
  const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

  const api = `http://127.0.0.1:5001/reviews/average-sentiment?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api.toString());
        const jsonData = await response.json();
        setSentiments(jsonData);
      } catch (error) {
        console.error('Error fetching bar graph data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [selectedDateRange, refreshFlag ]); 
 
  const processedSentData = processData(sentimentData);

  return (
    <div  style={{ height: '350px', width: '100%' }}>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <BarChart
          h="100%"
          w = "100%"
          data={processedSentData}
          dataKey="bank"
          barProps={{ width: 10 }}
          yAxisProps={{padding:{ top: 20}}}
          xAxisProps={{ padding: { left: processedSentData.length > 1 ? 20 : 40, right: 20 } }} // Adjust padding based on the number of bars
          orientation="horizontal"
          type="percent"
          series={[
            { name: 'Positive', color: 'teal.6' },
            { name: 'Neutral', color: 'yellow.6' },
            { name: 'Negative', color: 'red' },
          ]}
          tooltipProps={{
            content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} unit="%" />,
          }}
        />
      )}
    </div>
  );
}

function ChartTooltip({ label, payload, unit }) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="lg" radius="md">
      <Text fw={500} mb={5} style={{color: 'black'}}>
        {label}
      </Text>
      {payload.map((item) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {(item.value * 100).toFixed(1)}
          {unit}
        </Text>
      ))}
    </Paper>
  );
}

const processData = (reviewsData) => {
  if (!reviewsData) {
    return [];
  }

  return reviewsData.map((bankData) => ({
    bank: bankData.bank,
    Positive: bankData.total_sentiments.Positive,
    Neutral: bankData.total_sentiments.Neutral,
    Negative: bankData.total_sentiments.Negative,
  }));
};

export default ComparisonBar;
