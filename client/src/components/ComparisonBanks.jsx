import React, { useState, useEffect } from 'react';
import { BarChart } from '@mantine/charts'; 

export default function ComparisonBanks() {
    
    // Excerpts from backend data, connect to database afterwards
    const testData=[
    {bank: "OCBC", positive: 1, neutral: 0, negative: 1 },
    {bank: "GXS", positive: 2, neutral: 0, negative: 4 },
    {bank: "UOB", positive: 1, neutral: 1, negative: 0 },
    ];

    return (
        <BarChart 
            h = {200}
            data={testData}
            dataKey="bank"
            type="percent"
            tooltipAnimationDuration={200}
            // legend display has issue, need amend later
            withLegend
            legendProps={{ verticalAlign: 'bottom' }}
            series={[
                { name: 'Positive', color: 'green' },
                { name: 'Neutral', color: 'gray' },
                { name: 'Negative', color: 'red' },
            ]}
        />
    );
}