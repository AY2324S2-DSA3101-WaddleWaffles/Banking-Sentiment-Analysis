import React, { useState, useEffect } from 'react';
import { Container } from "@mantine/core";
import axios from 'axios';
import { DonutChart } from '@mantine/charts';
import GetDonutLabel from './DonutLabel';

export default function DonutChartComponent(){
    const [reviewsData, setReviews] = useState([]);
    const [averageGXS, setAverageGXS] = useState(null); // State to hold averageGXS

    useEffect(() => {
        // fetch data from API endpoint for the values
        axios.get('http://127.0.0.1:5001/reviews/donut-chart-data')
            .then(response => {
                console.log('Donut Retrieved data:', response.data);
                setReviews(response.data); // Update reviewsData state
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });

        // fetch data for overall average rating for last n months
        axios.get('http://127.0.0.1:5001/reviews/average-rating')
            .then(response => {
                console.log('Retrieved label data:', response.data);
                // Set averageGXS state here
                setAverageGXS(response.data.GXS.total.toFixed(1));
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });
    }, []);

    // process data
    const transformedData = reviewsData.map(item => ({
        name: item.name,
        value: parseFloat((item.value * 100).toFixed(2)),
        color: item.color
    }));
    console.log('Donut transformed data:', transformedData);

    return (
        <Container>
            {/* Pass averageGXS as a prop to GetDonutLabel */}
            <GetDonutLabel averageGXS={averageGXS} />
            <DonutChart 
                h={160}
                w={180}
                data={transformedData}
                mx="auto"
                withTooltip={false}
                chartLabel={averageGXS} // Use averageGXS as chart label
            />
        </Container>
    );
}
