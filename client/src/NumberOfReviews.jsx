// import { Title, MantineProvider } from '@mantine/core';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function GetNumReviews(){
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

    // get number of reviews
    const numReviews = reviewsData.length;

    return numReviews;
}