import { BarChart } from '@mantine/charts';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

function ComparisonBar() {
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
        // fetch data from API endpoint
        axios.get('http://127.0.0.1:5001/reviews/period-sentiment')
            .then(response => {
                console.log('Retrieved data:', response.data);
                const data = Array.isArray(response.data) ? response.data : [response.data]; // Ensure data is in array format
                
                setReviews(data); // Update reviewsData state
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });
    }, []);
    // Function to convert decimal to percentage
    const decimalToPercentage = (value) => {
      return parseFloat((value * 100).toFixed(2)); // Convert the percentage string to a floating-point number
    };

    // Modify data to convert decimal values to percentages
    const modifiedData = reviewsData.map((item) => {
      return {
        bank: item.bank,
        Positive: decimalToPercentage(item.Positive),
        Neutral: decimalToPercentage(item.Neutral),
        Negative: decimalToPercentage(item.Negative),
      };
    });

    console.log('Processed data:', modifiedData); // Log the processed data
    
    
    const barWidth = 10; // Width of each bar
    const xAxisPadding = modifiedData.length > 1 ? 20 : barWidth * 2; // Adjust padding based on the number of bars


    return (
      <div className = "CompChart-container" style={{ height: '300px', maxWidth: '800px', margin: '0 auto' }}> {/* Fixed height */}
        <BarChart
            h='100%'
            data={modifiedData}
            dataKey="bank"
            barProps={{ width: barWidth}}
            xAxisProps={{ padding: { left: 20, right: 20 } }}
            orientation="horizontal" 
            type = 'stacked'
            unit="%"
            series={[
                { name: 'Positive', color: 'teal.6' },
                { name: 'Neutral', color: 'blue.6' },
                { name: 'Negative', color: 'red' },
            ]}
            tooltipProps={{
                content: ({ label, payload }) => (<ChartTooltip label={label} payload={payload} unit="%"/>),
                
              }}
        />
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
        {payload.map(item => (
          <Text key={item.name} c={item.color} fz="sm">
            {item.name}: {item.value}{unit}
          </Text>
        ))}
      </Paper>
    );
}



export default ComparisonBar;
