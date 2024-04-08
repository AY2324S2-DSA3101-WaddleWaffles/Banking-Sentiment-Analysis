// import React, { useState, useEffect } from 'react';

// export default function GetDonutLabel(){
//     const [reviewsData, setReviews] = useState({});
//     const [processedData, setProcessedData] = useState({});
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://127.0.0.1:5001/reviews/average-rating')
//                 const jsonData = await response.json();
//                 setReviews(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data:', error)
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData()
//     }, []);
//     console.log(reviewsData)

//     useEffect(() => {
//         const processData = () => {
//             if (reviewsData && reviewsData.GXS){
//                 const transformedData = reviewsData.GXS.total.toFixed(1) // retrieve GXS average only
//                 setProcessedData(transformedData);
//             };
                
//         };

//         processData();
//     }, [reviewsData]);
//     console.log(processedData);
// };

import React from 'react';

export default function GetDonutLabel({ averageGXS }){
    // No need for useEffect here

    // Render averageGXS as a label
    return (
        <>{averageGXS !== null && <span></span>}</>
    );
}
