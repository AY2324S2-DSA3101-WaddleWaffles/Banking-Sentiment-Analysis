import React, {useState, useEffect} from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './InsightsOverview.module.css';

export default function GetInsights(refreshFlag) {
    
    // const api = 'http://127.0.0.1:5001/reviews/insights'
    // const [insightsData, setInsightsData] = useState(null);
    // const [finalData, setProcessedData] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    
    // // Fetch data
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(api.toString());
    //             const jsonData = await response.json();
    //             setInsightsData(jsonData);
    //             // console.log(jsonData);

    //             // after processing data
    //             const finalData = processDataForInsights(jsonData);
    //             setProcessedData(finalData);
    //             // console.log(processedData); // CORRECT OUTPUT

    //         } catch (error) {
    //             console.error('Error fetching data:', error)
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchData();
    // },[refreshFlag])
    // console.log(finalData);

    const data = {
        "insights": "POSITIVE INSIGHTS\n\n* The overall rating for GXS Bank is consistently high, averaging around 4.32 out of 5.\n* The interface of the GXS application has received positive feedback, with an average rating of 4.82 out of 5.\n* The transaction aspect of the GXS application has a perfect score of 5.0.\n\nNEGATIVE INSIGHTS\n\n* There are no ratings for several categories such as update, performance, speed, reliability, bug, and customer support, making it difficult to assess these areas.\n* The ratings for the features of the GXS application are low, averaging around 2.0 out of 5.\n* There are periods of significantly lower ratings for the overall GXS application, specifically in December 2022, February 2023, July 2023, August 2023, September 2023, October 2023, and February 2024.\n\nTOPIC INSIGHTS\n\n* Overall: The overall rating for GXS Bank is generally high, but there are periods of significant decline. More consistent data is needed for other categories to provide a comprehensive analysis.\n* Features: The ratings for the features of the GXS application are low and need improvement.\n* Interface: The interface of the GXS application has been well-received, with high ratings.\n* Transaction: The transaction aspect of the GXS application is excellent, with a perfect score.\n* Service: The service category has high ratings, but there are periods of decline.\n* Other categories (update, performance, speed, reliability, bug, customer support): There is no data available for these categories, making it impossible to provide insights."
    }

    const finalData = processDataForInsights(data);
    console.log(finalData);

    // change to bullet points
    // const insightsRenderer = ({ insights }) => {
    //     return (
    //         <ul>
    //             {insights.split('\n').map((insights, index) => (
    //                 <li key={index}>{insights.subtring(2)}</li> // to remove asterisk
    //             ))}
    //         </ul>
    //     )
    // };

    const rows = finalData && finalData.map((element) => (
        <Table.Tr key = {element.group}>
            <Table.Td style = {{ textAlign: 'left' }}>{element.group}</Table.Td>
            <Table.Td style = {{ textAlign: 'left '}}>
                <ul>
                    {element.insights.split('\n').map((insights, index) => (
                        <li key={index}>{insights.substring(2)}</li> // to remove asterisk
                    ))}
                </ul>
            </Table.Td>
        </Table.Tr>
    ));
    // console.log(rows);


// UNCOMMENT WHEN CONFIRM WORK
    // return (
    //     <div>{isLoading ? (
    //             <p> Generating insights... It might take a while...</p> // placeholder
    //         ) : (
    //             <ScrollArea h={300}>
    //                 <Table highlightOnHover className = {classes.custom}>
    //                     <Table.Thead>
    //                         <Table.Tr>
    //                             <Table.Th>Insight Group</Table.Th>
    //                             <Table.Th>Generated Insights</Table.Th>
    //                         </Table.Tr>
    //                     </Table.Thead>
    //                     <Table.Tbody>{rows}</Table.Tbody>
    //                 </Table>
    //             </ScrollArea>
                    
    //     )}
    //     </div>
        
    // );

    return (
        <div style = {{display: 'flex', height: '100%'}}>
            <ScrollArea h={320}>
                <Table highlightOnHover className = {classes.custom}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style = {{ textAlign: 'center'}}>Insight Group</Table.Th>
                            <Table.Th style = {{ textAlign: 'center'}}>Generated Insights</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
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