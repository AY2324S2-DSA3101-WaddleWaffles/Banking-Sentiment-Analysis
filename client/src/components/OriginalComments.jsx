import React, { useState, useEffect } from 'react';
import { Badge, Blockquote, Loader, Rating } from '@mantine/core';
import { IconMoodAngry, IconMoodNeutral, IconMoodHappy } from '@tabler/icons-react';
import TopicFilterPR from './TopicFilterPR';

export default function OriginalComments({ selectedDateRange, refreshFlag }) {
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [features_listPR, setFeaturesListPR] = useState([]); 
  const [ selectedFeaturesPR, setselectedFeaturesPR] = useState([]); 
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

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        setCommentsData(data);
        
        // Extracting list of topics in the time period
        const topics = [...new Set(data.flatMap(item => item.topic))];
        const sortedTopics = topics.sort((a, b) => a.localeCompare(b)); // Sort topics alphabetically
        setFeaturesListPR(sortedTopics);
        setselectedFeaturesPR(sortedTopics); // Set selected features to all features initially
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);

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

  // Rendering to display fetched data
  return (
    <div>
      <h2 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px' }}>
        Reviews
      </h2>

      {/* Render badges and filter outside of loading and data display sections */}
      <p style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight:'10px' }}>
        <Badge size='xs' circle color='red'></Badge>
        <span style={{ marginLeft: '5px' }}>
          Negative
        </span>

        <Badge size='xs' circle color='yellow' style={{ marginLeft: '10px' }}></Badge>
        <span style={{ marginLeft: '5px' }}>
          Neutral
        </span>

        <Badge size='xs' circle color='green' style={{ marginLeft: '10px' }}></Badge>
        <span style={{ marginLeft: '5px' }}>
          Positive
        </span>

        <TopicFilterPR 
        handleFeaturesChangePR={handleFeaturesChangePR} 
        selectedFeaturesPR={selectedFeaturesPR} 
        features_listPR={features_listPR}
        />

      </p>
      {isLoading ? (
        <p><Loader color='blue' /></p>
      ) : sortedCommentsData.length > 0 ? (
        <>
          {/* Data display section */}
          {sortedCommentsData.map((comment, index) => (
            <Blockquote
              className='small-blockquote'
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
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'gray', marginBottom: '10px' }}>
            All reviews for the selected date range have been shown.
          </p>

        </>
      ) : (
        <div>
          <p>
            No reviews found for the selected date range.
          </p>
        </div>

      )}
    </div>
  );
}
