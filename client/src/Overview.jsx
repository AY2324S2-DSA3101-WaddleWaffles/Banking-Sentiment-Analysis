import { Container, Badge } from "@mantine/core";
import "./Overview.css";

// IMPORT CHART COMPONENTS
import TimeSeriesGXS from "./components/AvgRatingsGXS";
import GetNumReviews from "./components/NumberOfReviews";
import DonutChartComponent from "./components/DonutChart";
import RefreshDatabase from "./components/RefreshButton";
import SentimentByTopic from "./components/BarChart";
import GetInsights from "./components/InsightsOverview";
import { IconStar } from '@tabler/icons-react';


export default function Overview({ selectedDateRange, refreshFlag}) {
    console.log("overview page date:", selectedDateRange);

    // declare star icon as a variable
    const starIcon = <IconStar size = {13} />;

  return (
    <Container size="100%" height="100%" className="grid-container-overview">
        <div className="grid-item number" style={{ display: 'flex', justifyContent: 'center' }}> 
            <GetNumReviews selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>&nbsp;reviews
        </div> 

        <div className="grid-item donut" style={{ display: 'flex', justifyContent: 'center'}}> 
            
            <Container >
                <DonutChartComponent selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag } />
            </Container>
            <Container size="100%">
                <h2 style = {{ fontSize: '24px', fontWeight: 'bold' , textAlign: 'left', marginBottom: '2px'}}>Average Rating</h2>
                <h3 style = {{ fontSize: '16px', textAlign: 'left' , marginTop: '2px'}}>(out of 5{starIcon})</h3>
                <p style = {{ fontSize: '13px', fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size="xs" circle color="green.6" ></Badge>
                    <span style={{ marginLeft: '5px' }}>Positive</span>
                </p>
                <p style = {{ fontSize: '13px', fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size="xs" circle color="yellow.6" ></Badge>
                    <span style={{ marginLeft: '5px' }}>Neutral</span>
                </p>
                <p style={{ fontSize: '13px', fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size="xs" circle color="red.6"></Badge>
                    <span style={{ marginLeft: '5px' }}>Negative</span>
                </p>    
            </Container>
        </div>


        <div className="grid-item insights" style={{display: 'flex', justifyContent: 'center'}}> 
            <GetInsights selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>
        </div>


        <div className="grid-item topic" style = {{ display: 'flex', justifyContent: 'center'}}>
            {/* <Container size = "100%" >
                <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '-10px'}}> Time-Series Analysis of Average Ratings  </h2>
                <TimeSeriesGXS selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>  

            </Container> */}
            <h2 style={{ fontSize: '15px', fontWeight: 'bold'}}> Time-Series Analysis of Average Ratings</h2>
            <h3 style = {{ fontSize: '11px', marginTop: '-9px'}}>(Aggregated weekly if filtered for 3 months or less, else monthly)</h3>
            <TimeSeriesGXS selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/>  
            
        </div>

        <div className="grid-item ratings" style={{ display: 'flex', justifyContent: 'center'}}>
        {/* <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '-10px'}}> Time-Series Analysis of Average Ratings  </h2> */}
            <SentimentByTopic selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/> 
        </div>

    </Container>
  );
}
