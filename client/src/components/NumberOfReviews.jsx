import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function GetNumReviews({ selectedDateRange }) {
    // State variables
    const [gxsCount, setGxsCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        // Save updated start and end dates into variables
        const newStartDate = selectedDateRange.startDate;
        const newEndDate = selectedDateRange.endDate;

        // Change format of start and end date to dd-mm-yyyy
        const formattedStartDate = newStartDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
        const formattedEndDate = newEndDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');

        const api = `http://127.0.0.1:5001/reviews/counts?start-date=${formattedStartDate}&end-date=${formattedEndDate}`;

        const fetchData = async () => {
            try {
                const response = await fetch(api.toString());
                const jsonData = await response.json();
                const gxsData = jsonData.filter(item => item.bank === 'GXS');
                const gxsCount = gxsData[0].count;
                setGxsCount(gxsCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedDateRange]);

    // Render the component
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <p style = {{ margin: '5px 0' }}>{gxsCount}</p>
            )}
        </div>
    );
}
