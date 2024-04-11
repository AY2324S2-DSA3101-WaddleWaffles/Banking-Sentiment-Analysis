import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';

const RefreshDatabase = ({ onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

    
    const handleRefresh = async() => {
        try {
            setLoading(true);
            // make API request to refresh database
            //await axios.get(apiEndpoint); //change to link
            
            onRefresh()

            console.log("Refreshed")
            // handle success
            setLastUpdatedTime(new Date()); // set current time
    } catch (error){
        // handle error
        console.error('Error refreshing data:', error);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        console.log(lastUpdatedTime);
    }, [lastUpdatedTime]);

    // helper function to format date and time
    const formatDateTime = (dateTime) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return dateTime.toLocaleString(undefined, options)
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant = "filled" color = "blue" onClick = {handleRefresh} disabled={loading} style={{marginRight:"5px"}}>
                {loading ? 'Refreshing...': 'Refresh Database'}
            </Button>
            {lastUpdatedTime && (
                <p style={{ fontSize: "12px", margin: "0" }}>Last updated: {formatDateTime(lastUpdatedTime)}</p>
            )}
        </div>
    );
};

// usage
const Refresh = ({onRefresh}) => {
    const apiEndpoint = 'http://127.0.0.1:5001/reviews/average-rating' // NEED TO CONFIRM
    return (
        <div>
             {/* apiEndpoint={apiEndpoint} */}
            <RefreshDatabase onRefresh = {onRefresh}  />
        </div>
    );
};

export default Refresh;