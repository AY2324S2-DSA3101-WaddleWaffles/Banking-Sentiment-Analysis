import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";

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
    <Container size="100%">
        {/* <div style = {{ marginLeft: '1000px', height: "250px" ,marginTop: "10px"}}>
            <RefreshDatabase />
        </div> */}

        {/* <div> 
            <DonutChartComponent />
        </div> */}

        {/* <div style = {{ marginLeft: '500px', height: "250px" ,marginTop: "-250px"}}> 
            <GetNumReviews /> reviews 
        </div>  */}

        <div> 
            <OverallGXSBySentiment selectedDateRange={selectedDateRange}/>
        </div> 



        {/* <div >
            <SentimentByTopic />
        </div> */}

        {/* <div style = {{ marginTop: '90px' , marginLeft: '-600px' }}>
            <TimeSeriesGXS />
        </div> */}
    </Container>
  );
}