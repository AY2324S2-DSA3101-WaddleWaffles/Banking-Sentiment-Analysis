import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";
import "./ProductReviews.css";
import ComparisonBanks from "../components/ComparisonBanks.jsx";
import WordCloud from "./WordCloud.jsx"
import OriginalComments from "../components/OriginalComments.jsx";

export default function ProductReviews() {

  return (
    <Container size="100%" className="grid-container-pd">
      
      <div className ="grid-item original"> <OriginalComments/> </div>
  
      
      <div className="grid-item suggestion">
        <h2> Suggested Solution </h2>
        <p>Details of suggested solution based on analysis.</p>
      </div>
      
      <div className="grid-item wordcloud"> 
        <WordCloud size="10px"/>
      </div> 
    </Container>
  );
}
