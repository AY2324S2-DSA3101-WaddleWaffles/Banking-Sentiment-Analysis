import React, { useState, useEffect } from 'react';
import { Container } from "@mantine/core";
import axios from 'axios';
import { DonutChart } from '@mantine/charts';
// import GetDonutLabel from './DonutLabel';

export default function DonutChartComponent({ selectedDateRange }){

    // save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

    const api = `http://127.0.0.1:5001/reviews/donut-chart-data?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
    console.log(api);
``
    const [reviewsData, setReviews] = useState([]);
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
    const transformedData = reviewsData.map(item => ({
        name: item.name,
        value: parseFloat((item.value * 100).toFixed(1)),
        color: item.color
    }));
    console.log('Donut transformed data:', transformedData);

    return (
        <Container>
            {/* Pass averageGXS as a prop to GetDonutLabel */}
            {/*<GetDonutLabel averageGXS={averageGXS} />*/}
            <DonutChart 
                h={160}
                w={180}
                data={transformedData}
                mx="auto"
                withTooltip={false}
                //chartLabel={averageGXS} // Use averageGXS as chart label
            />
        </Container>
    );
}