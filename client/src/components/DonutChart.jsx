import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DonutChart } from '@mantine/charts';

export default function DonutChartComponent(){
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
      // fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/reviews/donut-chart-data')
        .then(response => {
          console.log('Retrieved data:', response.data);
          setReviews(response.data); // Update reviewsData state
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle error, e.g., display error message to user
        });
    }, []);

    // process data
    const transformedData = reviewsData.map(item => ({
        name: item.name,
        value: (item.value * 100).toFixed(2),
        color: item.color
    }));

    // change data variable accordingly
    return (
        <div>
            <DonutChart data = {transformedData} tooltipDataSource="segment" mx="auto" />
        </div>
    )
}
