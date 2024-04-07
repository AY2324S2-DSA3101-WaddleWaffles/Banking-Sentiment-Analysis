import React, { useState, useEffect } from 'react';
import { BarChart } from '@mantine/charts'; 
import { Paper, Text } from '@mantine/core';
import axios from 'axios';


export default function SentimentByTopic({selectedDateRange}) {

    console.log(selectedDateRange);

    // save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
      // Fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/reviews/topics-sentiment?start-date=${formattedStartDate}&end-date=${formattedEndDate}')
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
  console.log(filteredData);

  
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

    
    return (
      <div>
        <DateFilter onDateRangeChange={handleDateRangeChange} />
        {reviewsData && (
          <div style={{ marginLeft: '600px', height: "250px",padding: '20px', marginTop: '-600px'  }}>
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
        )}
    </div>   
    );
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

