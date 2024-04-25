import { Container, Badge, Popover, Button, Text} from '@mantine/core';
import './Overview.css';
import { useDisclosure } from '@mantine/hooks';
import {IconInfoSquareRounded} from '@tabler/icons-react';
import { IconStar } from '@tabler/icons-react';
import TimeSeriesGXS from './components/AvgRatingsGXS';
import GetNumReviews from './components/NumberOfReviews';
import DonutChartComponent from './components/DonutChart';
import SentimentByTopic from './components/BarChart';
import GetInsights from './components/InsightsOverview';

export default function Overview({ selectedDateRange, refreshFlag}) {
    // Declare icon variables
    const starIcon = <IconStar size = {13} />;
    const [opened, { close, open }] = useDisclosure(false); 
    const icon = <IconInfoSquareRounded size={20} />;

    return (
    <Container size='100%' height='100%' className='grid-container-overview'>
        <div className='grid-item number' style={{ display: 'flex', justifyContent: 'center' }}> 
            <GetNumReviews selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>&nbsp;reviews
        </div> 

        <div className='grid-item donut' style={{ display: 'flex', justifyContent: 'center'}}> 
            <Container>
                <DonutChartComponent selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag } />
            </Container>

            <Container>
                <h3 style = {{ fontWeight: 'bold' , textAlign: 'left', marginBottom: '2px'}}>Average Rating</h3>
                <h4 style = {{ textAlign: 'left' , marginTop: '2px'}}>(out of 5{starIcon})</h4>
                <h5 style = {{  fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size='xs' circle color='green.6' ></Badge>
                    <span style={{ marginLeft: '5px' }}>Positive</span>
                </h5>
                <h5 style = {{fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size='xs' circle color='yellow.6' ></Badge>
                    <span style={{ marginLeft: '5px' }}>Neutral</span>
                </h5>
                <h5 style={{ fontWeight: 'bold', display: 'flex', textAlign: 'left'}}>
                    <Badge size='xs' circle color='red.6'></Badge>
                    <span style={{ marginLeft: '5px' }}>Negative</span>
                </h5>    
            </Container>
        </div>

        <div className='grid-item insights' style={{display: 'flex', justifyContent: 'center'}}> 
            <GetInsights selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>
        </div>

        <div className='grid-item topic' style = {{ display: 'flex', justifyContent: 'center'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <div style={{marginRight: '80px'}}>
                    <h2 style={{ fontSize: '15px', fontWeight: 'bold'}}> Time-Series Analysis of Average Ratings</h2>
                    <h3 style = {{ fontSize: '11px', marginTop: '-9px'}}>(Aggregated weekly if filtered for 3 months or less, else monthly)</h3>
                </div>
                {/* Info button */}
                <div >
                    <Popover width={200} position='bottom' withArrow shadow='md' opened={opened}>
                    <Popover.Target>
                        <Button onMouseEnter={open} onMouseLeave={close} style={{ color:"white", backgroundColor: 'transparent', border: 'none', padding: '1px'}}>
                        {icon}
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown style={{ pointerEvents: 'none', backgroundColor: '#444557', color:'white'}}>
                        <Text size='sm'>
                        <p> If date filtered is &le; 3 months, ratings are aggregated <b>weekly</b>. Each x-axis label is the Monday of each week.</p>
                        <p> Otherwise, ratings are aggregated <b>monthly</b>. </p>
                        </Text>
                    </Popover.Dropdown>
                    </Popover>
                </div>
            </div>
            <TimeSeriesGXS selectedDateRange={selectedDateRange} refreshFlag={refreshFlag}/> 
        </div>

        <div className='grid-item ratings' style={{ display: 'flex', justifyContent: 'center'}}>
            <SentimentByTopic selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/> 
        </div>
    </Container>
  );
}
