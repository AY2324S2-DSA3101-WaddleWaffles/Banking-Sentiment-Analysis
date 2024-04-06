import React, { useState } from "react";
import { Container } from "@mantine/core";
import "./Overview.css";

// IMPORT CHART COMPONENTS
import TimeSeriesGXS from "./components/AvgRatingsGXS";
import GetNumReviews from "./components/NumberOfReviews";
import OverallGXSBySentiment from "./components/OverallGXS";
import DonutChartComponent from "./components/DonutChart";
import RefreshDatabase from "./components/RefreshButton";
import SentimentByTopic from "./components/BarChart";

//import PickDateRange from "./components/DateFilter";

export default function Overview({ selectedDateRange }) {

  return (
    <Container size="100%" className="grid-container">

        <div className="grid-item donut"> 
                <DonutChartComponent />
        </div>

        <div className="grid-item number" style={{ display: 'flex', justifyContent: 'center' }}> 
            <GetNumReviews /> reviews 
        </div> 

        <div className="grid-item sentiment"> 
            <OverallGXSBySentiment selectedDateRange={selectedDateRange}/>
        </div>

        <div className="grid-item topic" >
            <SentimentByTopic />
        </div>

        <div className="grid-item ratings" style={{ display: 'flex', justifyContent: 'center' }}>
            <TimeSeriesGXS />
        </div>
    </Container>
  );
}