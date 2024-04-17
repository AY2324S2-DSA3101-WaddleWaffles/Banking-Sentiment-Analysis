import React, { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import ComparisonBar from './components/ComparisonBar';
import TableBanksCount from "./components/TableCount";
import ComparisonLine from "./components/ComparisonLine";
import ChooseBank from "./components/ChooseBank";
import InsightsComparison from "./components/InsightsComparison";
import './Comparison.css';
import { set } from "date-fns";

export default function Comparison({ selectedDateRange, refreshFlag  }) {
  console.log("comparison page date:", selectedDateRange);
  const [availableBanks, setAvailableBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  const handleSelectBank = (value) => {
    setSelectedBank(value);
  };

  return (
    <Container size="100%" className = "grid-container-comparison">
          <div className="grid-item-comparison sentiment-banks">
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', }}>Comparative Analysis of Bank Sentiment Distribution </h2>
            <ComparisonBar selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>
          </div>


          <div className="grid-item-comparison count">
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>Number of Bank Reviews </h2>
            <TableBanksCount selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag } setAvailableBanks={setAvailableBanks} />
          </div>


        <div className="grid-item-comparison rating-banks">
          {/* line chart title refuses to shift to directly above chart*/} 
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '7px' , marginTop:'2px' }}>Bank Ratings Over Time (Out of 5) </h2> 
          <ComparisonLine selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag }/>
        </div>

        <div className = "grid-item-comparison insights-banks">
          {/*<h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px'  }}>Bank Ratings Over Time (Out of 10) </h2> */}
          <div><ChooseBank availableBanks={availableBanks} refreshFlag ={refreshFlag} onSelectBank={handleSelectBank} /></div>
          <div style={{ marginTop: '20px' }}>
            <InsightsComparison selectedBank={selectedBank}/>
          </div>
          
        </div>
        
    </Container>
  );
}
