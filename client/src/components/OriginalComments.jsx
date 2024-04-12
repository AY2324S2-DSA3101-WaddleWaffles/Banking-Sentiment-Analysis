import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import { Blockquote } from "@mantine/core";
import { IconInfoCircle } from '@tabler/icons-react';


export default function OriginalComments({ selectedDateRange, refreshFlag }) {
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data!
  useEffect(() => {
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');
    const api = `http://127.0.0.1:5001/reviews?start-date=${formattedStartDate}&end-date=${formattedEndDate}`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();

        // Filter for GXS Bank data only
        const gxsData = data.filter(review => review.bank === "GXS");
        setCommentsData(gxsData);
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);

  const getSentimentIcon = (sentiment) => {
    // This function will return an appropriate icon based on the sentiment
    // For simplicity, using the same icon for now. You can customize this to return different icons
    return <IconInfoCircle />;
  };

  return (
    <div>
      {isLoading ? (
        <p> <Loader color="blue" />;</p>
      ) : commentsData.length > 0 ? (
        <div>
          {commentsData.map((comment, index) => (
            <Blockquote
              className="small-blockquote"  
              key={index}
              icon={getSentimentIcon(comment.sentiment)}
              iconSize={50}
              color={"red"} // Assuming the function returns 'green', 'red', or 'yellow'
              cite={`- ${comment.title}, Sentiment: ${comment.sentiment}`}
            >
              {comment.review}
            </Blockquote>
          ))}
        </div>
      ) : (
        <p>No reviews found for the selected date range.</p>
      )}
    </div>
  );
}
