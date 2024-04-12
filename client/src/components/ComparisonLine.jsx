import React, { useState, useEffect } from 'react';
import { LineChart } from '@mantine/charts';
import axios, { formToJSON } from 'axios';
import Legend from './Legend';
import { Paper, Text, Button, Grid } from '@mantine/core';

export default function ComparisonLine({ selectedDateRange, refreshFlag }) {
  
  const [banksData, setBanksData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [lineColors, setLineColors] = useState({});
  const [processedData, setProcessedData] = useState([]);
  
  // save updated start and end dates into variable
  const newStartDate = selectedDateRange.startDate;
  const newEndDate = selectedDateRange.endDate;

  // change format of start and end date to dd-mm-yyyy
  const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
  const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

  const api = `http://127.0.0.1:5001/reviews/average-rating?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
  console.log(api);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(api.toString());
        const jsonData = await response.json();
        setBanksData(jsonData);
        console.log("retrieved line:", jsonData)

        // Process data and set it to processedData state
        const processingData = processDataForLineChart(jsonData);
        console.log("processed line data:", processingData);
        setProcessedData(processingData);
  
        // Select all banks by default
        setSelectedBanks(jsonData.map(entry => entry.bank));
  
        // Generate fixed colors for each bank
        const colors = {};
        jsonData.forEach((entry, index) => {
          colors[entry.bank] = entry.bank === "GXS" ? "#FF0000" : getRandomColor(index); // Set GXS color to red
        });
        setLineColors(colors);
        
        //setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }; // Fetch data with default date range when the component mounts

    fetchData();
  }, [selectedDateRange, refreshFlag]); // Fetch data when start date or end date changes

  //console.log("selected banks:", selectedBanks)
  const toggleBankSelection = (bank) => {
    if (selectedBanks.includes(bank)) {
      setSelectedBanks(selectedBanks.filter((selectedBank) => selectedBank !== bank));
    } else {
      setSelectedBanks([...selectedBanks, bank]);
    }
  };
  console.log("banksData: ",banksData);
  console.log(processedData);
  

  return (
    <div>
      {isLoading ? (
        <div  style={{ padding: '100px', marginLeft:'px' }}>
          <p>Loading...</p>
        </div>
      ) : (
        <Grid gutter="md" style={{ width: '100%', height: '100%' }}>
          <Grid.Col span={10}>
            <div style={{ padding: '0 20px', }}> {/* Add padding to the sides */}
              <LineChart
                h={200}
                data={processedData}
                dataKey="date"
                xAxisProps={{padding:{ left: 30, right: 30 }}}
                series={selectedBanks.map((bank) => ({
                  name: bank,
                  color: lineColors[bank], // Use fixed color for each bank
                  dataKey: bank,
                  strokeWidth: 4,
                }))}
                connectNulls
                tooltipProps={{
                  content: ({ label, payload }) => (<ChartTooltip label={label} payload={payload} />),
                }}
              />
            </div>
          </Grid.Col>
          <Grid.Col span={0.5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{marginLeft: '50px', width: '100px', marginTop: '10px', padding: '5px', background: 'lightgrey', borderRadius:'8px' , fontFamily: 'Inter, sans serif'}}>
              <Legend
                series={selectedBanks.map((bank) => ({
                  name: bank,
                  color: lineColors[bank],
                }
                ))}
                fontSize="14px"
              />
            </div>
          </Grid.Col >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' , marginLeft: '50px',}}>
            <Text>Select banks for comparison:</Text>
            {banksData.map((bankEntry) => (


              <Button
                key={bankEntry.bank}
                onClick={() => toggleBankSelection(bankEntry.bank)}
                color={selectedBanks.includes(bankEntry.bank) ? 'violet' : 'gray'}
                variant="outline"
                size="xs"
                style={{ marginTop: '0px', marginBottom: '0px', marginRight: '3px', marginLeft:'10px', padding:'4px', borderWidth: '2px', fontSize: '10px'}}
              >
                {bankEntry.bank}
              </Button>
            ))}
          </div>
        </Grid>
      )}
    </div>
  );
}
  

function ChartTooltip({ label, payload }) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md" style={{ background: 'black' }}>
      <Text fw={500} mb={5}  style={{ color: 'white' }}>
        {label}
      </Text>
      {payload.map(item => (
        <Text key={item.name} c={item.color} fz="sm" >
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

const processDataForLineChart = (banksData) => {
  if (!banksData || !Array.isArray(banksData)) return []; // Return empty array if no data or if data is not an array
  const processedData = [];

  // Iterate over each bank entry
  banksData.forEach((entry) => {
    const bankName = entry.bank; // Extract the bank name

    const ratingsArray = entry.ratings;

    // Iterate over each rating period
    ratingsArray.forEach((ratingData) => {
      const { period, rating } = ratingData;
      //console.log("month period: ", period);
      let dateString;

      // If the period is a range, parse the start date from it
      if (period.includes('-')) {
        const [startDateString, _] = period.split(' - ');
        const [startDay, startMonth, startYear] = startDateString.split(' ');
        const monthAbbreviated =  startMonth.substring(0, 3);
        dateString = `${startDay} ${monthAbbreviated} ${startYear}`;
      } else { 
        //console.log("month period: ", period);
        dateString = period;

      }

      // Find if an entry for the date exists in the processed data array
      const existingEntry = processedData.find((item) => item.date === dateString);

      // If an entry for the date doesn't exist, create a new one
      if (!existingEntry) {
        const newEntry = { date: dateString }; // Initialize with the date
        newEntry[bankName] = rating; // Add the rating for the current bank
        processedData.push(newEntry); // Push the new entry to the processed data array
      } else {
        // If an entry for the date already exists, update the rating for the current bank
        existingEntry[bankName] = rating;
      }
    });
  });

  return processedData;
};



const getRandomColor = (index) => {
  const colors = [
    '#6b6b6b', // Grey
    '#a8a8a8', // Light Grey
    '#999999', // Medium Grey
    '#bdbdbd', // Silver
    '#e0e0e0', // Light Silver
    //'#757575', // Slate Grey
    '#c0c0c0', // Grey Silver
    '#f0f0f0', // White Smoke
  ];
  return colors[index % colors.length];

};
