import React, { useState, useEffect } from "react";
import { Container, Grid, Select } from "@mantine/core";
import ComparisonBar from './components/ComparisonBar';
import TableBanksCount from "./components/TableCount";
import ComparisonLine from "./components/ComparisonLine";
import './Comparison.css';

export default function Comparison({ selectedDateRange }) {
  console.log("comparison page date:", selectedDateRange);

  return (
    <Container size="100%" style={{ overflowY: 'auto' }}>
      <Grid>
        <Grid.Col span={8}>
          <div className="bar-chart-container">
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Comparative Analysis of Bank Sentiment Distribution </h2>
            <ComparisonBar selectedDateRange={selectedDateRange}/>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="table-container">
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Count of Bank Sentiment </h2>
            <TableBanksCount />
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <div className="line-chart-container"> 
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Bank Ratings </h2>
          <ComparisonLine selectedDateRange={selectedDateRange}/>
        </div>
      </Grid>
        
    </Container>
  );
}
