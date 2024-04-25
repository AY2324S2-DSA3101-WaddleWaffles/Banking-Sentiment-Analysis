import { Container } from '@mantine/core';
import classes from './HeaderSimple.module.css';
import gxslogo from './assets/gxslogo_gradient.png';
import DateFilter from './components/DateFilter.jsx';
import Refresh from './components/RefreshButton.jsx';

export function HeaderSimple({ onDateRangeChange, onRefresh}) {
  return (
    <div className={classes.header}>
        {/* Logo and Heading */}
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "50px", fontFamily: 'Roboto'}}>
          <div>
              <img src={gxslogo} alt="GXS Bank logo" style={{width: "50px", height: "auto"}}/>
          </div>

          <div>
            <h2 className={classes.h2}>Sentiment Analysis</h2>
          </div>
        </Container>

        <div style={{marginRight: "100px"}}>
            Filter by Date:  <DateFilter onDateRangeChange={onDateRangeChange}  />
        </div>

        <div>
          <Refresh onRefresh ={onRefresh}/>
        </div>
    </div>
  );
}