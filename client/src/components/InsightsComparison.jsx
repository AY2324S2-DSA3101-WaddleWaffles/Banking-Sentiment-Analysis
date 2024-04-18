import React, { useEffect, useState } from 'react';
import { Paper, Loader, Table, ScrollArea } from '@mantine/core';
import classes from './insightsComparison.module.css';

function InsightsComparison({selectedDateRange, selectedBank, refreshFlag }) {
  console.log("Selected bank for comparison:", selectedBank);
  const [insightsData, setInsightsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltipPosition, setTooltipPosition] = useState(null);


  const newStartDate = selectedDateRange.startDate;
  const newEndDate = selectedDateRange.endDate;

  // change format of start and end date to dd-mm-yyyy
  const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
  const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');


  useEffect(() => {
    if (!selectedBank) {
      // No bank selected, set insights data to null
      setInsightsData(null);
      return;
    }

    const api = `http://127.0.0.1:5001/reviews/comparison?compared-bank=${selectedBank}&start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
    console.log("insights url", api);
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api.toString());
        const jsonData = await response.json();
        setInsightsData(jsonData.comparison); // Update insightsData state
        console.log("retrieved insights data:", jsonData);
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedBank, selectedDateRange, refreshFlag ]);

  if (!selectedBank) {
    return <div>Please select a bank to view insights </div>;
  }

  if (isLoading) {
    return (
      <div>
        <Loader color="blue" />
        <p>Loading...</p>
      </div>
    )
  }

  if (!insightsData) {
    return <div>No data available</div>;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const boldKeywords = (text) => {
    return text.replace(/\b(slightly|better|worse|higher|lower|much)\b/gi, '<strong>$1</strong>')
    .replace(/\(([^)]+)\)/g, '<strong>($1)</strong>');
  };

  const betterTopics = (insightsData) => {
    if (!insightsData || !insightsData['Better Topics']) { 
      return [];
    }

    return Object.entries(insightsData['Better Topics']).map(([topic, insight]) => (
      <Table.Tr key={topic}>
        <Table.Td><strong>{capitalizeFirstLetter(topic)}</strong></Table.Td>
        <Table.Td dangerouslySetInnerHTML={{ __html: boldKeywords(insight) }} />
      </Table.Tr>
    ));
  }

  const worseTopics = (insightsData) => {
    if (!insightsData || !insightsData['Worse Topics']) {
      return [];
    }
  
    return Object.entries(insightsData['Worse Topics']).map(([topic, insight]) => (
      <Table.Tr key={topic}>
        <Table.Td><strong>{capitalizeFirstLetter(topic)}</strong></Table.Td>
        <Table.Td dangerouslySetInnerHTML={{ __html: boldKeywords(insight) }} />
      </Table.Tr>
    ));
  };
  
  return (
    <div>
      {/*<ScrollArea h={330}>*/}
        <Paper shadow="lg" withBorder p="md" radius='md' style={{ textAlign: 'left', marginBottom: '20px',backgroundColor:'rgba(32, 37, 92, 0.2)'}}>
          <h2 style={{fontSize: '15px'}}>What GXS is doing better:</h2>
          <Table highlightOnHover className = {classes.custom}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Topic</Table.Th>
                <Table.Th>Rating Comparison</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{betterTopics(insightsData)}</Table.Tbody>
          </Table>
        </Paper>

        <Paper shadow="lg" withBorder p="md" radius='md' style={{ textAlign: 'left', marginBottom: '20px',  backgroundColor:'rgba(32, 37, 92, 0.2)'}}>
          <h2 style={{fontSize: '15px'}}>What {selectedBank} is doing better:</h2>
          <Table highlightOnHover className = {classes.custom}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Topic</Table.Th>
                <Table.Th>Rating Comparison</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {worseTopics(insightsData)}
            </Table.Tbody>
          </Table>
        </Paper>
      {/*</ScrollArea>*/}
    </div>
  );
}

export default InsightsComparison;
