// {/*Crosshair Documentation: inspect or target any data point on mouse move*/}
// {/*A thin horizontal line and a vertical line indicate the data point with the information displaued in an interactive tooltip*/}

import { LineChart } from '@mantine/charts';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function TimeSeries() {
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

    // function to get avg number of stars per bank by month
    function avgRatingsByBank(data){

        // group data by month and bank
        const groupedData = {};
        data.forEach(({ month, bank, rating }) => {
            if (!groupedData[month]) groupedData[month] = {};
            if (!groupedData[month][bank]) groupedData[month][bank] = [];
    
            groupedData[month][bank].push(rating);
        });
    
        // calculate avg rating for each bank within each month
        const result = [];
        for (const month in groupedData){
            const entry = { month: parseInt(month) };

        
            // to CHANGE according to what banks there are
            const allBanks = ['GXS', 'OCBC', 'UOB'];
            allBanks.forEach(bank => {
                if (!groupedData[month][bank]) {
                    entry[bank] = 0;
                } else {
                    const avgRating = groupedData[month][bank].reduce((acc, val) => acc + val, 0) / groupedData[month][bank].length;
                    entry[bank] = avgRating.toFixed(1); // round avg rating to 1dp
                    entry[bank] = parseFloat(entry[bank]);
                }
            });
            result.push(entry);
        }
        return result;
    }
    
    const finalData = avgRatingsByBank(reviewsData)
    finalData.forEach(obj => {
        for (const key in obj) {
          if (key !== 'month' && Number.isInteger(obj[key])) {
            obj[key] = obj[key].toFixed(1);
            obj[key] = parseFloat(obj[key]); // strips the '.0' in 9.0!!!!!
          }
    
        }
      });


    return (
        // will only plot for existent data: if no data for 3rd month, axis will have no 3
        <LineChart
            h={200}
            data={finalData}
            dataKey="month"
            // legend placement has some issues
            //withLegend
            //legendProps={{ position: 'bottom', style: { display: 'flex', flexDirection: 'row' } }}
            tooltipAnimationDuration={200}
            series={[
                {name: 'GXS', color: 'purple'},
                {name: 'OCBC', color: 'red'},
                {name: 'UOB', color: 'blue'}
            ]}
        />
    );
}
