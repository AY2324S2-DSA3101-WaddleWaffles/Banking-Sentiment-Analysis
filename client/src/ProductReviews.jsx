import React, { useState } from 'react';
import { Container, Grid, Select } from '@mantine/core';
import "./ProductReviews.css";

function ProductReviews() {
  const [filter, setFilter] = useState('');

  // Filter options
  const filterOptions = [
    { value: 'critical', label: 'Most critical' },
    { value: 'favourable', label: 'Most favourable' },
    { value: 'recent', label: 'Most recent' },
  ];

  // Testing data, need to connect to dataset afterwards
  const comments = [
    { data: 'Comment 1 date 10-02-2022', sentiment: 'Positive', category: 'Service', date: '10-02-2022' },
    { data: 'Comment 2 date 02-01-2022', sentiment: 'Negative', category: 'Product', date: '02-01-2022' },
    { data: 'Comment 3 date 03-01-2022', sentiment: 'Positive', category: 'Service', date: '03-01-2022' },
    { data: 'Comment 4 date 04-01-2022', sentiment: 'Negative', category: 'Product', date: '04-01-2022' },
    { data: 'Comment 5 date 05-01-2022', sentiment: 'Positive', category: 'Service', date: '05-01-2022' },
    { data: 'Comment 6 date 06-01-2022', sentiment: 'Negative', category: 'Product', date: '06-01-2022' },
    { data: 'Comment 7 date 07-01-2022', sentiment: 'Positive', category: 'Service', date: '07-01-2022' },
    { data: 'Comment 8 date 08-01-2022', sentiment: 'Negative', category: 'Product', date: '08-01-2022' },
    { data: 'Comment 9 date 09-01-2022', sentiment: 'Positive', category: 'Service', date: '09-01-2022' },
    { data: 'Comment 10 date 10-01-2022', sentiment: 'Negative', category: 'Product', date: '10-01-2022' },
    { data: 'Comment 11 date 01-02-2022', sentiment: 'Positive', category: 'Service', date: '01-02-2022' },
    { data: 'Comment 12 date 02-02-2022', sentiment: 'Negative', category: 'Product', date: '02-02-2022' },
    { data: 'Comment 13 date 03-02-2022', sentiment: 'Positive', category: 'Service', date: '03-02-2022' },
    { data: 'Comment 14 date 04-02-2022', sentiment: 'Negative', category: 'Product', date: '04-02-2022' },
    { data: 'Comment 15 date 05-02-2022', sentiment: 'Positive', category: 'Service', date: '05-02-2022' },
    { data: 'Comment 16 date 06-02-2022', sentiment: 'Negative', category: 'Product', date: '06-02-2022' },
    { data: 'Comment 17 date 07-02-2022', sentiment: 'Positive', category: 'Service', date: '07-02-2022' },
    { data: 'Comment 18 date 08-02-2022', sentiment: 'Negative', category: 'Product', date: '08-02-2022' },
    { data: 'Comment 19 date 09-02-2022', sentiment: 'Positive', category: 'Service', date: '09-02-2022' },
    { data: 'Comment 20 date 10-02-2022', sentiment: 'Negative', category: 'Product', date: '10-02-2022' },
    // and more...
  ];

  // Function to render comments based on the selected filter
  const renderComments = () => {
    let filteredComments = [...comments]; // create a copy such that original data is not altered

    // iltering logic for 'critical' yet to be confirmed, dummy variable to test
    if (filter === 'critical') {
      filteredComments = filteredComments.filter(comment => comment.sentiment === 'Negative');
    } 
    // Filtering logic for 'favourable' yet to be confirmed, dummy variable to test
    else if (filter === 'favourable') {
      filteredComments = filteredComments.filter(comment => comment.sentiment === 'Positive');
    } 

    else if (filter === 'recent') {
      filteredComments.sort((a, b) => {
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        return dateB - dateA; // Sort based on most recent dates
      });
    }

    return filteredComments.map((comment, index) => (
      <Grid key={index} style={{ marginBottom: '10px' }}>
        <Grid.Col span={6}>{comment.data}</Grid.Col>
        <Grid.Col span={3}>{comment.sentiment}</Grid.Col>
        <Grid.Col span={3}>{comment.category}</Grid.Col>
      </Grid>
    ));
  };

  return (
    <Container size="100%" style={{ display: "flex" }}>

      {/* First Grid - Left Side */}
      <div style={{ flex: "50%", marginLeft: "20px" }}>
        <Container style={{padding: "5px", size: "100%" }}>
          <Grid styles={{ margin: "2" }}>

             {/* Original comments section */}
            <Grid.Col span={{ base: 12, md: 12}} className='columns' style={{ height: "520px", overflowY: "auto" }}>
              <Container size="100%">
                <h2>Original Comments</h2>
                <Select
                  placeholder="Sort by: "
                  data={filterOptions}
                  value={filter}
                  onChange={setFilter}
                  clearable
                />
                <div style={{ marginTop: "20px" }}>
                  {renderComments()}
                </div>
              </Container>
            </Grid.Col>

            {/* Suggested solutions section */}
            <Grid.Col span={{ base: 12, md: 12}} className='columns' style={{ height: "200px" }}>
              <Container size="100%">
                <h2> Suggested Solution </h2>
                <p>Details of suggested solution based on analysis.</p>
              </Container>
            </Grid.Col>
          </Grid>
        </Container>
      </div>

      {/* Seconf Grid - Right Side */}
      <div style={{ flex: "50%", marginLeft: "20px" }}>
        <Container style={{padding: "5px", size: "100%" }}>
          <Grid styles={{ margin: "2" }}>

            {/* Comparison with other companies section */}
            <Grid.Col span={{ base: 12, md: 12}} className='columns' style={{ height: "350px" }}>
              <Container size="100%">
                <h2>Comparison with Other Banks</h2>
                <p>Analysis and comparison based on customer feedback and metrics.</p>
              </Container>
            </Grid.Col>

            {/* Word cloud section */}
            <Grid.Col span={{ base: 12, md: 12}} className='columns' style={{ height: "370px" }}>
              <Container size="100%">
                <h2> Word Cloud </h2>
                <p>Visualization of top~10 frequent words from feedback.</p>
                {/* Here should be the implementation*/}
              </Container>
            </Grid.Col>

          </Grid>
        </Container>
      </div>

    </Container>
  );
}

export default ProductReviews;