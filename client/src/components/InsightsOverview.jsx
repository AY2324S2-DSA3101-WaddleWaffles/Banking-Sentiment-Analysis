import React, {useState, useEffect} from 'react';
import { Table, ScrollArea, Loader } from '@mantine/core';
import classes from './InsightsOverview.module.css';
import { IconBulb } from '@tabler/icons-react';


export default function GetInsights({selectedDateRange, refreshFlag }) {
    console.log(selectedDateRange);

    // check if selectedDateRange is defined

    // save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    
    const api = `http://127.0.0.1:5001/reviews/insights?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
    // console.log(api);
    
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
                // console.log(jsonData);
                console.log("fetched");

                // after processing data
                const finalData = processDataForInsights(jsonData); // jsonData or insightsData
                setProcessedData(finalData);

            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[selectedDateRange, refreshFlag]);
    
    // console.log(insightsData);

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
                {/* <ul>
                    {element.insight.split('•').filter(line => line.trim() !== "").map((line, index) => (
                        <li key={index}>{line.trim()}</li>
                    ))}
                </ul> */}
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

    // declare bulb icon
    const bulbIcon = <IconBulb size={20} />;

    // UNCOMMENT AFTER BACKEND CONFIRM
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

)}; // END OF MAIN FUNCTION

// function to preprocess data
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
