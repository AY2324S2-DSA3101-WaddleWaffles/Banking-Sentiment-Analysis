// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DonutChart } from '@mantine/charts';
// //import GetDonutLabel from './DonutLabel';

// function DonutChartComponent(){
//     const [avgData, setAvg] = useState({});
//     const [processedData, setProcessedData] = useState({});
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5001/reviews/donut-chart-data');
//                 const jsonData = await response.json();
//                 setAvg(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
        
//         fetchData();
//     }, []);
//     console.log(avgData); 

//     useEffect(() => {
//         const processData = () => {
//             if (avgData && Object.keys(avgData).length > 0) {
//                 const transformedData = Object.values(avgData).map(item => ({
//                     name: item.name,
//                     value: parseFloat((item.value * 100).toFixed(2)),
//                     color: item.color
//                 }));
//                 setProcessedData(transformedData);
//             }
//         };

//         processData();
//     }, [avgData]);
//     console.log(processedData);

//     return (
//         <div style={{ marginLeft: '-30px', height: "250px" }}>
//             {/* Pass averageGXS as a prop to GetDonutLabel */}
//             {/* <GetDonutLabel averageGXS={averageGXS} /> */}
//             <DonutChart 
//                 h="90%"
//                 data={processedData}
//                 mx="auto"
//                 withTooltip={false}
//                 //chartLabel={averageGXS} // Use averageGXS as chart label
//             />
//         </div>
//     );
// };

// export default DonutChartComponent;

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
        <div style={{ marginLeft: '-30px', height: "250px" }}>
            {/* Pass averageGXS as a prop to GetDonutLabel */}
            <GetDonutLabel averageGXS={averageGXS} />
            <DonutChart 
                h="90%"
                data={transformedData}
                mx="auto"
                withTooltip={false}
                chartLabel={averageGXS} // Use averageGXS as chart label
            />
        </div>
    );
}