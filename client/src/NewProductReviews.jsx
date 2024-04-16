import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";
import "./NewProductReviews.css";

import OriginalComments from "./components/OriginalComments";
import TopWords from "./components/TopWords";
import Suggestions from "./components/Suggestions";

export default function NewProductReviews({ selectedDateRange, refreshFlag }) {
  console.log("reviews page date:", selectedDateRange);
  
  return (
    <Container size="100%" className="grid-container-pd">
      
      <div className ="grid-item-pr original"> 
          <OriginalComments selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag}/>
      </div>
  
      
      <div className="grid-item-pr topword">
        <TopWords selectedDateRange={selectedDateRange} refreshFlag ={refreshFlag}/>
      </div>
      
      <div className="grid-item-pr suggestion"> 
        <Suggestions/>
      </div> 
    </Container>
  );
}
