import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";

// IMPORT CHART COMPONENTS
// import DonutChartComponent from "./components/DonutChart";
// import TimeSeriesGXS from "./components/AvgRatingsGXS";
// import GetNumReviews from "./components/NumberOfReviews";
// import BarChartComponent from "./components/BarChart";
// import OverallGXSBySentiment from "./components/OverallGXS";
import RefreshDatabase from "./components/RefreshButton";
//import PickDateRange from "./components/DateFilter";

export default function Overview() {

  return (
    <Container size="100%">
      
    <div> 
         <RefreshDatabase />
    </div>
  
      
      <div> Hello</div>
    </Container>
  );
}