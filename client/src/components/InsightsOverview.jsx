import React, {useState, useEffect} from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './InsightsOverview.module.css';

export default function GetInsights() {
    
    const api = 'http://127.0.0.1:5001/reviews/insights'
    const [insightsData, setInsightsData] = useState(null);
    const [finalData, setProcessedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                setInsightsData(jsonData);
                // console.log(jsonData);

                // after processing data
                const finalData = processDataForInsights(jsonData);
                setProcessedData(finalData);
                // console.log(processedData); // CORRECT OUTPUT

            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[])
    console.log(finalData);

    const rows = finalData && finalData.map((element) => (
        <Table.Tr key = {element.group}>
            <Table.Td>{element.group}</Table.Td>
            <Table.Td>{element.insights}</Table.Td>
        </Table.Tr>
    ));
    // console.log(rows);

    return (
        <div>{isLoading ? (
                <p> Generating insights... It might take a while...</p> // placeholder
            ) : (
                <ScrollArea h={300}>
                    <Table highlightOnHover className = {classes.custom}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Insight Group</Table.Th>
                                <Table.Th>Generated Insights</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </ScrollArea>
                    
        )}
        </div>
        
    );

}; // END OF MAIN FUNCTION

const processDataForInsights = (inputData) => { // input will be jsonData

    const groups = inputData.insights.split(/\n{2,}/);
    // console.log(groups);
    const allInsights = {};
    let currentKey = null;
    
    for (const item of groups){
      if (item.startsWith('POSITIVE') || item.startsWith('NEGATIVE') || item.startsWith('TOPIC')){
        currentKey = item.replace(' INSIGHTS', '').toLowerCase();
        allInsights[currentKey] = [];
      } else if (currentKey){
        allInsights[currentKey].push(item);
      }
    }
    // console.log("allInsights: ", allInsights);
  
    // transform data to correct format for input

    const processedData = Object.entries(allInsights).map(([group, insights]) => ({
      group,
      insights: insights.join('\n')
    }));

    // capitalise first letter under group key
    const capitalise = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    };

    const finalData = processedData.map(item => {
        
        return {
            ...item,
            group: capitalise(item.group)
        };
    });

    // pointFormData(finalData);
    
    return (finalData);
  
  }; // END OF FUNCTION