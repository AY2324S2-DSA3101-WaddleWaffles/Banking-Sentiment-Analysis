import React, { useState, useEffect } from 'react';
import { BarChart } from '@mantine/charts'; 
import { Paper, Text } from '@mantine/core';
import TopicFilter from './TopicFilter'

export default function SentimentByTopic({selectedDateRange, refreshFlag}) {

    // Save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // Change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

    const [filteredData, setFilteredData] = useState([]);
    const [gxsData, setGxsData] = useState(null);
    const [useThis, setUseThis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // For topic filter
    const [features_list, setFeaturesList] = useState([]); // features_list from data
    const [selectedFeatures, setselectedFeatures] = useState([]); // selected features from TopicFilter

    const handleFeaturesChange = (ftr) => {
      if (selectedFeatures.includes(ftr)) {
        setselectedFeatures(selectedFeatures.filter((selectedFeatures) => selectedFeatures !== ftr));
      } else {
        setselectedFeatures([...selectedFeatures, ftr]);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const api =`http://127.0.0.1:5001/reviews/topics-sentiment?start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
              const response = await fetch(api.toString());
              const jsonData = await response.json();
              setFilteredData(jsonData);
              const gxsData = jsonData.filter(item => item.bank === 'GXS');
              setGxsData(gxsData);
              
              const transformData = (sentiments) => {
                return Object.keys(sentiments).map(key => ({
                  feature: key.charAt(0).toUpperCase() + key.slice(1),
                  Positive: (sentiments[key].Positive * 100).toFixed(1),
                  Neutral: (sentiments[key].Neutral * 100).toFixed(1),
                  Negative: Math.floor((sentiments[key].Negative * 100)).toFixed(1)
                }));
              };

              // Apply transformation to each item in inputData
              const useThis = gxsData.flatMap(item => transformData(item.topic_sentiments));
              setUseThis(useThis);
              
              // Extracting features for filter
              const extractedFeatures = useThis.flatMap(data => data.feature);
              setFeaturesList(extractedFeatures);
              extractedFeatures.forEach(feature => {
                if (!selectedFeatures.includes(feature)) {
                  setselectedFeatures(selectedFeatures => [...selectedFeatures, feature]);
                }
               });

          } catch (error) {
              console.error('Error fetching data:', error);
              setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
      };
      fetchData();
  }, [selectedDateRange, refreshFlag]);

  const filteredUseThis = useThis?.filter(item => selectedFeatures.includes(item.feature)) || [];

  return (
    <div style = {{ display: 'flex', height: '100%'}}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <BarChart
              w='100%'
              data={filteredUseThis}
              dataKey="feature"
              type="stacked"
              orientation="vertical"
              yAxisProps={{ width: 100, padding: { top: 5 }}}
              xAxisProps={{
                  labelProps: { weight: 100, size: 'lg' },
                  unit: "%",
                  domain: [0,100]
                }}
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
      <TopicFilter handleFeaturesChange={handleFeaturesChange} selectedFeatures={selectedFeatures} features_list = {features_list}/>
    </div> 
  );
};

// Function for tooltip
function ChartTooltip({ label, payload }) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder radius="md">
      <Text fw={500} mb={5} style={{color: 'black'}}>
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
