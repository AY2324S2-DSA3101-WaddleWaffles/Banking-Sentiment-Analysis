import React, { useState, useEffect } from 'react';
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
<<<<<<< HEAD
                //console.log('Donut Retrieved data:', response.data);
=======
                console.log('Donut Retrieved data:', response.data);
>>>>>>> 2be0b9cdedc02e9d16044f6ab6e89b083844979c
                setReviews(response.data); // Update reviewsData state
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });

        // fetch data for overall average rating for last n months
        axios.get('http://127.0.0.1:5001/reviews/average-rating')
            .then(response => {
<<<<<<< HEAD
                //console.log('Retrieved label data:', response.data);
=======
                console.log('Retrieved label data:', response.data);
>>>>>>> 2be0b9cdedc02e9d16044f6ab6e89b083844979c
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
<<<<<<< HEAD
    //console.log('Donut transformed data:', transformedData);

    return (
        <div style={{ marginLeft: '-30px', height: "250px" }}>
            {/* Pass averageGXS as a prop to GetDonutLabel */}
            <GetDonutLabel averageGXS={averageGXS} />
            <DonutChart 
                h="90%"
=======
    console.log('Donut transformed data:', transformedData);

    return (
        <div style={{ marginLeft: '-600px', height: "250px" ,marginTop: "-200px"}}>
            {/* Pass averageGXS as a prop to GetDonutLabel */}
            <GetDonutLabel averageGXS={averageGXS} />
            <DonutChart 
                h="100%"
>>>>>>> 2be0b9cdedc02e9d16044f6ab6e89b083844979c
                data={transformedData}
                mx="auto"
                withTooltip={false}
                chartLabel={averageGXS} // Use averageGXS as chart label
            />
        </div>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> 2be0b9cdedc02e9d16044f6ab6e89b083844979c
