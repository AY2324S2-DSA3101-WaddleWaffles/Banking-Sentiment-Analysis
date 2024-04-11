import { Container, Group, Burger, UnstyledButton, rem } from '@mantine/core';
import classes from './HeaderSimple.module.css';
import gxslogo from './assets/gxs-bank-logo.png';
import DateFilter from './components/DateFilter.jsx';
import Refresh from './components/RefreshButton.jsx';

export function HeaderSimple({ onDateRangeChange, onRefresh}) {
  return (
    <div className={classes.header}>
      {/* <Container size="100%" className={classes.inner}> */}
        

        {/* for the logo and heading */}
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "50px"}}>
          <div>
              <img src={gxslogo} alt="GXS Bank logo" style={{width: "50px", height: "auto"}}/>
          </div>

          <div>
            <h2 className={classes.h2}>Sentiment Analysis</h2>
          </div>
        </Container>

        {/* for the tabs */}
        <div style={{marginRight: "100px"}}>
            Filter by Date:  <DateFilter onDateRangeChange={onDateRangeChange}  />
        </div>

        <div>
          
          <Refresh onRefresh ={onRefresh}/>
        </div>

      {/* </Container> */}
    </div>


  );
}