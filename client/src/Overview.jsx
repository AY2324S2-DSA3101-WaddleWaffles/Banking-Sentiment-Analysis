import { Container, Badge, Popover, Button, Text} from "@mantine/core";
import "./Overview.css";
import { useDisclosure } from '@mantine/hooks';
import {IconInfoSquareRounded} from '@tabler/icons-react';

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
    const [opened, { close, open }] = useDisclosure(false); //for info popup
    const icon = <IconInfoSquareRounded size={20} />;

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <div style={{marginRight: '80px'}}>
                    <h2 style={{ fontSize: '15px', fontWeight: 'bold'}}> Time-Series Analysis of Average Ratings</h2>
                    <h3 style = {{ fontSize: '11px', marginTop: '-9px'}}>(Aggregated weekly if filtered for 3 months or less, else monthly)</h3>
                </div>

                {/* Info button */}
                <div >
                    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
                    <Popover.Target>
                        <Button onMouseEnter={open} onMouseLeave={close} style={{ color:"white", backgroundColor: 'transparent', border: 'none', padding: '1px'}}>
                        {icon}
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown style={{ pointerEvents: 'none', backgroundColor: '#444557', color:'white'}}>
                        <Text size="sm">
                        <p> If date filtered is &le; 3 months, ratings are aggregated <b>weekly</b>. The x-axis labels are the first day of each week.</p>
                        <p> Else, ratings are aggregated <b>monthly</b>. </p>
                        </Text>
                    </Popover.Dropdown>
                    </Popover>
                </div>
            </div>

            <TimeSeriesGXS selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/>  
            
        </div>

        <div className="grid-item ratings" style={{ display: 'flex', justifyContent: 'center'}}>
        {/* <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '-10px'}}> Time-Series Analysis of Average Ratings  </h2> */}
            <SentimentByTopic selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/> 
        </div>

    </Container>
  );
}
