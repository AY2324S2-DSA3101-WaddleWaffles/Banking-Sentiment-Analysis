import React, { useState, useEffect } from 'react';
import { Loader, ThemeIcon } from '@mantine/core';
import { IconLogin2, IconDevicesCode, IconDeviceTablet, 
  IconReload, IconNotification, IconBrandSpeedtest,
  IconApps, IconUserHeart, IconLock } from '@tabler/icons-react';

export default function TopWords({ selectedDateRange, refreshFlag }) {
  const [commentsData, setCommentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Convert date range into the required DD-MM-YYYY format
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');

    // API link for LLM generated suggestions regarding GXS bank reviews with specified date range
    const api = `http://127.0.0.1:5001/reviews/word-associations?bank=GXS&start-date=${formattedStartDate}&end-date=${formattedEndDate}`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const data = await response.json();
        setCommentsData(data);
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);

  // Process data from the API response
  const processedData = commentsData.length > 0 ? commentsData[0]?.associations : {};

  // Check if processed data is empty
  const isEmpty = Object.keys(processedData).length === 0;

  // Assign different icons for each association category
  const associationIcons = {
    login: <IconLogin2/>,
    interface: <IconDevicesCode />,
    stability: <IconDeviceTablet/>,
    update: <IconReload/>,
    notifications: <IconNotification/>,
    speed: <IconBrandSpeedtest/>,
    functions: <IconApps />,
    service: <IconUserHeart />,
    security: <IconLock />
  };

  // Rendering to display fetched data
  return (
    <div>
      <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
        Top Words
      </h2>

      {isLoading ? (
        <p><Loader color='blue' /></p>
      ) : (
        <>
          {isEmpty ? (
            <div>
              <p>
                No reviews found for the selected date range.
              </p>
            </div>

          ) : (
            // If there are reviews, then iterate through each category to show top words
            <div style={{ columnCount: 2, columnGap: '10px' }}>
              {Array.from(Object.keys(processedData)).map((association) => (
                <div key={association} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <ThemeIcon variant='light' radius='md' size='xs' color='violet' style={{ marginRight: '10px'}}>
                    {associationIcons[association]}
                  </ThemeIcon>

                  <span style={{ fontWeight: 'bold', textTransform: 'uppercase', marginRight: '10px', fontSize: '11px'  }}>
                    {association}:
                  </span>

                  {/* Check if category has top words to show */}
                  {processedData[association] && processedData[association].length > 0 ? (
                    <p style={{ margin: 0, fontSize: '11px', textAlign: 'left' }}>
                      {processedData[association].map(([word]) => word.charAt(0).toUpperCase() + word.slice(1)).join(', ')}
                    </p>

                  ) : (
                    <p style={{ fontStyle: 'italic', color: 'gray'}}>
                      No information for this category
                    </p>

                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
