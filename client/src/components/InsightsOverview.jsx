import React, {useState, useEffect} from 'react';
import { Table, ScrollArea, Loader } from '@mantine/core';
import classes from './InsightsOverview.module.css';
import { IconBulb } from '@tabler/icons-react';

export default function GetInsights({selectedDateRange, refreshFlag }) {

    // Save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // Change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    
    const api = `http://127.0.0.1:5001/reviews/insights?start-date=${formattedStartDate}&end-date=${formattedEndDate}`

    const [insightsData, setInsightsData] = useState(null);
    const [finalData, setProcessedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                setInsightsData(jsonData);

                // After processing data
                const finalData = processDataForInsights(jsonData); 
                setProcessedData(finalData);
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[selectedDateRange, refreshFlag]);

    if (isLoading) {
        return (
            <div style={{justifyContent: 'center', alignItems: 'center'}}>
                <Loader color='blue' />
                <p style={{textAlign: 'center'}}>Loading...</p>
            </div>
        )
    }

    const rows = finalData && finalData.map((element) => (
        <Table.Tr key = {element.group}>
            <Table.Td style = {{ textAlign: 'left'}}>{element.group}</Table.Td>
            <Table.Td style = {{ textAlign: 'left'}}>
                <ul>
                    {element.insight.split('\n').map((bulletPoint, index) => (
                    <li key={index}>
                        {bulletPoint.trim().endsWith('.') ? bulletPoint.trim() : `${bulletPoint.trim()}.`}
                    </li>
                    ))}
                </ul>
            </Table.Td>
        </Table.Tr>
    ));

    // Declare bulb icon
    const bulbIcon = <IconBulb size={20} />;

    return (
        <div style = {{display: 'flex', height: '100%'}}>
            <ScrollArea h='100%'>
                <Table highlightOnHover className = {classes.custom}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style = {{textAlign: 'center'}}>Insight Group</Table.Th>
                            <Table.Th style = {{textAlign: 'center'}}>Generated Insights {bulbIcon}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </div>

)};

// Function to preprocess data
const processDataForInsights = (inputData) => {
    const formattedInsights = Object.entries(inputData.insights).map(([key, value]) => ({
        group: key.split(' ')[0],
        insight: value
    }));
    const bulletPoints = formattedInsights.map(insight => ({
        group: insight.group,
        insight: insight.insight.split('. ').map(sentence => `${sentence.trim()}`).join('\n')
    }))
    return bulletPoints;
}
