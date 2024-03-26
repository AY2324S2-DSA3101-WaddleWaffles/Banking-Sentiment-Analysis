import { BarChart } from '@mantine/charts';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

function ComparisonChart() {
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

    // function to process data and calculate sentiment counts for each bank
    const processData = () => {
        const banksSentiments = {};

        for (const review of reviewsData) {
            const { bank, sentiment } = review;

            if (!banksSentiments[bank]) {
                banksSentiments[bank] = { pos: 0, neu: 0, neg: 0 };
            }

            banksSentiments[bank][sentiment]++;
        }

        // Convert sentiment counts to an array of objects
        const data = Object.keys(banksSentiments).map(bank => ({
            bank,
            Positive: banksSentiments[bank].pos,
            Neutral: banksSentiments[bank].neu,
            Negative: banksSentiments[bank].neg
        }));

        return data;
    };

    const data = processData();
    console.log('Processed data:', data); // Log the processed data

    return (
        <BarChart
            h={180}
            data={data}
            dataKey="bank"
            barProps={{ radius: 10 }}
            xAxisProps={{ padding: { left: 30, right: 30 } }}
            series={[
                { name: 'Positive', color: 'teal.6' },
                { name: 'Neutral', color: 'blue.6' },
                { name: 'Negative', color: 'red' },
            ]}
            tooltipProps={{
                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
        />
    );
}

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

export default ComparisonChart;
