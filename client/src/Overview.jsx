import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";

// IMPORT CHART COMPONENTS
// import TimeSeriesGXS from "./components/AvgRatingsGXS";
import GetNumReviews from "./components/NumberOfReviews";
// import BarChartComponent from "./components/BarChart";
import OverallGXSBySentiment from "./components/OverallGXS";
//import RefreshDatabase from "./components/RefreshButton";
import DonutChartComponent from "./components/DonutChart";

//import PickDateRange from "./components/DateFilter";

export default function Overview({ selectedDateRange }) {

  return (
    <Container size="100%">
        <div> 
            <GetNumReviews /> reviews
        </div>
        <div> 
            <OverallGXSBySentiment selectedDateRange={selectedDateRange}/>
        </div>

        <div> 
            <DonutChartComponent />
        </div>
    </Container>
  );
}