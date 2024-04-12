import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";
import "./NewProductReviews.css";

import OriginalComments from "./components/OriginalComments";

export default function NewProductReviews({ selectedDateRange, refreshFlag }) {
  console.log("reviews page date:", selectedDateRange);
  
  return (
    <Container size="100%" className="grid-container-pd">
      
      <div className ="grid-item original"> 
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Original Reviews 
          <OriginalComments selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag}/>
        </h2>
      </div>
  
      
      <div className="grid-item topword">
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Top Words from Reviews
        </h2>
      </div>
      
      <div className="grid-item suggestion"> 
      <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
          Suggestions
        </h2>
      </div> 
    </Container>
  );
}
