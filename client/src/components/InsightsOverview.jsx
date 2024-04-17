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
        "insights": "POSITIVE INSIGHTS\n\n* The overall rating for the GXS application has been consistently above 2.0, indicating a generally positive user experience.\n* The security rating saw a significant increase in October 2022 and has remained relatively stable since then.\n* The interface rating is high, with a peak in November 2022 and a current total rating of 3.965.\n* The stability rating had a significant increase in June 2023 and has remained relatively stable since then.\n* The service rating showed improvement in April 2023 and has remained relatively stable since then.\n* The functions rating had a significant increase in December 2023 and has remained relatively stable since then.\n* The notifications rating had a slight increase in May 2023, but remains low overall.\n* The speed rating had a significant increase in June 2023 and has remained relatively stable since then.\n* The login rating had a significant increase in May 2023, but remains low overall.\n* The update rating had a significant increase in December 2023 and has remained relatively stable since then.\n\nNEGATIVE INSIGHTS\n\n* The overall rating for the GXS application experienced a significant drop in January 2023 and has been decreasing since then.\n* The security rating is low, with a significant decrease in January 2023 and has remained relatively stable since then.\n* The stability rating had a significant decrease in August 2023 and has remained relatively stable since then.\n* The service rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The functions rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The notifications rating remains low, with only a slight increase in May 2023.\n* The speed rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The login rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The update rating had a significant decrease in August 2023 and has remained relatively stable since then.\n\nTOPIC INSIGHTS\n\n* Security: The security rating is low, with a significant decrease in January 2023 and has remained relatively stable since then.\n* Interface: The interface rating is high, with a peak in November 2022 and a current total rating of 3.965.\n* Stability: The stability rating had a significant increase in June 2023 and has remained relatively stable since then, but also had a significant decrease in August 2023.\n* Service: The service rating showed improvement in April 2023 but had a significant decrease in July 2023 and has remained relatively stable since then.\n* Functions: The functions rating had a significant increase in December 2023 but also had a significant decrease in July 2023 and has remained relatively stable since then.\n* Notifications: The notifications rating remains low, with only a slight increase in May 2023.\n* Speed: The speed rating had a significant increase in June 2023 but also had a significant decrease in July 2023 and has remained relatively stable since then.\n* Login: The login rating had a significant increase in May 2023 but also had a significant decrease in July 2023 and has remained relatively stable since then.\n* Update: The update rating had a significant increase in December 2023 but also had a significant decrease in August 2023 and has remained relatively stable since then."
    }

    const finalData = processDataForInsights(data);
    // console.log(finalData);

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
            <Table.Td style = {{ textAlign: 'left', fontFamily:'Open Sans' }}>{element.group}</Table.Td>
            <Table.Td style = {{ textAlign: 'left', fontFamily: 'Open Sans'}}>
                <ul>
                    {element.insights.split('\n').map((insights, index) => (
                        <li key={index}>{insights.substring(2)}</li> // to remove asterisk
                    ))}
                </ul>
            </Table.Td>
        </Table.Tr>
    ));
    // console.log(rows);

    // UNCOMMENT AFTER BACKEND CONFIRM
    // return (
    //     <div style = {{display: 'flex', height: '100%'}}>
    //         {isLoading ? (
    //             <p> Generating insights... It might take a while...</p> // placeholder
    //         ) : (
    //             <ScrollArea h={300}>
    //                 <Table highlightOnHover className = {classes.custom}>
    //                     <Table.Thead>
    //                         <Table.Tr>
    //                             <Table.Th style = {{textAlign: 'center', fontFamily: 'Open Sans'}}>Insight Group</Table.Th>
    //                             <Table.Th style = {{textAlign: 'center', fontFamily: 'Open Sans'}}>Generated Insights</Table.Th>
    //                         </Table.Tr>
    //                     </Table.Thead>
    //                     <Table.Tbody>{rows}</Table.Tbody>
    //                 </Table>
    //             </ScrollArea>
                    
    //     )}
    //     </div>
        

    // comment out AFTER BACKEND CFM
    return (
        <div style = {{display: 'flex', height: '100%'}}>
            <ScrollArea h='100%'>
                <Table highlightOnHover className = {classes.custom}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style = {{ textAlign: 'center', fontFamily: 'Open Sans'}}>Insight Group</Table.Th>
                            <Table.Th style = {{ textAlign: 'center', fontFamily: 'Open Sans'}}>Generated Insights</Table.Th>
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