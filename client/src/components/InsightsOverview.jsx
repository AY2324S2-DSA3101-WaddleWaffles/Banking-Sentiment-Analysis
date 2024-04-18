import React, {useState, useEffect} from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './InsightsOverview.module.css';
import { IconMoodSad } from '@tabler/icons-react';
import { IconMoodSmileBeam } from '@tabler/icons-react';

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

    // const rows = finalData && finalData.map((element) => (
    //     <Table.Tr key = {element.group}>
    //         <Table.Td style = {{ textAlign: 'left', fontFamily:'Open Sans' }}>{element.group}</Table.Td>
    //         <Table.Td style = {{ textAlign: 'left', fontFamily: 'Open Sans'}}>
    //             <ul>
    //                 {element.insights.split('\n').map((insights, index) => (
    //                     <li key={index}>{insights.substring(2)}</li> // to remove asterisk
    //                 ))}
    //             </ul>
    //         </Table.Td>
    //     </Table.Tr>
    // ));
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
    
    // declare icons
    const sadIcon = <IconMoodSad size={22} />;
    const happyIcon = <IconMoodSmileBeam size = {22} />;

    // comment out AFTER BACKEND CFM
    return (
        <div>
            <ScrollArea h = '100%'>
                <h2 style = {{fontSize: '22px', textAlign: 'left', fontWeight: 'bold', marginLeft:'20px'}}> {sadIcon}&nbsp;Negative Insights</h2>
                <Table highlightOnHover className = {classes.custom}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style = {{ textAlign: 'center', fontFamily: 'Open Sans'}}>Topic</Table.Th>
                            <Table.Th style = {{ textAlign: 'center', fontFamily: 'Open Sans'}}>Generated Insights</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{negativeRows}</Table.Tbody>
                </Table>
            
                <h2 style = {{fontSize: '22px', textAlign: 'left', fontWeight: 'bold', marginLeft:'20px'}}> {happyIcon}&nbsp;Positive Insights</h2>
                <Table highlightOnHover className = {classes.custom}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style = {{ textAlign: 'center', fontFamily: 'Open Sans'}}>Topic</Table.Th>
                            <Table.Th style = {{ textAlign: 'center', fontFamily: 'Open Sans'}}>Generated Insights</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{positiveRows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </div>
    );

}; // END OF MAIN FUNCTION


// BEFORE API DATA FORMAT WAS CHANGED
// const processDataForInsights = (inputData) => { // input will be jsonData

//     const groups = inputData.insights.split(/\n{2,}/);
//     // console.log(groups);
//     const allInsights = {};
//     let currentKey = null;
    
//     for (const item of groups){
//       if (item.startsWith('POSITIVE') || item.startsWith('NEGATIVE') || item.startsWith('TOPIC')){
//         currentKey = item.replace(' INSIGHTS', '').toLowerCase();
//         allInsights[currentKey] = [];
//       } else if (currentKey){
//         allInsights[currentKey].push(item);
//       }
//     }
//     // console.log("allInsights: ", allInsights);
  
//     // transform data to correct format for input

//     const processedData = Object.entries(allInsights).map(([group, insights]) => ({
//       group,
//       insights: insights.join('\n')
//     }));

//     // capitalise first letter under group key
//     const capitalise = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1)
//     };

//     const finalData = processedData.map(item => {
        
//         return {
//             ...item,
//             group: capitalise(item.group)
//         };
//     });

//     // pointFormData(finalData);
    
//     return (finalData);
  
//   }; // END OF FUNCTION



const newData = {
    "insights": {
      "Negative Insights": [
        {
          "insight": "The overall rating dropped significantly from 5.0 in November 2022 to 2.0 in January 2023, then partially recovered to 3.0 in January 2024.",
          "topic": "overall"
        },
        {
          "insight": "Login ratings started at 3.0 in May 2023, then dropped to 1.0 in April 2024, indicating customer dissatisfaction.",
          "topic": "login"
        },
        {
          "insight": "Functions ratings have been low, with only a few peaks, such as 5.0 in October 2022 and December 2023, and 4.5 in January 2024.",
          "topic": "functions"
        },
        {
          "insight": "Stability ratings have been inconsistent, with a drop to 1.0 in August and September 2023, followed by an increase to 5.0 in November 2023.",
          "topic": "stability"
        },
        {
          "insight": "Security ratings had a considerable drop in January 2023 (1.333), recovering gradually to 3.0 in January 2024.",
          "topic": "security"
        }
      ],
      "Positive Insights": [
        {
          "insight": "The overall rating has slightly decreased from 2.864 in December 2022 to 2.8 in April 2024.",
          "topic": "overall"
        },
        {
          "insight": "The interface ratings have been consistently high, with a peak of 5.0 in November 2022 and December 2022, and a slight decrease to 1.5 in September 2023.",
          "topic": "interface"
        },
        {
          "insight": "Service ratings have shown improvement, with a significant increase from 1.0 in April 2023 to 4.5 in April 2024.",
          "topic": "service"
        },
        {
          "insight": "Speed ratings have improved significantly, with a peak of 5.0 in June, October, and November 2023, and March 2024.",
          "topic": "speed"
        },
        {
          "insight": "Security ratings have had some positive periods, such as 5.0 in October 2022 and 4.333 in December 2022, but also experienced a drop in January 2023 (1.333) and July 2023 (3.0). However, they have recovered and reached 3.0 in January 2024.",
          "topic": "security"
        },
        {
          "insight": "Notifications ratings were 1.0 in May, July, and August 2023, and March 2024, indicating customer satisfaction.",
          "topic": "notifications"
        },
        {
          "insight": "Update ratings have been generally good, with a peak of 5.0 in October 2022 and June 2023, and a slight decrease to 3.0 in February 2024.",
          "topic": "update"
        }
      ]
    }
  };

function capitalizeKeys(obj) { // input will be jsonData.insights
if (typeof obj !== 'object' || obj === null) {
    return obj;
}

const finalData = Array.isArray(obj) ? [] : {};

for (let key in obj) {
    const newKey = key.charAt(0).toUpperCase() + key.slice(1);
    let topic = obj[key];
    if (typeof topic === 'string') {
    topic = topic.charAt(0).toUpperCase() + topic.slice(1);
    }
    finalData[newKey] = capitalizeKeys(topic);
}

return finalData;
}

// testing
newData.insights = capitalizeKeys(newData.insights); // modify in place
console.log(newData); // CORRECT

// put upstairs
// save negative insights into object
let capitalizedInsights = newData.insights;
let negativeInsights = capitalizedInsights["Negative Insights"]
console.log(negativeInsights);

// save positive insights into object
let positiveInsights = capitalizedInsights["Positive Insights"];
console.log(positiveInsights);


// NEW ROWS
const negativeRows = negativeInsights && negativeInsights.map((element) => (
    <Table.Tr key = {element.Topic}>
        <Table.Td style = {{ textAlign: 'left', fontFamily:'Open Sans' }}>{element.Topic}</Table.Td>
        <Table.Td style = {{ textAlign: 'left', fontFamily: 'Open Sans'}}>{element.Insight}
        </Table.Td>
    </Table.Tr>
));
console.log(negativeRows);


const positiveRows = positiveInsights && positiveInsights.map((element) => (
    <Table.Tr key = {element.Topic}>
        <Table.Td style = {{ textAlign: 'left', fontFamily:'Open Sans' }}>{element.Topic}</Table.Td>
        <Table.Td style = {{ textAlign: 'left', fontFamily: 'Open Sans'}}>{element.Insight}
        </Table.Td>
    </Table.Tr>
));
console.log(positiveRows);