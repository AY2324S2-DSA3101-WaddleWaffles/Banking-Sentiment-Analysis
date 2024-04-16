import React, { useState, useEffect } from 'react';
import { BarChart } from '@mantine/charts'; 
import { Paper, Text } from '@mantine/core';
import axios from 'axios';
import TopicFilter from './TopicFilter'


export default function SentimentByTopic({selectedDateRange, refreshFlag}) {
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
    const [features_list, setFeaturesList] = useState([]); //features_list from data
    const [ selectedFeatures, setselectedFeatures] = useState([]); //selected features from TopicFilter

    //this is used in filtering
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
              
              // Extracting features for filter
              const extractedFeatures = useThis.flatMap(data => data.feature);
              setFeaturesList(extractedFeatures);
              extractedFeatures.forEach(feature => {
                if (!selectedFeatures.includes(feature)) {
                  setselectedFeatures(selectedFeatures => [...selectedFeatures, feature]);
                }
               });

  
              // console.log("Type of useThis in Fetchdata: ",typeof useThis);
              //console.log("Features:", features_list);
              // console.log("Type of features_list in Fetchdata: ",typeof features_list);
              // console.log("useThis in fetchData:", useThis)
              

          } catch (error) {
              console.error('Error fetching data:', error);
              setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
      };
      console.log("Feteched data")
      fetchData();
      console.log("Refreshflag in barchart", refreshFlag)
  }, [selectedDateRange, refreshFlag]);
  
  //default the selected features in the filter to all features
  // features_list.forEach(feature => {
  //   setselectedFeatures(selectedFeatures => [...selectedFeatures, feature]);
  // });
  //console.log("features_list:", features_list)
  //console.log("selectedFeatures:", selectedFeatures)


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
  console.log("useThis:", useThis);
  //console.log("Features out:", features_list);
  
  const filteredUseThis = useThis?.filter(item => selectedFeatures.includes(item.feature)) || [];

  console.log("filteredUseThis: ",filteredUseThis)

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      

      {isLoading ? (
        <p>Loading...</p>
      ) : (
          <BarChart
              // h={280}
              w={500}
              data={filteredUseThis}
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
      <TopicFilter handleFeaturesChange={handleFeaturesChange} selectedFeatures={selectedFeatures} features_list = {features_list}/>
    </div> 
  );
};

