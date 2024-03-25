import React from 'react';
import { Container} from '@mantine/core';
// const child = <Skeleton height={140} radius="md" animate={false} />;
import "./statistics.css";
import BarChartComponent from './BarChart';

function Statistics2() {


  return (
    <Container size="100%"  className="grid-container">
        <div className="grid-item number">
            Header
            </div>
        <div className="grid-item filter">Sidebar</div>
        <div className="grid-item timeseries">Main Content</div>
        <div className="grid-item bar1">Footer</div>
        <div className="grid-item bar2"><BarChartComponent/></div>
        <div className="grid-item stars">Footer</div>
    </Container> 
  );
}

export default Statistics2;