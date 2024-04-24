import React, { useState, useEffect } from 'react';
import { DonutChart } from '@mantine/charts';
import { Paper, Text} from '@mantine/core';
import classes from "./DonutChart.module.css";

export default function DonutChartComponent({ selectedDateRange, refreshFlag }) {
    const [transformedData, setTransformedData] = useState([]);
    const [averageLabel, setAverageLabel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // Change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    
    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = `http://127.0.0.1:5001/reviews/donut-chart-data?start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                const transformedData = jsonData.map(item => ({
                    ...item,
                    value: Math.round((item.value * 100)*10)/10
                }));
                setTransformedData(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedDateRange, refreshFlag]);

    useEffect(() => {
        const fetchLabelData = async () => {
            try {
                const api2 = `http://127.0.0.1:5001/reviews/average-rating?start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
                const response = await fetch(api2.toString());
                const jsonData = await response.json();
                const gxsData = jsonData.filter(item => item.bank === 'GXS');
                const averageLabel = (gxsData[0].total_rating).toFixed(1);
                setAverageLabel(averageLabel);
            } catch (error) {
                console.error('Error fetching label data:', error);
            }
        };
        fetchLabelData();
    }, [selectedDateRange]);

    return (
        <div className={classes.label} style = {{display: 'flex', height: '100%', justifyContent: 'center'}}>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <div style = {{display: 'flex'}} >
                    <DonutChart 
                        data={transformedData}
                        tooltipProps={{
                            content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                        }}
                        h={200}
                        w={180}
                        mx='auto'
                        size = {180}
                        thickness = {27}
                        chartLabel= {averageLabel}
                    />
                </div>
            )}
        </div>
    );
};

// Function for tooltip
function ChartTooltip({ label, payload }) {
    if (!payload) return null;
  
    return (
        <Paper px='md' py='sm' withBorder shadow='md' radius='md'>
            <Text fw={500} mb={5} style={{color: 'black'}}>
                {label}
            </Text>
            {payload.map(item => (
                <Text key={item.name} c={item.color} fz='sm'>
                    {item.name}: {item.value}
                </Text>
            ))}
        </Paper>
    );
};

