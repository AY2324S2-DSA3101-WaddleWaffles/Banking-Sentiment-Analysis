// {/*Crosshair Documentation: inspect or target any data point on mouse move*/}
// {/*A thin horizontal line and a vertical line indicate the data point with the information displaued in an interactive tooltip*/}

import React from 'react';
import { LineChart } from '@mantine/charts';
import { avgRatings } from './data';

export default function TimeSeries() {
    return (
        <LineChart
            h={200}
            data={avgRatings}
            dataKey="month"
            withLegend
            legendProps={{ position: 'bottom', style: { display: 'flex', flexDirection: 'row' } }}
            tooltipAnimationDuration={200}
            series={[
                {name: 'GXS', color: 'purple'},
                {name: 'OCBC', color: 'red'},
                {name: 'UOB', color: 'blue'}
            ]}
        />
    );
    
}
