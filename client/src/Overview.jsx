import { Container, Badge } from "@mantine/core";
import "./Overview.css";

// IMPORT CHART COMPONENTS
import TimeSeriesGXS from "./components/AvgRatingsGXS";
import GetNumReviews from "./components/NumberOfReviews";
import OverallGXSBySentiment from "./components/OverallGXS";
import DonutChartComponent from "./components/DonutChart";
import RefreshDatabase from "./components/RefreshButton";
import SentimentByTopic from "./components/BarChart";
import GetInsights from "./components/InsightsOverview";


export default function Overview({ selectedDateRange }) {
    console.log("overview page date:", selectedDateRange);
  return (
    <Container size="100%" height="100%" className="grid-container">
        <div className="grid-item number" style={{ display: 'flex', justifyContent: 'center' }}> 
            <GetNumReviews selectedDateRange={selectedDateRange}/>&nbsp;reviews
        </div> 

        <div className="grid-item donut" style={{ display: 'flex'}}> 
            
            <Container size="auto">
                <DonutChartComponent selectedDateRange={selectedDateRange} />
            </Container>
            <Container size="100%">
                <h2 style = {{ fontSize: '22px', fontWeight: 'bold' , textAlign: 'left', marginBottom: '2px'}}>Average Rating</h2>
                <h3 style = {{ fontSize: '15px', fontWeight: 'bold', textAlign: 'center', marginTop: '2px'}}>(Latest 3 months)</h3>
                <p style = {{ fontSize: '12px', fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size="xs" circle color="green.6" ></Badge>
                    <span style={{ marginLeft: '5px' }}>Positive</span>
                </p>
                <p style = {{ fontSize: '12px', fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size="xs" circle color="yellow.6" ></Badge>
                    <span style={{ marginLeft: '5px' }}>Neutral</span>
                </p>
                <p style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size="xs" circle color="red.6"></Badge>
                    <span style={{ marginLeft: '5px' }}>Negative</span>
                </p>    
            </Container>
        </div>



        <div className="grid-item topic">
            {/* <Container size = "100%" >
                <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '-10px'}}> Time-Series Analysis of Average Ratings  </h2>
                <TimeSeriesGXS selectedDateRange={selectedDateRange}/>  

            </Container> */}
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '-10px'}}> Time-Series Analysis of Average Ratings  </h2>
            <TimeSeriesGXS selectedDateRange={selectedDateRange}/>  
            
        </div>

        <div className="grid-item ratings"  style={{ display: 'flex'}} >
            <p style={{ fontSize: '15px', fontWeight: 'bold'}}> Sentiment By Topic  </p>
            <SentimentByTopic selectedDateRange={selectedDateRange}/> 
        </div>

        <div className="grid-item insights"> 
            <GetInsights />
        </div>

    </Container>
  );
}
