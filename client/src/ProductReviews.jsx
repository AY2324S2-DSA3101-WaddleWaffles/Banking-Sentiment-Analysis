import React from 'react'
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
// const child = <Skeleton height={140} radius="md" animate={false} />;
import "./ProductReviews.css"

function ProductReviews() {
  return (
    <Container size="100%" style={{ display: "flex", }}>



      {/* First Grid - Right Side */}
      <div style={{ flex: "50%", marginLeft: "20px" }}>
      <Container style={{padding: "5px", size: "100%" }}>
        <Grid styles={{ margin: "2" }}>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "500px" }} className='columns'>
            <Container size="100%">
                <h2>orginal comment</h2>
                <p>three columns: comment content, sentiment category, topic</p>
            </Container>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "200px" }} className='columns'>
            <Container size="100%">
                <h2> suggested solution </h2>
                <p>if we have</p>
            </Container>
          </Grid.Col>

        </Grid>
      </Container>
      </div>

      
       {/* First Grid - Left Side */}
       <div style={{ flex: "50%", marginLeft: "20px" }}>
      <Container style={{padding: "5px", size: "100%" }}>
        <Grid styles={{ margin: "2" }}>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "350px" }} className='columns'>
            <Container size="100%">
                <h2>comparison with other banks</h2>
                <p>change according to # of banks filtered</p>
            </Container>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "350px" }} className='columns'>
            <Container size="100%">
                <h2> word cloud </h2>
                <p>top~10 frequent words</p>
            </Container>
          </Grid.Col>

        </Grid>
      </Container>
      </div>

    </Container>
  );
}

export default ProductReviews;