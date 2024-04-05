import { LineChart } from '@mantine/charts';
// import {testData} from './data';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Paper, Text } from '@mantine/core';


// need data with percentages for each sentiment, according to date/month

export default function OverallGXSBySentiment() {
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
      // fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/reviews/months-sentiment')
        .then(response => {
          console.log('Retrieved data:', response.data);
          setReviews(response.data); // Update reviewsData state
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle error, e.g., display error message to user
        });
    }, []);

    // function for tooltip
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

    // process data
    delete reviewsData.bank;

    // map full month names to abbreviations
    const monthAbbreviations = {
      "January": "Jan",
      "February": "Feb",
      "March": "Mar", 
      "April": "Apr",
      "May": "May",
      "June": "Jun",
      "July": "Jul",
      "August": "Aug",
      "September": "Sep",
      "October": "Oct",
      "November": "Nov",
      "December": "Dec"
    }

    const transformedData = Object.keys(reviewsData).map(month => {
      const abbreviation = monthAbbreviations[month];
      return {
        month: abbreviation,
        Positive: (reviewsData[month].Positive * 100).toFixed(2),
        Neutral: (reviewsData[month].Neutral * 100).toFixed(2),
        Negative: (reviewsData[month].Negative * 100).toFixed(2)
      };
    });

    // map month abbreviations to order
    const monthOrder = {
      "Jan": 1,
      "Feb": 2,
      "Mar": 3,
      "Apr": 4,
      "May": 5,
      "Jun": 6,
      "Jul": 7,
      "Aug": 8,
      "Sep": 9,
      "Oct": 10,
      "Nov": 11,
      "Dec": 12
    };

    const sortedData = transformedData.sort((a,b) => {
      return monthOrder[a.month] - monthOrder[b.month];
    });

    // to get max value
    const getMaxValue = (data) => {
      return Math.max(...data.map(item => Math.max(item.Positive, item.Neutral, item.Negative)));
    };

    // calculate max value for y-axis
    const maxValue = getMaxValue(sortedData);

    // define domain for y axis
    const yAxisDomain = [0, maxValue];

    return (
        <div style={{ marginLeft: '-30px', height: "250px"  }}>
          <LineChart
              h="90%"
              // w={400}
              data={sortedData}
              dataKey='month'
              series={[
                  {name: 'Positive', color: 'teal.6'},
                  {name: 'Neutral', color: 'yellow.6'},
                  {name: 'Negative', color: 'red.6'},
              ]} 
              tooltipProps={{
                  content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
              xAxisProps={{
                tickRotation: -90 // NOT WORKING
              }}
              yAxisProps={{
                domain: yAxisDomain
              }}
              
          />

        </div>
    );
}
