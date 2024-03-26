import React, { useState, useEffect } from 'react';
import { BarChart } from '@mantine/charts'; 
import { Paper, Text } from '@mantine/core';
import axios from 'axios';


function BarChartComponent() {
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
      // fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/api/reviews')
        .then(response => {
          console.log('Retrieved data:', response.data);
          setReviews(response.data); // Update reviewsData state
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle error, e.g., display error message to user
        });
    }, []);
  
    // function to process data and calculate sentiment counts for each topic
    const processData = () => {
      const topics = {};
      for (const review of reviewsData) {
        const { topic, sentiment } = review;
        console.log('Processing review:', { topic, sentiment });
        // Capitalize the first letter of the topic
        const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
        if (!topics[capitalizedTopic]) {
          topics[capitalizedTopic] = { pos: 0, neu: 0, neg: 0 };
        }
        topics[capitalizedTopic][sentiment]++;
        console.log('Updated topics:', topics);
      }
      return Object.keys(topics).map(topic => ({
        topic,
        Positive: topics[topic].pos,
        Neutral: topics[topic].neu,
        Negative: topics[topic].neg
      }));
    };
  
    const data = processData();
    console.log('Processed data:', data); // Log the processed data

    return (
        <BarChart
            h={150}
            w={550}
            data={data}
            dataKey="topic"
            type="stacked"
            orientation="vertical"
            yAxisProps={{ width: 70 }}
            xAxisProps={{ height: 30,
                labelProps: { weight: 100, size: 'lg' }}}
            series={[
                { name: 'Positive', color: 'green' },
                { name: 'Neutral', color: 'blue.6' },
                { name: 'Negative', color: 'red' },
            ]}
            tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
            
        />
            
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

export default BarChartComponent;