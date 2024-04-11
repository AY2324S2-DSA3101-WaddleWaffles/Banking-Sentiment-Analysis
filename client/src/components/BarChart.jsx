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
    const [gxsData, setGxsData] = useState(null);
    const [useThis, setUseThis] = useState(null);
    // const [sentimentData, setSentimentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const api =`http://127.0.0.1:5001/reviews/topics-sentiment?start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
              const response = await fetch(api.toString());
              const jsonData = await response.json();
              setFilteredData(jsonData);
              const gxsData = jsonData.filter(item => item.bank === 'GXS');
              setGxsData(gxsData);
              // const sentimentData = gxsData.map(item => item.topic_sentiments);
              // setSentimentData(sentimentData);
              
              const transformData = (sentiments) => {
                return Object.keys(sentiments).map(key => ({
                  feature: key.charAt(0).toUpperCase() + key.slice(1),
                  Positive: sentiments[key].Positive * 100,
                  Neutral: sentiments[key].Neutral * 100,
                  Negative: sentiments[key].Negative * 100
                }));
              };
              
              // Apply transformation to each item in inputData
              const useThis = gxsData.flatMap(item => transformData(item.topic_sentiments));
              setUseThis(useThis);
              // setIsLoading(false);
              

          } catch (error) {
              console.error('Error fetching data:', error);
              setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
      };

      fetchData();
  }, [selectedDateRange]);

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

  console.log(filteredData);
  console.log(gxsData);
  // console.log(sentimentData);
  console.log(useThis);
    
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <BarChart
              h={280}
              w={500}
              data={useThis}
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
      )}
    </div> 
  );
};

