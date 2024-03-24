import { LineChart } from '@mantine/charts';
// import {testData} from './data';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


// need data with percentages for each sentiment, according to date/month

export default function LineData() {
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
      // fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/api/reviews')
        .then(response => {
          console.log('Retrieved data:', response.data);
          setReviews(response.data); // Update reviewsData state
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle error, e.g., display error message to user
        });
    }, []);

    // function to process data and calculate 
    function calcSentimentPercentage(data){
        const result =[];
        
        // filter data for GXS bank
        const gxsData = data.filter(entry => entry.bank === 'GXS');

        // group data by month
        const groupedData = gxsData.reduce((acc, entry) => {
            acc[entry.month] = acc[entry.month] || { positive: 0, neutral: 0, negative: 0 };
            acc[entry.month][entry.sentiment]++;
            return acc;
        }, {})

        // calculate percentage for each month
        for (const month in groupedData){
            const total = Object.values(groupedData[month]).reduce((acc, val) => acc + val, 0);
            const percentageData ={
                month: parseInt(month),
                positive: ((groupedData[month].positive / total) * 100).toFixed(2),
                neutral: ((groupedData[month].neutral / total) * 100).toFixed(2),
                negative: ((groupedData[month].negative / total) * 100).toFixed(2)
            };
            result.push(percentageData);
        }
        return result;

    };

    const data = calcSentimentPercentage(reviewsData);
    console.log(data);

    return (
        <LineChart
            h={200}
            w={400}
            data={data}
            dataKey='month'
            series={[
                {name: 'positive', color: 'green'},
                {name: 'neutral', color: 'grey'},
                {name: 'negative', color: 'red'},
            ]} 
        />
    );
}
