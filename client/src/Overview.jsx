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
