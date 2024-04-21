import React, { useState, useEffect } from 'react';
import { LineChart } from '@mantine/charts';
import { Paper, Text } from '@mantine/core';

export default function TimeSeriesGXS({ selectedDateRange, refreshFlag }){

    // Save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // Change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

    const api = `http://127.0.0.1:5001/reviews/average-rating?start-date=${formattedStartDate}&end-date=${formattedEndDate}`

    const [reviewsData, setReviews] = useState({});
    const [gxsData, setGxsData] = useState(null); // for GXS bank data only
    const [avgData, setAvgData] = useState(null); // for average_ratings object
    const [processedData, setProcessedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                setReviews(jsonData);

                const gxsData = jsonData.filter(item => item.bank === 'GXS');
                setGxsData(gxsData);

                const avgData = gxsData[0]["ratings"];
                setAvgData(avgData);
                delete avgData.total;

                const processedData = processDataForLine(avgData)
                setProcessedData(processedData);
                console.log(processedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedDateRange, refreshFlag]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style = {{ display: 'flex', height: '100%', justifyContent: 'center'}}>
            <LineChart 
                w = '100%'
                data = {processedData}
                dataKey = "month" 
                series={[{name: 'rating', color: 'indigo.6'}]}
                connectNulls
                xAxisProps={{
                    ticks: null,
                    label: null,
                    padding: {right: 30}
                }}
                yAxisProps={{
                    domain: [0,5],
                    ticks: [0, 1, 2, 3, 4, 5],
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />
                }}
            />
        </div>
    )

};

// Function for tooltip
function ChartTooltip({ label, payload }) {
    if (!payload) return null;
        
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
        <Text fw={500} mb={5} style={{color: 'black'}}>
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

// Function to process data based on filtered date range
const processDataForLine = (gxsData) => { // input will be avgData
    const processedData = [];

    // Check if each key in object contains "-"
    gxsData.forEach(entry => {
        const period = entry.period;
        const rating = entry.rating;

        if (period.includes("-")){ 
            // Weekly Aggregation, already sorted by year and month
            const [startDateString, endDateString] = period.split(' - ');
            const [startDate, startMonth, startYear] = startDateString.split(' ')
            const monthAbb = startMonth.substring(0,3); // extract first 3 characters of month
            const yearAbb = startYear.slice(2); // extract last 2 characters of year

            const [endDate, endMonth, endYear] = endDateString.split(' ');
            const endMonthAbb = endMonth.substring(0,3);
            const endYearAbb = endYear.slice(2);

            const formattedStartDate = `${startDate} ${monthAbb}`;
            const formattedEndDate = `${endDate} ${endMonthAbb}`;

            // Present every data point as Monday of every week
            const formattedDateRange = formattedStartDate;
            processedData.push({month: formattedDateRange, rating: rating});

        } else {
            // Monthly Aggregation
            const monthYear = period.split(" ");
            const monthAbbreviation = monthYear[0].slice(0,3); // extract first 3 characters
            const year = monthYear[1].slice(2); // extract last 2 characters
            processedData.push({ month: `${monthAbbreviation} ${year}`, rating: rating });

            // Sort data according to year and month
            processedData.sort((a,b) => {
                // Extract years from month strings
                const yearA = parseInt(a.month.split(" ")[1]);
                const yearB = parseInt(b.month.split(" ")[1]);

                // Extract months from month strings and convert them to numerical representation
                const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthA = monthOrder.indexOf(a.month.split(" ")[0]);
                const monthB = monthOrder.indexOf(b.month.split(" ")[0]);

                // Compare years
                if (yearA !== yearB) {
                    return yearA - yearB;
                } else {
                    // If years are equal, compare months
                    return monthA - monthB;
                }
            });

        }
    });
    return (processedData);
}
