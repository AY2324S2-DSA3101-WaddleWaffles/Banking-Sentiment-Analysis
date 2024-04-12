// import React, { useState, useEffect } from 'react';
// import { Container } from "@mantine/core";
// import axios from 'axios';

// export default function GetDonutLabel({ selectedDateRange }){
//     console.log(selectedDateRange);

//     // save updated start and end dates into variable
//     const newStartDate = selectedDateRange.startDate;
//     const newEndDate = selectedDateRange.endDate;

//     // change format of start and end date to dd-mm-yyyy
//     const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
//     const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

//     const api = `http://127.0.0.1:5001/reviews/average-rating?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
//     console.log(api);

//     const [reviewsData, setReviews] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(api.toString());
//                 const jsonData = await response.json();
//                 setReviews(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [selectedDateRange]);
//     console.log(reviewsData);

//     // filter for GXS data only
//     const gxsData = reviewsData.filter(item => item.bank === 'GXS');
//     console.log(gxsData);

//     // just need to extract the total element
//     const averageLabel = (gxsData[0].average_ratings.total).toFixed(1);

//     return <div>{averageLabel}</div>;
// }


// DONUT CHART OLD CODE
// import React, { useState, useEffect } from 'react';
// import { Container } from "@mantine/core";
// import axios from 'axios';
// import { DonutChart } from '@mantine/charts';
// import GetDonutLabel from './DonutLabel';


// export default function DonutChartComponent({ selectedDateRange }){
//     console.log(selectedDateRange);

//     // save updated start and end dates into variable
//     const newStartDate = selectedDateRange.startDate;
//     const newEndDate = selectedDateRange.endDate;

//     // change format of start and end date to dd-mm-yyyy
//     const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
//     const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

//     const api = `http://127.0.0.1:5001/reviews/donut-chart-data?start-date=${formattedStartDate}&end-date=${formattedEndDate}`

//     const [reviewsData, setReviews] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(api.toString());
//                 const jsonData = await response.json();
//                 setReviews(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [selectedDateRange]);

//     // process data
//     const transformedData = reviewsData.map(item => ({
//         name: item.name,
//         value: parseFloat((item.value * 100).toFixed(1)),
//         color: item.color
//     }));
//     console.log('Donut transformed data:', transformedData);

//     // API FOR DONUT CHART LABEL
//     const api2 = `http://127.0.0.1:5001/reviews/average-rating?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
//     console.log(api2);

//     const [labelData, setLabels] = useState([]);
//     const [isLoadingg, setIsLoadingg] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(api2.toString());
//                 const jsonData = await response.json();
//                 setLabels(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setIsLoadingg(false);
//             }
//         };

//         fetchData();
//     }, [selectedDateRange]);
//     console.log(labelData);

//     // filter for GXS data only
//     const gxsData = labelData.filter(item => item.bank === 'GXS');
//     console.log(gxsData);

//     // just need to extract the total element
//     const averageLabel = gxsData[0].average_ratings.total;
//     console.log(averageLabel);

//     return <div>
//             {/* <GetDonutLabel selectedDateRange={selectedDateRange} /> */}
//             <DonutChart data={transformedData} 
//                 h = {380}
//                 w = {280}
//                 mx = "auto"
//                 withTooltip={false} 
//                 chartLabel={averageLabel}
//             />
//         </div>
// };

// NUMBER OF REVIEWS OLD CODE
// // import { Title, MantineProvider } from '@mantine/core';
// import axios from 'axios';
// import React, {useState, useEffect} from 'react';

// export default function GetNumReviews({ selectedDateRange }){
//     console.log(selectedDateRange);

//     // save updated start and end dates into variable
//     const newStartDate = selectedDateRange.startDate;
//     const newEndDate = selectedDateRange.endDate;

//     // change format of start and end date to dd-mm-yyyy
//     const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
//     const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

//     const [reviewsData, setReviews] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const api = `http://127.0.0.1:5001/reviews/counts?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
    
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(api.toString());
//                 const jsonData = await response.json();
//                 setReviews(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [selectedDateRange]);


//     // get number of reviews for GXS only
//     const gxsData = reviewsData.filter(item => item.bank === 'GXS');
//     console.log(gxsData);
//     const gxsCount = gxsData[0].count;
//     //console.log(gxsCount);

//     return gxsCount;
// }
