import React, { useState } from "react";
import { Container, Grid, Select } from "@mantine/core";
import ReactWordcloud from "react-wordcloud"; // npm install react-wordcloud
import "./ProductReviews.css";

function ProductReviews() {
  const [filter, setFilter] = useState("");

  // Filter options
  const filterOptions = [
    { value: "critical", label: "Most critical" },
    { value: "favourable", label: "Most favourable" },
    { value: "recent", label: "Most recent" },
  ];

  // Testing data, need to connect to dataset afterwards
  const comments = [
    { data: "Comment 1 date 10-02-2022", sentiment: "Positive", category: "Service", date: "10-02-2022" },
    { data: "Comment 2 date 02-01-2022", sentiment: "Negative", category: "Product", date: "02-01-2022" },
    { data: "Comment 3 date 03-01-2022", sentiment: "Positive", category: "Service", date: "03-01-2022" },
    { data: "Comment 4 date 04-01-2022", sentiment: "Negative", category: "Product", date: "04-01-2022" },
    { data: "Comment 5 date 05-01-2022", sentiment: "Positive", category: "Service", date: "05-01-2022" },
    { data: "Comment 6 date 06-01-2022", sentiment: "Negative", category: "Product", date: "06-01-2022" },
    { data: "Comment 7 date 07-01-2022", sentiment: "Positive", category: "Service", date: "07-01-2022" },
    { data: "Comment 8 date 08-01-2022", sentiment: "Negative", category: "Product", date: "08-01-2022" },
    { data: "Comment 9 date 09-01-2022", sentiment: "Positive", category: "Service", date: "09-01-2022" },
    { data: "Comment 10 date 10-01-2022", sentiment: "Negative", category: "Product", date: "10-01-2022" },
    { data: "Comment 11 date 01-02-2022", sentiment: "Positive", category: "Service", date: "01-02-2022" },
    { data: "Comment 12 date 02-02-2022", sentiment: "Negative", category: "Product", date: "02-02-2022" },
    { data: "Comment 13 date 03-02-2022", sentiment: "Positive", category: "Service", date: "03-02-2022" },
    { data: "Comment 14 date 04-02-2022", sentiment: "Negative", category: "Product", date: "04-02-2022" },
    { data: "Comment 15 date 05-02-2022", sentiment: "Positive", category: "Service", date: "05-02-2022" },
    { data: "Comment 16 date 06-02-2022", sentiment: "Negative", category: "Product", date: "06-02-2022" },
    { data: "Comment 17 date 07-02-2022", sentiment: "Positive", category: "Service", date: "07-02-2022" },
    { data: "Comment 18 date 08-02-2022", sentiment: "Negative", category: "Product", date: "08-02-2022" },
    { data: "Comment 19 date 09-02-2022", sentiment: "Positive", category: "Service", date: "09-02-2022" },
    { data: "Comment 20 date 10-02-2022", sentiment: "Negative", category: "Product", date: "10-02-2022" },
    // and more...
  ];

  // Function to render comments based on the selected filter
  const renderComments = () => {
    let filteredComments = [...comments]; // create a copy such that original data is not altered

    // iltering logic for "critical" yet to be confirmed, dummy variable to test
    if (filter === "critical") {
      filteredComments = filteredComments.filter(comment => comment.sentiment === "Negative");
    } 
    // Filtering logic for "favourable" yet to be confirmed, dummy variable to test
    else if (filter === "favourable") {
      filteredComments = filteredComments.filter(comment => comment.sentiment === "Positive");
    } 

    else if (filter === "recent") {
      filteredComments.sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB - dateA; // Sort based on most recent dates
      });
    }

    return filteredComments.map((comment, index) => (
      <Grid key={index} style={{ marginBottom: "10px" }}>
        <Grid.Col span={6}>{comment.data}</Grid.Col>
        <Grid.Col span={3}>{comment.sentiment}</Grid.Col>
        <Grid.Col span={3}>{comment.category}</Grid.Col>
      </Grid>
    ));
  };


    // Prepare data for word cloud
    const wordCloudData = comments.reduce((accumulator, comment) => {
      const words = comment.data.split(/\s+/); // Split comment into words
      words.forEach(word => {
        const existingWord = accumulator.find(item => item.text === word);
        if (existingWord) {
          existingWord.value++; // Increment value if word already exists
        } else {
          accumulator.push({ text: word, value: 1 }); // Add new word with value 1
        }
      });
      return accumulator;
    }, []);
  
    // Options for word cloud
    const wordCloudOptions = {
      fontFamily: "Roboto, sans-serif",
      fontStyle: "normal",
      fontWeight: "normal",
      rotations: 2,
      rotationAngles: [0, 0],
      scale: "sqrt",
      spiral: "rectangular",
      transitionDuration: 1000,
    };


  return (
    <Container size="100%" style={{ display: "flex" }}>

{/* ======================================================================================================================= */}
{/* ======================================================================================================================= */}
{/* ======================================================================================================================= */}

      {/* First Grid - Left Side */}
      <div style={{ flex: "50%", marginLeft: "20px" }}>
        <Container style={{padding: "5px", size: "100%" }}>
          <Grid styles={{ margin: "2" }}>

             {/* Original comments section */}
            <Grid.Col span={{ base: 12, md: 12}} className="columns" style={{ height: "520px" }}>
              <Container size="100%">
                <h2 style={{ position: "sticky", top: "0", zIndex: "1000" }}>
                  Original Comments
                  </h2>
                <Select
                  placeholder="Sort by: "
                  data={filterOptions}
                  value={filter}
                  onChange={setFilter}
                  clearable
                  style={{ position: "sticky", top: "40px", zIndex: "1000" }}
                />
                <div style={{ height: "calc(520px - 150px)", overflowY: "auto" }}>
                  {renderComments()}
                </div>
              </Container>
            </Grid.Col>

{/* ======================================================================================================================= */}

            {/* Suggested solutions section */}
            <Grid.Col span={{ base: 12, md: 12}} className="columns" style={{ height: "200px" }}>
              <Container size="100%">
                <h2> Suggested Solution </h2>
                <p>Details of suggested solution based on analysis.</p>
              </Container>
            </Grid.Col>
          </Grid>
        </Container>
      </div>

{/* ======================================================================================================================= */}
{/* ======================================================================================================================= */}
{/* ======================================================================================================================= */}

      {/* Second Grid - Right Side */}
      <div style={{ flex: "50%", marginLeft: "20px" }}>
        <Container style={{padding: "5px", size: "100%" }}>
          <Grid styles={{ margin: "2" }}>

            {/* Comparison with other companies section */}
            <Grid.Col span={{ base: 12, md: 12}} className="columns" style={{ height: "400px" }}>
              <Container size="100%">
                <h2>Comparison with Other Banks</h2>
                <p>Analysis and comparison based on customer feedback and metrics.</p>
              </Container>
            </Grid.Col>

{/* ======================================================================================================================= */}
           
            {/* Word cloud section */}
            <Grid.Col span={{ base: 12, md: 12}} className="columns" style={{ height: "320px", width: "400px" }}>
              <Container size="100%">
              </Container>
              <ReactWordcloud words={wordCloudData} options={wordCloudOptions} />
            </Grid.Col>
          </Grid>
        </Container>
      </div>

{/* ======================================================================================================================= */}
{/* ======================================================================================================================= */}
{/* ======================================================================================================================= */}
    </Container>
  );
}

export default ProductReviews;