import { Container } from "@mantine/core";
import "./Overview.css";

// IMPORT CHART COMPONENTS
import TimeSeriesGXS from "./components/AvgRatingsGXS";
import GetNumReviews from "./components/NumberOfReviews";
import OverallGXSBySentiment from "./components/OverallGXS";
import DonutChartComponent from "./components/DonutChart";
import RefreshDatabase from "./components/RefreshButton";
import SentimentByTopic from "./components/BarChart";

export default function Overview({ selectedDateRange }) {
    console.log("overview page date:", selectedDateRange);
  return (
    <Container size="100%" height="100%" className="grid-container">

        <div className="grid-item donut" style={{ display: 'flex', justifyContent: 'center' }}> 
            <Container size="100%">
                <DonutChartComponent selectedDateRange={selectedDateRange} />
            </Container>
        </div>

        {/* <div className="grid-item number" style={{ display: 'flex', justifyContent: 'center' }}> 
            <GetNumReviews /> reviews 
        </div> 

        <div className="grid-item insights"> 
            Insights
        </div>

        <div className="grid-item topic" style={{ display: 'flex', justifyContent: 'center' }} >
            <SentimentByTopic />
        </div>*/}

        <div className="grid-item ratings" style={{ display: 'flex', justifyContent: 'center' }}>
            {/*<TimeSeriesGXS />*/}
            <OverallGXSBySentiment selectedDateRange={selectedDateRange} />
        </div> 
    </Container>
  );
}