import React, { useState, useEffect } from 'react';

import { Badge, Blockquote, Loader, Rating } from "@mantine/core";
import { IconMoodAngry, IconMoodNeutral, IconMoodHappy } from '@tabler/icons-react';
import TopicFilterPR from './TopicFilterPR'


export default function OriginalComments({ selectedDateRange, refreshFlag }) {
  // First, fetch data ◍•ᴗ•◍
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [features_listPR, setFeaturesListPR] = useState([]); //features_list from data
  const [ selectedFeaturesPR, setselectedFeaturesPR] = useState([]); //selected features from TopicFilter

  //this is used in filtering
  const handleFeaturesChangePR = (ftrPR) => {
    if (selectedFeaturesPR.includes(ftrPR)) {
      setselectedFeaturesPR(selectedFeaturesPR.filter((selectedFeaturesPR) => selectedFeaturesPR !== ftrPR));
    } else {
      setselectedFeaturesPR([...selectedFeaturesPR, ftrPR]);
    }
  };

  useEffect(() => {
    // Convert date range into the required DD-MM-YYYY formart
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');

    // API link for GXS bank reviews with specified date range
    const api = `http://127.0.0.1:5001/reviews?bank=GXS&start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
    console.log("apiendpoint:",api)

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        // console.log("Data from Original Comments", response)

        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }

        const data = await response.json();
        //console.log("Data from Original comments", data)
        setCommentsData(data);
        
        //extracting list of topics in the time period
        const topics = [...new Set(data.flatMap(item => item.topic))];
        setFeaturesListPR(topics);
        topics.forEach(featurePR => {
          if (!selectedFeaturesPR.includes(featurePR)) {
            setselectedFeaturesPR(selectedFeaturesPR => [...selectedFeaturesPR, featurePR]);
          }
         });

         //console.log("topics:", topics)

      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    

    fetchData();
  }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);
  // Data is fetched 


  // Sort commentsData by date in descending order (most recent first)
  const sortedCommentsDataDate = commentsData.slice().sort((a, b) => {
    const dateA = new Date(a.year, a.month - 1, a.day);
    const dateB = new Date(b.year, b.month - 1, b.day);
    return dateB - dateA;
  });

  const sortedCommentsData = sortedCommentsDataDate.filter(item => selectedFeaturesPR.includes(item.topic));


  // Assign different icons for different review sentiment
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return <IconMoodHappy />;
      case 'Neutral':
        return <IconMoodNeutral />;
      case 'Negative':
        return <IconMoodAngry />;
    }
  };

  // Assign different colors for different review sentiment
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return 'green';
      case 'Neutral':
        return 'yellow';
      case 'Negative':
        return 'red';
    }
  };

  // Display review date as long format 
  const getCommentDate = (day, month, year) => {
    const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript dates
    return date.toLocaleDateString('en-SG', { year: 'numeric', month: 'long', day: 'numeric' });
  };


  // Yay, all set! Now, we can display the reviews on the webpage (ㅎ.ㅎ)✧˖°
  return (
    <div>
      <h2 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px' }}>
        Reviews
      </h2>
      {isLoading ? (
        <p><Loader color="blue" />;</p>
      ) : sortedCommentsData.length > 0 ? (
        <>
          {/* Legend for the colors of blockquotes */}
          <p style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight:'50px' }}>
            
            <Badge size="xs" circle color="red"></Badge>
            <span style={{ marginLeft: '5px' }}>Negative</span>
            <Badge size="xs" circle color="yellow" style={{ marginLeft: '10px' }}></Badge>
            <span style={{ marginLeft: '5px' }}>Neutral</span>
            <Badge size="xs" circle color="green" style={{ marginLeft: '10px' }}></Badge>
            <span style={{ marginLeft: '5px' }}>Positive</span>
            <TopicFilterPR  handleFeaturesChangePR={handleFeaturesChangePR} selectedFeaturesPR={selectedFeaturesPR} features_listPR = {features_listPR}/>
          </p>

          {/* Blockquotes shows these info of each review: topic being reviews, review content, review date  */}
          {sortedCommentsData.map((comment, index) => (
            <Blockquote
              className="small-blockquote"
              key={index}
              icon={getSentimentIcon(comment.sentiment)}
              iconSize={30}
              color={getSentimentColor(comment.sentiment)}
              cite={`- Reviewed on: ${getCommentDate(comment.day, comment.month, comment.year)}`}
              style={{ marginBottom: '10px', marginLeft:'10px' }} 
            >
              <div style={{ marginBottom: '5px' }}> 
              <Badge color={getSentimentColor(comment.sentiment)}>{comment.topic}</Badge>
              </div>
              <div style={{ marginBottom: '5px' }}> 
              <Rating value={comment.rating} fractions={2} readOnly />
              </div>
              {comment.review}
            </Blockquote>
          ))}
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'gray', marginBottom: '10px' }}>All reviews for the selected date range have been shown.</p>
        </>
      ) : (
        <div>
          {/* If there are no review found, show this instead */}
          <p>No reviews found for the selected date range.</p>
        </div>
      )}
    </div>
  );
}