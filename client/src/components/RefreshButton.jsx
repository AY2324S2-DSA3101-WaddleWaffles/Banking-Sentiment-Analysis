import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';

const RefreshDatabase = ({ onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [lastUpdatedTime, setLastUpdatedTime] = useState(null);
    const [alreadyUpdated, setAlreadyUpdated] = useState(false);
    const [latestDay, setlatestDay] = useState(null);

    const handleRefresh = async() => {
        try {
            setLoading(true);
            // Make API request to refresh database
            const api = "http://127.0.0.1:5001/update-database"
            const response = await axios.get(api);
            const data = response.data;
            const updateStatus = data.status;
            
            // Make the API request for latest review's date
            const api_date = "http://127.0.0.1:5001/latest-day"
            const response_date = await axios.get(api_date);
            const data_date = response_date.data;
            const latest_day = data_date.latest_day;
            setlatestDay(latest_day);

            if (updateStatus == true){
                onRefresh()
                // Handle success
                setLastUpdatedTime(new Date()); // set current time
                setAlreadyUpdated(false);
            }
            else{
                // If updateStatus == false, means nothing to update
                setAlreadyUpdated(true);
            }
        } catch (error){
            console.error('Error refreshing data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    }, [lastUpdatedTime]);

    // Helper function to format date and time
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
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <Button variant = "filled" color = "#666fc9" onClick = {handleRefresh} disabled={loading} style={{marginRight:"5px"}}>
                <span>
                    {loading ? 'Refreshing...': 'Refresh Database'}
                </span>
            </Button>
            {alreadyUpdated ? (
                <div>
                    <p style={{ fontSize: "12px", margin: "0", color:"white", marginLeft:"10px" }}> Database is already up-to-date. </p>
                    <p style={{ fontSize: "12px", margin: "0", color:"white", marginLeft:"10px"  }}>Last review as of: {latestDay}</p>
                </div>
            ) : (
                lastUpdatedTime && (
                    <div>
                        <p style={{ fontSize: "12px", margin: "0", color:"white", marginLeft:"10px"  }}>Last updated: {formatDateTime(lastUpdatedTime)}</p>
                        <p style={{ fontSize: "12px", margin: "0", color:"white", marginLeft:"10px"  }}>Last review as of: {latestDay}</p>
                    </div>
                )
            )}
        </div>
    );
};

// Usage
const Refresh = ({onRefresh}) => {
    return (
        <div>
            <RefreshDatabase onRefresh = {onRefresh}  />
        </div>
    );
};

export default Refresh;