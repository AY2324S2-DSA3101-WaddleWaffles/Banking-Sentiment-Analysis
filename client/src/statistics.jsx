import React from 'react';
import { Container} from '@mantine/core';
import "./statistics.css";
import BarChartComponent from './components/BarChart';
import LineData from './components/OverallGXS.jsx';
import TimeSeries from './components/TimeSeriesAcrossBanks.jsx';
import ComparisonChart from './components/ComparisonChart.jsx';
import GetNumReviews from './components/NumberOfReviews.jsx';

function Statistics() {
  return (
    <Container size="100%"  className="grid-container">
        <div className="grid-item number"> 
          <h2 className = "heading-reviews"> 
            <GetNumReviews /> reviews 
          </h2>
        </div>
        
        <div className="grid-item filter">Filter</div>

        <div className="grid-item timeseries">
          <Container size="100%">
            <h2 className="plotHeading-percentage" style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}> Percentage of Reviews by Sentiment </h2>
            <h3 className="heading-percentage"> GXS Bank </h3>
            <LineData />
          </Container>
        </div>

        <div className="grid-item bar1">
          <Container size="100%">
              <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Comparative Analysis of Bank Sentiment Distribution </h2>
              <ComparisonChart/>
          </Container>
        </div>
        

        <div className="grid-item bar2">
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Sentiment by Topic</h2>
          <BarChartComponent/>
        </div>

        <div className="grid-item stars">
          <Container size="100%">
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Time-series graph comparing different banks </h2>
            <TimeSeries />
            <div className = "xAxesLabels"> Month </div>
            <div className = "yAxesLabels"> Average Rating </div>
          </Container>
        </div>

    </Container> 
  );
}

export default Statistics;