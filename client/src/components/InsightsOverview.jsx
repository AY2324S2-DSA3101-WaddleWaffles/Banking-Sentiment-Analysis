import React, {useState, useEffect} from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './InsightsOverview.module.css';
import { IconBulb } from '@tabler/icons-react';

export default function GetInsights({selectedDateRange, refreshFlag }) {
    console.log(selectedDateRange);

    // check if selectedDateRange is defined
    if (!selectedDateRange){
        return null;
    }

    // save updated start and end dates into variable
    const newStartDate = selectedDateRange && selectedDateRange.startDate;
    const newEndDate = selectedDateRange && selectedDateRange.endDate;

    // change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate ? newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-') : '';
    const formattedEndDate = newEndDate ? newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-') : '';
    
    const api = `http://127.0.0.1:5001/reviews/insights?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
    console.log(api);
    
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
                console.log(jsonData);

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
    },[selectedDateRange, refreshFlag])
    console.log(finalData);

    // const data = {
    //     "insights": "POSITIVE INSIGHTS\n\n* The overall rating for the GXS application has been consistently above 2.0, indicating a generally positive user experience.\n* The security rating saw a significant increase in October 2022 and has remained relatively stable since then.\n* The interface rating is high, with a peak in November 2022 and a current total rating of 3.965.\n* The stability rating had a significant increase in June 2023 and has remained relatively stable since then.\n* The service rating showed improvement in April 2023 and has remained relatively stable since then.\n* The functions rating had a significant increase in December 2023 and has remained relatively stable since then.\n* The notifications rating had a slight increase in May 2023, but remains low overall.\n* The speed rating had a significant increase in June 2023 and has remained relatively stable since then.\n* The login rating had a significant increase in May 2023, but remains low overall.\n* The update rating had a significant increase in December 2023 and has remained relatively stable since then.\n\nNEGATIVE INSIGHTS\n\n* The overall rating for the GXS application experienced a significant drop in January 2023 and has been decreasing since then.\n* The security rating is low, with a significant decrease in January 2023 and has remained relatively stable since then.\n* The stability rating had a significant decrease in August 2023 and has remained relatively stable since then.\n* The service rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The functions rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The notifications rating remains low, with only a slight increase in May 2023.\n* The speed rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The login rating had a significant decrease in July 2023 and has remained relatively stable since then.\n* The update rating had a significant decrease in August 2023 and has remained relatively stable since then.\n\nTOPIC INSIGHTS\n\n* Security: The security rating is low, with a significant decrease in January 2023 and has remained relatively stable since then.\n* Interface: The interface rating is high, with a peak in November 2022 and a current total rating of 3.965.\n* Stability: The stability rating had a significant increase in June 2023 and has remained relatively stable since then, but also had a significant decrease in August 2023.\n* Service: The service rating showed improvement in April 2023 but had a significant decrease in July 2023 and has remained relatively stable since then.\n* Functions: The functions rating had a significant increase in December 2023 but also had a significant decrease in July 2023 and has remained relatively stable since then.\n* Notifications: The notifications rating remains low, with only a slight increase in May 2023.\n* Speed: The speed rating had a significant increase in June 2023 but also had a significant decrease in July 2023 and has remained relatively stable since then.\n* Login: The login rating had a significant increase in May 2023 but also had a significant decrease in July 2023 and has remained relatively stable since then.\n* Update: The update rating had a significant increase in December 2023 but also had a significant decrease in August 2023 and has remained relatively stable since then."
    // }

    // const finalData = processDataForInsights(data);
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
    // console.log(rows);

    // declare bulb icon
    const bulbIcon = <IconBulb size={20} />;

    // UNCOMMENT AFTER BACKEND CONFIRM
    return (
        <div style = {{display: 'flex', height: '100%'}}>
            {isLoading ? (
                <p> Generating insights... It might take a while...</p> // placeholder
            ) : (
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
                    
        )}
        </div>

)}; // END OF MAIN FUNCTION



// const newData = {
//     "insights": {
//       "Negative Insights": "The bank's overall rating has seen a significant decline since January 2023, with an average rating of 2.864 out of 5. This drop is primarily due to the decrease in ratings for security, speed, and service. The security ratings have been particularly low, with an average rating of 2.033 out of 5. The speed of the application has also been inconsistent, with an average rating of 3.714 out of 5.",
//       "Positive Insights": "The bank's interface has received high ratings, with an average rating of 3.965 out of 5. The application's stability and update ratings have been consistently high, with averages of 3.5 and 3.083 respectively. The functions of the application have also shown improvement towards the end of the period, with an average rating of 5.0 in December 2023 and January 2024.",
//       "Topic Insights": "The bank's notification system has the lowest average rating of 1.0 out of 5, indicating a need for improvement. The login ratings have also been relatively low, with an average rating of 1.429 out of 5. However, there has been a slight improvement towards the end of the period. The service ratings have seen a significant drop in April 2024, with a rating of 4.5, but have been generally low throughout the period."
//     }
//   }


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

// const finalData = processDataForInsights(newData);
// console.log(finalData);