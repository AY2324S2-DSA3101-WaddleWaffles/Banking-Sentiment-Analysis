import React from 'react';
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
// const child = <Skeleton height={140} radius="md" animate={false} />;
import "./statistics.css";

import BarChartComponent from './BarChart';

function Statistics() {


  return (
    <Container size="100%" style={{ display: "flex", }}>

      
      <div style={{ flex: "50%", marginRight: "20px" }}>
      {/* First Grid - Left Side */}
      <Container style={{padding: "5px", size: "100%"}}>
        <Grid> 

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "200px" }} className='columns'>
              <Container size="100%">
                <h2>Number of Reviews</h2>
                <p>yes</p>
              </Container>
          </Grid.Col>
      

          {/* Contain the 2 grid columsn into 1 to centralise */}
          <Container style={{ display: "flex", justifyContent: "center"}}>
            <Grid.Col span={{ base: 12, md: 24}} style={{ height: "200px" }} className='columns'>
                <h2>Side 1 </h2>
                <p>yes</p>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 24}} style={{ height: "200px" }} className='columns'>
                <h2>Side 2 </h2>
                <p>yes</p>
            </Grid.Col>
            </Container>

            <Grid.Col span={{ base: 12, md: 12}} style={{ height: "400px" }} className='columns'>
              <Container>
                  <h2>Bottom </h2>
                  {/* Replace this placeholder content with the BarChart component */}
                  <BarChartComponent/>
              </Container>
            </Grid.Col>

        </Grid>
      </Container> 
      </div>

      {/* Second Grid - Right Side */}
      <div style={{ flex: "50%", marginLeft: "20px" }}>
      <Container style={{padding: "5px", size: "100%" }}>
        <Grid styles={{ margin: "2" }}>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "400px" }} className='columns'>
            <Container size="100%">
                <h2>Big graph i think </h2>
                <p>yes</p>
            </Container>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "310px" }} className='columns'>
            <Container size="100%">
                <h2>Big graph i think 2 </h2>
                <p>yes</p>
            </Container>
          </Grid.Col>

        </Grid>
      </Container>
      </div>


    </Container>
  );
}

export default Statistics;