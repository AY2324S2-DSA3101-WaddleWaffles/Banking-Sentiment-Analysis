import { LineChart } from '@mantine/charts';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Paper, Text } from '@mantine/core';

export default function OverallGXSBySentiment({ selectedDateRange }) {
    console.log(selectedDateRange);

    // save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    console.log(formattedStartDate);
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    console.log(formattedEndDate);

    const api = `http://127.0.0.1:5001/reviews/average-sentiment?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
    console.log(api);

    const [reviewsData, setReviews] = useState([]);
    //const [processedData, setProcessedData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                setReviews(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedDateRange]);
    console.log(reviewsData); 
    
    // process data 

    const gxsData = reviewsData.filter(item => item.bank === 'GXS');
    gxsData.forEach(item => { // remove the "total" element
        if ("total" in item.sentiments){
            delete item.sentiments.total;
        }
    });


    
    const monthAbbreviations = {
        "January": "Jan",
        "February": "Feb",
        "March": "Mar",
        "April": "Apr",
        "May": "May",
        "June": "Jun",
        "July": "Jul",
        "August": "Aug",
        "September": "Sep",
        "October": "Oct",
        "November": "Nov",
        "December": "Dec"
      };
    
    // WEEK PROCESSING
    // 1. change from 23 February 2024 to 23 Feb 24
    const weeklyData = JSON.parse(JSON.stringify(gxsData));
    // Iterate through the modified data array and modify the date range format
    weeklyData.forEach(item => {
        const sentiments = item.sentiments;
        Object.keys(sentiments).forEach(dateRange => {
        if (dateRange !== "total") {
            const [startDate, endDate] = dateRange.split(" - ").map(date => {
            const [day, month, year] = date.split(" ");
            return `${day} ${month.substring(0, 3)} ${year.slice(-2)}`;
            });
            const newDateRange = `${startDate} - ${endDate}`;
            sentiments[newDateRange] = sentiments[dateRange];
            delete sentiments[dateRange];
        }
        });
    });

    console.log(weeklyData);

    // 2. convert to percentage, change to correct format for input 
    const formattedData = weeklyData.map(item => {
        const sentiments = item.sentiments;
        const formattedSentiments = Object.keys(sentiments).map(dateRange => {
          const sentimentValues = sentiments[dateRange];
          // Multiply each sentiment value by 100 and round to 1 decimal place
          const formattedValues = {
            "Negative": parseFloat((sentimentValues["Negative"] * 100).toFixed(1)),
            "Neutral": parseFloat((sentimentValues["Neutral"] * 100).toFixed(1)),
            "Positive": parseFloat((sentimentValues["Positive"] * 100).toFixed(1))
          };
          return { month: dateRange, ...formattedValues };
        });
        return formattedSentiments;
    }).flat();
      
    console.log(formattedData);

    // MONTH PROCESSING
//     gxsData.forEach(item => {
//         // Loop through the sentiments object of each item
//         Object.keys(item.sentiments).forEach(dateRange => {
//             // Split the date range by " - " to get the start and end dates
//             const dates = dateRange.split(" - ");
//             // Extract the components of start and end dates
//             const [startDay, startMonth, startYear] = dates[0].split(" ");
//             const [endDay, endMonth, endYear] = dates[1].split(" ");
//             // Replace full month names with their abbreviations
//             const abbreviatedStartDate = `${startDay} ${monthAbbreviations[startMonth]} ${startYear.slice(-2)}`;
//             const abbreviatedEndDate = `${endDay} ${monthAbbreviations[endMonth]} ${endYear.slice(-2)}`;
//             // Construct the new date range format
//             const newDateRange = `${abbreviatedStartDate} - ${abbreviatedEndDate}`;
//             // Update the sentiments object with the new date range format
//             item.sentiments[newDateRange] = item.sentiments[dateRange];
//             // Remove the old date range from the sentiments object
//             delete item.sentiments[dateRange];
//   });
// });

//     console.log(gxsData);




    // // if selectedDateRange > 3 months: aggregate by month

    // month abbreviation, ONLY CAN DO IF FILTER FOR > 3 MONTHS
    // const monthAbbreviaton = (dateString) => {
    //     const dateParts = dateString.split(" ");
    //     const mm = dateParts[0].substring(0,3);
    //     const year = dateParts[1].substring(2);
    //     return `${mm} ${year}`;
    // }

    // const transformedData = Object.entries(gxsData.sentiments)
    //     .map(([month, sentiment]) => ({
    //         //month: monthAbbreviaton(month),
    //         month,
    //         Positive: ((sentiment.Positive) * 100).toFixed(1),
    //         Neutral: ((sentiment.Neutral) * 100).toFixed(1),
    //         Negative: ((sentiment.Negative) * 100).toFixed(1)
    //     }));

    // console.log(transformedData);


    


    // Function for tooltip
    function ChartTooltip({ label, payload }) {
        if (!payload) return null;
      
        return (
            <Paper px="md" py="sm" withBorder shadow="md" radius="md">
                <Text fw={500} mb={5}>
                    {label}
                </Text>
                {payload.map(item => (
                    <Text key={item.name} c={item.color} fz="sm">
                        {item.name}: {item.value}
                    </Text>
                ))}
            </Paper>
        );
    };

    // const sortedData = transformedData.sort((a,b) => {
    //     const [monthA, yearA] = a.month.split(" ");
    //     const [monthB, yearB] = b.month.split(" ");

    //     // compare years first
    //     if (yearA !== yearB) {
    //         return parseInt(yearA) - parseInt(yearB);
    //     }

    //     // if years are the same, compare months
    //     const monthOrder = {
    //         "January": 1, "February": 2, "March": 3, "April": 4,
    //         "May": 5, "June": 6, "July": 7, "August": 8,
    //         "September": 9, "October": 10, "November": 11, "December": 12
    //     };

    //     return monthOrder[monthA] - monthOrder[monthB];
    // })

    // console.log(sortedData);


    // // // Calculate max value for y-axis
    // // const maxValue = Math.max(...sortedData.map(item => Math.max(item.Positive, item.Neutral, item.Negative)));

    // Define domain for y-axis
    //const yAxisDomain = [0, 100];

    return (
        // <div style={{ marginLeft: '10px', height: "250px", marginTop: "10px", marginRight:'10px' }}>
          <LineChart
              h="100%"
              w="100%"
              data={formattedData}
              dataKey='month'
              unit='%'
              series={[
                  {name: 'Positive', color: 'teal'},
                  {name: 'Neutral', color: 'yellow.6'},
                  {name: 'Negative', color: 'red.6'},
              ]} 
              tooltipProps={{
                  content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
              }}
              xAxisProps={{
                tickRotation: -90 // NOT WORKING
              }}
            //   yAxisProps={{
            //     domain: yAxisDomain
            //   }}
              
          />

        // {/* </div> */}
    );
}
