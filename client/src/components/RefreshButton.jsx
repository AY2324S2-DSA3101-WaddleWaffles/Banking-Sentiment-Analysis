import { useState } from 'react';
import { Button } from '@mantine/core';

export default function RefreshDatabase() {
    const [lastUpdated, setLastUpdated] = useState(null)

    const handleClick = async () => {
        try {
            // make API call to refresh database
            const response = await fetch('http://127.0.0.1:5001/reviews', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    // add any required headers
                },
                // add any request body if needed
            });

            if (response.ok) {
                // if API call successful, update lastUpdated state with current time
                const currentTime = new Date().toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
                setLastUpdated(currentTime);
                console.log('Last updated:', currentTime);
            } else {
                console.error('Failed to update database:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating database:', error.message)
        }
    };

    return (
        <div>
            <Button variant="filled" onClick={handleClick}>
                Refresh
            </Button>
            {lastUpdated && (
                <p>
                    Last updated: {lastUpdated}
                </p>
            )}
        </div>
    );
}
