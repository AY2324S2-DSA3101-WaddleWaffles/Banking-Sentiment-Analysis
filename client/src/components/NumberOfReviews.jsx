// import { Title, MantineProvider } from '@mantine/core';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function GetNumReviews(){
    console.log(selectedDateRange);

    // save updated start and end dates into variable
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;

    // change format of start and end date to dd-mm-yyyy
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');

    const [filteredData, setFilteredData] = useState([]);
    const api = `http://127.0.0.1:5001/reviews/counts?start-date=${formattedStartDate}&end-date=${formattedEndDate}`
    console.log(api.toString());
    
    useEffect(() => {
        // Fetch data from API endpoint
        axios.get(api.toString())
            .then(response => {
                console.log('Retrieved data:', response.data);
                // Filter the fetched data based on the selected date range
                //const filtered = filterDataByDateRange(response.data, selectedDateRange);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });
    }, [selectedDateRange]); // Run effect whenever selectedDateRange changes
    console.log(filteredData);


    // get number of reviews for GXS only
    //const numReviews = filteredData['GXS'];

    //return numReviews;
}