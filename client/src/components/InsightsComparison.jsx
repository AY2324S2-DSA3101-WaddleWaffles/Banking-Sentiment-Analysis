import React, { useEffect, useState } from 'react';
import { Paper, Loader } from '@mantine/core';
import ChooseBank from './ChooseBank';

function InsightsComparison({ selectedBank }) {
  console.log("Selected bank for comparison:", selectedBank);
  const [insightsData, setInsightsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedBank) {
      // No bank selected, set insights data to null
      setInsightsData(null);
      return;
    }

    const api = `http://127.0.0.1:5001/reviews/comparison?compared-bank=${selectedBank}`;
    console.log("insights url", api);
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api.toString());
        const jsonData = await response.json();
        setInsightsData(jsonData); // Update insightsData state
        console.log("retrieved insights data:", jsonData);
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedBank]);

  // Function to perform all replacements
  const performReplacements = (text) => {
    return text
      .replace(/([\w\s]+):/, '<strong>$1:</strong>') // Bold the point before colon
      .replace(/\b(higher|lower)\b/g, '<strong>$1</strong>') // Bold "higher" and "lower" words
      .replace(/\(([^)]+)\)/g, '<strong>($1)</strong>'); // Bold anything between parentheses
  };

  if (!selectedBank) {
    return <div>Please select a bank to view insights </div>;
  }

  if (isLoading) {
    return (
      <div>
        <Loader color="blue" />
        <p>Loading...</p>
      </div>

    )
  }

  if (!insightsData) {
    return <div>No data available</div>;
  }

  const sections = insightsData.comparison.split('\n\n');
  console.log("insights sections:", sections);
  const firstLine = sections.shift(); // Extract the first line
  const disclaimer = sections.pop(); // Extract the disclaimer
  console.log("insights sections after popping:", sections);
  const secondFeaturesIndex = 2;
  let secondHeading;
  let heading;

  const sectionStacks = sections.map((section, index) => {
    let rows = [];

    if (index === 0) {
      heading = section;
    }

    if (index < secondFeaturesIndex && index !== 0) {
      const points = section.split('\n').filter(point => point.trim() !== '');
      points.forEach((point, pointIndex) => {
        const pointParts = point.split(':');
        const title = pointParts[0].split('. ')[1];
        const content = pointParts[1].trim();
        const boldedContent = performReplacements(content);
        rows.push(
          <tr key={pointIndex}>
            <td style={{ border: '1px solid #CCCCCC', padding: '6px', fontSize: '14px' }}><strong>{title}</strong></td>
            <td style={{ border: '1px solid #CCCCCC', padding: '5px', fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: boldedContent }} />
          </tr>
        );
      });
      return (
        <Paper key={index} withBorder p="md" shadow="lg" radius='md' style={{ textAlign: 'left', marginBottom: '20px', background: 'none', backgroundColor: 'rgba(32, 37, 92, 0.2)'}}>
          <strong style={{ marginLeft: '15px' }}>{heading}</strong>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {rows}
            </tbody>
          </table>
        </Paper>
      );
    }

    if (index >= secondFeaturesIndex) {
      if (index === secondFeaturesIndex) {
        console.log("Second heading", section);
        secondHeading = section;
      } else {
        const points = section.split('\n').filter(point => point.trim() !== '');
        points.forEach((point, pointIndex) => {
          const pointParts = point.split(':');
          const title = pointParts[0].split('. ')[1];
          const content = pointParts[1].trim();
          const boldedContent = performReplacements(content);
          rows.push(
            <tr key={pointIndex}>
              <td style={{ border: '1px solid #CCCCCC', padding: '6px', fontSize: '14px' }}><strong>{title}</strong></td>
              <td style={{ border: '1px solid #CCCCCC', padding: '5px', fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: boldedContent }} />
            </tr>
          );
        });
        return (
          <Paper key={index} shadow="lg" withBorder p="md" radius='md' style={{ textAlign: 'left', marginBottom: '20px', background: 'none', backgroundColor:'rgba(32, 37, 92, 0.2)'}}>
            <strong style={{ marginLeft: '15px'}}>{secondHeading}</strong>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                {rows}
              </tbody>
            </table>
          </Paper>
        );
      }
    }

    return null; // Ensure a non-null return value
  });

  return (
    <div>
      <div>{firstLine}</div>
      {sectionStacks}
      <div>{disclaimer}</div>
    </div>
  );
}

export default InsightsComparison;
