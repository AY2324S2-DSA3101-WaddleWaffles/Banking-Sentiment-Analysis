import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mantine/charts';
import { Paper, Text } from '@mantine/core';

function TimeSeriesGXS(){
    const [reviewsData, setReviews] = useState({});
    const [processedData, setProcessedData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5001/reviews/average-rating');
                const jsonData = await response.json();
                setReviews(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    console.log(reviewsData);

    useEffect(() => {
        const processData = () => {
            if (reviewsData && reviewsData.GXS) {
                const gxsData = reviewsData.GXS;
                const transformedData = Object.keys(gxsData)
                    .filter(month => month != 'total')
                    .map(month => ({
                        month: convertMonthFormat(month),
                        value: gxsData[month]
                    }));
                setProcessedData(transformedData);
            }
        };

        processData();
    }, [reviewsData]);
    console.log(processedData);
    
    // convert to Mon-YY 
    function convertMonthFormat(month) {
        const [mm, yyyy] = month.split('-');
        const date = new Date(`${yyyy}-${mm}-01`);
        return date.toLocaleString('default', { month: 'short', year: '2-digit' });
    }

    // function for tooltip
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
    }

    return (
        // <div style = {{ marginTop: '10px' , marginLeft: '-30px' }}> 
            <LineChart 
                h = "100%" // adjust margins after layout done!!!!!!
                w = "100%"
                data = {processedData}
                dataKey = "month" // change to week if filter <= 2 months? HOW??
                series={[{name: 'value', color: 'indigo.6'}]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                
            />
        // </div>
    )

};

export default TimeSeriesGXS;