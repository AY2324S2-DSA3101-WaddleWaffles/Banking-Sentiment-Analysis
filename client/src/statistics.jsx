import React from 'react';
import { Container} from '@mantine/core';
import "./statistics.css";
import BarChartComponent from './BarChart';
// import classes from "./statistics.module.css";
import LineData from './OverallGXS.jsx';
import TimeSeries from './TimeSeriesAcrossBanks.jsx';

function Statistics() {


  return (
    <Container size="100%"  className="grid-container">
        <div className="grid-item number"> Number of reviews </div>
        
        <div className="grid-item filter">Filter</div>

        <div className="grid-item timeseries">
          <Container size="100%">
            <h2 className="plotHeading"> Percentage of Reviews by Sentiment </h2>
            <h3 className="heading3"> GXS Bank </h3>
            <LineData />
          </Container>
        </div>

        <div className="grid-item bar1">Bar Chart 1</div>

        <div className="grid-item bar2">
          <h2>Sentiment by topic </h2>
          <BarChartComponent/>
        </div>

        <div className="grid-item stars">
          <Container size="100%">
            <h2>Time-series graph comparing different banks </h2>
            <TimeSeries />
            <div className = "xAxesLabels"> Month </div>
            <div className = "yAxesLabels"> Average Rating </div>
          </Container>
        </div>

    </Container> 
  );
}

export default Statistics;