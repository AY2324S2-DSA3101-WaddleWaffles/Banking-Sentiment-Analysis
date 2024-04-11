import { BarChart } from '@mantine/charts';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

function ComparisonBar({ selectedDateRange }) {
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
        const response = await fetch(api.toString());
        const jsonData = await response.json();
        setSentiments(jsonData); // Update reviewsData state
        console.log("retrieved bar data:", jsonData);
      } catch (error) {
        console.error('Error fetching bar graph data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function to fetch data when the component mounts
  }, [selectedDateRange]); // Empty dependency array means this effect runs only once after the component mounts

  console.log('Retrieved bar data:', sentimentData);
  // Function to process JSON data
  const processedSentData = processData(sentimentData);

  // Log the processed data
  console.log('Processed bar data:', processedSentData);

  return (
    <div className="CompChart-container" style={{ height: '300px', maxWidth: '800px', margin: '0 auto' }}>
      {isLoading ? (
        <div>
          <h2>Comparative Analysis</h2>
          <p>Loading...</p>
        </div>
      ) : (
        <BarChart
          h={250}
          w = {400}
          data={processedSentData}
          dataKey="bank"
          barProps={{ width: 10 }}
          xAxisProps={{ padding: { left: processedSentData.length > 1 ? 20 : 40, right: 20 } }} // Adjust padding based on the number of bars
          orientation="horizontal"
          type="percent"
          series={[
            { name: 'Positive', color: 'teal.6' },
            { name: 'Neutral', color: 'blue.6' },
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
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
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

// Function to process JSON data
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
