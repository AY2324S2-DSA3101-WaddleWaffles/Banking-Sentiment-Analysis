import { Container, Group, Burger, UnstyledButton, rem } from '@mantine/core';
import classes from './HeaderSimple.module.css';
import gxslogo from './assets/gxs-bank-logo.png';
import DateFilter from './components/DateFilter.jsx';


function TabLink({ icon: Icon, label, active, onClick }) {
  return (
    <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
      <div className={classes.linkContent}>
        <div className={classes.icon}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </div>
        <div className={classes.label}>{label}</div>
      </div>
    </UnstyledButton>
  );
}

export function HeaderSimple({ onDateRangeChange  }) {


  return (
    <div className={classes.header}>
      <Container size="100%" className={classes.inner}>
        

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
        <div>
            Filter by Date:  <DateFilter onDateRangeChange={onDateRangeChange} />
        </div>

      </Container>
    </div>


  );
}