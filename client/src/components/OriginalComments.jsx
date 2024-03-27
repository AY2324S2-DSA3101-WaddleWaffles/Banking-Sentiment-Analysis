import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Select, Grid } from "@mantine/core";

export default function OriginalComments(){
    const [reviewsData, setReviews] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        // fetch data from API endpoint
        axios.get('http://127.0.0.1:5001/api/reviews')
            .then(response => {
                console.log('Retrieved data:', response.data);
                // Extract the "review" field from each object in the response data
                const reviews = response.data;
                setReviews(reviews); // Update reviewsData state with the review data
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                // Handle error, e.g., display error message to user
            });
    }, []);

    // Filter options
    const filterOptions = [
        { value: "critical", label: "Most critical" },
        { value: "favourable", label: "Most favourable" },
        { value: "recent", label: "Most recent" },
    ];

    // Function to render comments based on the selected filter
    const renderComments = () => {
        let filteredComments = [...reviewsData]; // create a copy such that original data is not altered

        if (filter === "critical") {
            filteredComments = filteredComments.filter(comment => comment.sentiment === "neg");
        } else if (filter === "favourable") {
            filteredComments = filteredComments.filter(comment => comment.sentiment === "pos");
        } else if (filter === "recent") {
            filteredComments.sort((a, b) => {
                const dateA = new Date(`${a.year}-${a.month}-${a.day}`);
                const dateB = new Date(`${b.year}-${b.month}-${b.day}`);
                return dateB - dateA; // Sort based on most recent dates
            });
        }

        return (
            <>
                <Grid style={{ marginBottom: "10px" }}>
                    <Grid.Col span={3}>Date</Grid.Col>
                    <Grid.Col span={3}>Review</Grid.Col>
                    <Grid.Col span={3}>Sentiment</Grid.Col>
                    <Grid.Col span={3}>Topic</Grid.Col>
                </Grid>
                {filteredComments.map((comment, index) => (
                    <Grid key={index} style={{ marginBottom: "10px" }}>
                        <Grid.Col span={3}>{`${comment.day}-${comment.month}-${comment.year}`}</Grid.Col>
                        <Grid.Col span={3}>{comment.review}</Grid.Col>
                        <Grid.Col span={3}>{comment.sentiment}</Grid.Col>
                        <Grid.Col span={3}>{comment.topic}</Grid.Col>
                    </Grid>
                ))}
            </>
        );
    };

    return (
        <div>
            <h2>Original Comments</h2>
            <Select
                placeholder="Sort by: "
                data={filterOptions}
                value={filter}
                onChange={(value) => setFilter(value)}
                clearable
                style={{ position: "sticky", top: "40px", zIndex: "1000" }}
            />
            <div style={{ height: "300px", overflowY: "auto" }}>
                {renderComments()}
            </div>
        </div>
    );
}
