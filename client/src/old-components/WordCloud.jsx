import ReactWordcloud from "react-wordcloud"; // npm install react-wordcloud
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your',
'but', 'the', 'and', 'with', 'is', 'it\'s', 'to', 'was', 'of', 'a', 'their', 'has', 'not', 'had',]


export default function WordCloud(){
    const [reviewsData, setReviews] = useState([]);

    useEffect(() => {
      // fetch data from API endpoint
      axios.get('http://127.0.0.1:5001/api/reviews')
        .then(response => {
          console.log('Retrieved data:', response.data);
            // Extract the "review" field from each object in the response data
            const reviews = response.data.map(review => review.review);
            setReviews(reviews); // Update reviewsData state with only the review texts
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
          // Handle error, e.g., display error message to user
        });
    }, []);

    // Prepare data for word cloud with stop words removed
    const wordCloudData = reviewsData.reduce((accumulator, review) => {
    const words = review.split(/\s+/); // Split review into words
    words.forEach(word => {
        const lowerCaseWord = word.toLowerCase(); // Convert word to lowercase for case-insensitive comparison
        // Check if word is not a stop word and not empty
        if (!stopwords.includes(lowerCaseWord) && lowerCaseWord.trim() !== "") {
        const existingWord = accumulator.find(item => item.text === lowerCaseWord);
        if (existingWord) {
            existingWord.value++; // Increment value if word already exists
        } else {
            accumulator.push({ text: lowerCaseWord, value: 1 }); // Add new word with value 1
        }
        }
    });
    return accumulator;
    }, []);

  
    // Options for word cloud
    const wordCloudOptions = {
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    rotations: 2,
    rotationAngles: [0, 0],
    scale: "sqrt",
    spiral: "rectangular",
    transitionDuration: 1000,
    };

    // CSS style for the container holding the word cloud
    const containerStyle = {
      width: "100%", // Set the width of the container
      height: "100%", // Set the height of the container
    };

  // Render the WordCloud component with wordCloudData, wordCloudOptions, and custom container style
  return (
  <div style={containerStyle}>
      <ReactWordcloud words={wordCloudData} options={wordCloudOptions} />
  </div>
  );
}