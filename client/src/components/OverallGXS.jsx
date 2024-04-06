import { LineChart } from '@mantine/charts';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

export default function OverallGXSBySentiment({ selectedDateRange }) {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Fetch data from API endpoint
        axios.get('http://127.0.0.1:5001/reviews/months-sentiment')
            .then(response => {
                console.log('Retrieved data:', response.data);
                // Filter the fetched data based on the selected date range
                const filtered = filterDataByDateRange(response.data, selectedDateRange);
                setFilteredData(filtered);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });
    }, [selectedDateRange]); // Run effect whenever selectedDateRange changes

    // Function to filter data by date range
    const filterDataByDateRange = (data, dateRange) => {
        if (!dateRange) return data; // Return data unchanged if date range is not provided

        // Since currently data given to us is by motnhs only
        const startMonth = dateRange.startDate.getMonth();;
        const endMonth = dateRange.endDate.getMonth();
        const filteredData = {};
        const monthNames = Object.keys(data);

        // Map month names to their corresponding numeric representation
        const monthMap = {
          "January": 0,
          "February": 1,
          "March": 2,
          "April": 3,
          "May": 4,
          "June": 5,
          "July": 6,
          "August": 7,
          "September": 8,
          "October": 9,
          "November": 10,
          "December": 11
        };

        Object.entries(data).forEach(([month, sentiments]) => {
          const monthIndex = monthMap[month]; // Get month index from monthMap
          
          // Check if month index falls within the range of startMonth and endMonth
          if (monthIndex >= startMonth && monthIndex <= endMonth) {
              // Add the entry to the filteredData object
              filteredData[month] = sentiments;
          }
        });

        console.log("dateRange:", dateRange);
        console.log("startMonth:", startMonth)
        console.log("endMonth:", endMonth);
        console.log("filteredData:", filteredData);

        return filteredData;
    };

    // Function for tooltip
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

    // Process data

    // Map full month names to abbreviations
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
    };

    // Map month abbreviations to order
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

    // Convert data format for chart
    const transformedData = Object.keys(filteredData).map(month => {
        const abbreviation = monthAbbreviations[month];
        return {
            month: abbreviation,
            Positive: (filteredData[month].Positive * 100).toFixed(2),
            Neutral: (filteredData[month].Neutral * 100).toFixed(2),
            Negative: (filteredData[month].Negative * 100).toFixed(2)
        };
    });

    // Sort data by month order
    const sortedData = transformedData.sort((a, b) => {
        return monthOrder[a.month] - monthOrder[b.month];
    });

    // Calculate max value for y-axis
    const maxValue = Math.max(...sortedData.map(item => Math.max(item.Positive, item.Neutral, item.Negative)));

    // Define domain for y-axis
    const yAxisDomain = [0, maxValue] ;

    return (
        // <div style={{ marginLeft: '10px', height: "250px", marginTop: "10px", marginRight:'10px' }}>
          <LineChart
              h="100%"
              w="100%"
              data={sortedData}
              dataKey='month'
              series={[
                  {name: 'Positive', color: 'teal'},
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

        // {/* </div> */}
    );
}
