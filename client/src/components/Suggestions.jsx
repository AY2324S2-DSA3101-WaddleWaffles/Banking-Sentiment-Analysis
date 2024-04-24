import React, { useState, useEffect } from 'react';
import { Accordion, ThemeIcon } from '@mantine/core';
import { IconBulb } from '@tabler/icons-react';

const Suggestions = ({ selectedDateRange, refreshFlag }) => {
  const [data, setData] = useState({ suggestions: {} });
  const [isLoading, setIsLoading] = useState(true);

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

    // API link for suggested solutions pertaining to GXS reviews with specified date range
    const api = `http://127.0.0.1:5001/reviews/suggestions?bank=GXS&start-date=${formattedStartDate}&end-date=${formattedEndDate}`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '20px', marginBottom: '10px' }}>
        <ThemeIcon variant='light' radius='xl' size='lg' color='violet' style={{ marginRight: '5px', verticalAlign: 'middle' }}>
          <IconBulb style={{ width: '70%', height: '70%' }}/>
        </ThemeIcon>

        <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
          Suggestions for Different Areas
        </span>
      </div>

      <div className = 'small-accordion'>
        <Accordion variant='contained' transitionDuration={500} >
          {Object.entries(data.suggestions).map(([category, content], idx) => (
            <Accordion.Item key={idx} value={category}>
              <Accordion.Control style={{ color: 'white', backgroundColor: '#666fc9', borderRadius: '0px' }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Accordion.Control>
              <Accordion.Panel style={{ backgroundColor: '#37384a' }}>
                <p>
                  {content}
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
export default Suggestions;
