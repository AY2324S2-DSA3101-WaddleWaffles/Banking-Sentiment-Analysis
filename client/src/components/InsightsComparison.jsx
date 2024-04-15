import React from 'react';
import './InsightsComparison.css'; // Import CSS file

function InsightsComparison() {
  // Assume the API data is stored in a variable called apiData
  const apiData = {
    "comparison": "Based on the provided data, here's a comparison of features between GXS and DBS applications:\n\nFeatures that are better for GXS:\n\n1. Interface: GXS has a more consistent rating of 4.818 compared to DBS's 3.0.\n2. Service: GXS has a higher total rating of 4.833 compared to DBS's unrated performance.\n3. Transaction: GXS has a perfect rating of 5.0 for transactions compared to DBS's 5.0 in January 2024 only.\n\nFeatures that are worse for GXS:\n\n1. Update: Both banks have the same total rating of 4.0, but DBS has a higher rating for some periods.\n2. Features: GXS has a lower total rating of 2.0 compared to DBS's 3.5.\n3. Bug: Although both banks have the same total rating of 2.0, DBS has a higher rating for some periods.\n4. Performance: Both banks have the same total rating of 2.1, but DBS has a higher rating for some periods.\n\nPlease note that many ratings for both banks are null, which means there is no data available for those periods. Therefore, the comparison is limited to the available data."
  };

  // Split the comparison text into individual insights
  const insights = apiData.comparison.split('\n');

  // Map each insight to a paragraph element
  const insightElements = insights.map((insight, index) => {
    // Apply bold styling to specific lines
    if (insight.startsWith("Features that are better for GXS:") || insight.startsWith("Features that are worse for GXS:")) {
      return <p key={index} className="bold">{insight}</p>;
    } else {
      const updatedInsight = insight.replace(/(\d+\.\s\w+:)/g, '<strong>$1</strong>');
      return <p key={index} className="insight" dangerouslySetInnerHTML={{ __html: updatedInsight }} />;
    }
  });

  return (
    <div id="insights">
      {insightElements}
    </div>
  );
}

export default InsightsComparison;
