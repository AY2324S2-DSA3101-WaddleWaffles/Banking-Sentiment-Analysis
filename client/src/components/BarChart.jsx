import React, { useState, useEffect } from 'react';
import { BarChart } from '@mantine/charts'; 
import { Paper, Text } from '@mantine/core';
import axios from 'axios';


function SentimentByTopic() {
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
      // fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/reviews/topics-sentiment')
        .then(response => {
          console.log('Retrieved data:', response.data);
          setReviews(response.data); // Update reviewsData state
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle error, e.g., display error message to user
        });
    }, []);
  
    
    // process data
    const transformedData = Object.keys(reviewsData).map(feature => ({
      feature: feature.charAt(0).toUpperCase() + feature.slice(1), // capitalise first letter
      Negative: (reviewsData[feature]["Negative"] * 100).toFixed(2),
      Neutral: (reviewsData[feature]["Neutral"] * 100).toFixed(2), 
      Positive: (reviewsData[feature]["Positive"] * 100).toFixed(2)
    }));


    return (
      <div style={{ marginRight: '10px', height: "250px",padding: '20px'  }}>
        <BarChart
            h='150%'
            w={600}
            data={transformedData}
            dataKey="feature"
            type="stacked"
            orientation="vertical"
            yAxisProps={{ width: 100 }}
            xAxisProps={{ height: 30,
                labelProps: { weight: 100, size: 'lg' },
                unit: "%"}}
            series={[
                { name: 'Positive', color: 'teal.6' },
                { name: 'Neutral', color: 'yellow.6' },
                { name: 'Negative', color: 'red.6' },
            ]}
            tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
            
            
        />
      </div>       
    )
}

// Tooltip component
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

export default SentimentByTopic;