import React, {useState, useEffect} from 'react';
import { Table } from '@mantine/core';

export default function GetInsights() {
    
    const api = 'http://127.0.0.1:5001/reviews/insights'
    const [insightsData, setInsightsData] = useState(null);
    const [processedData, setProcessedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                setInsightsData(jsonData);
                console.log(jsonData);

                // after processing data
                const processedData = processDataForInsights(jsonData);
                setProcessedData(processedData);

            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    })

    const rows = processedData.map((element) => (
        <Table.Tr key = {element.group}>
            <Table.Td>{element.group}</Table.Td>
            <Table.Td>{element.insights}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Insight Group</Table.Th>
                    <Table.Th>Generated Insights</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );

}; // END OF MAIN FUNCTION

const processDataForInsights = (inputData) => {

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
  
    // transform data to correct format for input
    const transformedData = Object.entries(allInsights).map(([group, insights]) => ({
      group,
      insights: insights.join('\n')
    }));
    return transformedData;
  
  }; // END OF FUNCTION