import React from 'react';
import { Container, Grid, SimpleGrid, Skeleton, rem } from '@mantine/core';
// const child = <Skeleton height={140} radius="md" animate={false} />;
import "./statistics.module.css";

import BarChartComponent from './BarChart';
import classes from "./statistics.module.css";
import LineData from './OverallGXS.jsx';
import TimeSeries from './TimeSeriesAcrossBanks.jsx';

export default function Statistics() {
  return (
    <Container size="100%" style={{ display: "flex", }}>

      <div style={{ flex: "50%", marginRight: "20px" }}>
      {/* First Grid - Left Side */}
      <Container style={{padding: "5px", width: "100%"}}>
        <Grid> 

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "100px" }} className={classes.columns}>
              <Container style={{ padding: "1px", width:"100%" }}>
                <h2 className={classes.heading2}>
                  Number of Reviews
                </h2>
                {/*<p>yes</p>*/}
              </Container>
          </Grid.Col>
      

          {/* Contain the 2 grid columns into 1 container to centralise */}
          <Container style={{ display: "flex", justifyContent: "center"}}>
            <Grid.Col span={{ base: 12, md: 12, xs: 12}} style={{ height: "300px" }} className={classes.columns}>
                <h2 style={{justifyContent: "flex-start"}}>Filter </h2>
                <p>yes</p>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 26, xs:12}} style={{ height: "300px" }} className={classes.fixedWidthCol}>
                <h2 className={classes.plotHeading}>
                  Percentage of Reviews by Sentiment
                </h2>
                <h3 className={classes.heading3}>
                  GXS Bank
                </h3>
                <LineData />
            </Grid.Col>
          </Container>

          <Grid.Col span={{ base: 12, md: 12}} style={{ height: "400px" }} className={classes.columns}>
            <Container>
                <h2>Sentiment by topic </h2>
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

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "400px" }} className={classes.columns}>
            <Container size="100%">
                <h2>Big graph i think </h2>
                <p>yes</p>
            </Container>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 12}} style={{ height: "310px" }} className={classes.columns}>
            <Container size="100%">
                <h2>Time-series graph comparing different banks </h2>
                <TimeSeries />
                <div className = {classes.xAxesLabels}>
                  Month
                </div>
                < div className = {classes.yAxesLabels}>
                  Average Rating
                </div>
            </Container>
          </Grid.Col>

        </Grid>
      </Container>
      </div>


    </Container>
  );
}

