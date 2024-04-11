// const reviewsData = [
//   {
//     "bank": "GXS",
//     "sentiments": {
//       "19 February 2024 - 25 February 2024": {
//         "Negative": 0,
//         "Neutral": 1,
//         "Positive": 0
//       },
//       "26 February 2024 - 03 March 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "total": {
//         "Negative": 0,
//         "Neutral": 0.5,
//         "Positive": 0.5
//       }
//     }
//   },
//   {
//     "bank": "UOB",
//     "sentiments": {
//       "11 March 2024 - 17 March 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "12 February 2024 - 18 February 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "total": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       }
//     }
//   },
//   {
//     "bank": "DBS",
//     "sentiments": {
//       "04 March 2024 - 10 March 2024": {
//         "Negative": 1,
//         "Neutral": 0,
//         "Positive": 0
//       },
//       "05 February 2024 - 11 February 2024": {
//         "Negative": 1,
//         "Neutral": 0,
//         "Positive": 0
//       },
//       "15 January 2024 - 21 January 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "total": {
//         "Negative": 0.667,
//         "Neutral": 0,
//         "Positive": 0.333
//       }
//     }
//   },
//   {
//     "bank": "OCBC",
//     "sentiments": {
//       "04 March 2024 - 10 March 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "08 January 2024 - 14 January 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "19 February 2024 - 25 February 2024": {
//         "Negative": 1,
//         "Neutral": 0,
//         "Positive": 0
//       },
//       "total": {
//         "Negative": 0.333,
//         "Neutral": 0,
//         "Positive": 0.667
//       }
//     }
//   },
//   {
//     "bank": "Trust",
//     "sentiments": {
//       "05 February 2024 - 11 February 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "15 January 2024 - 21 January 2024": {
//         "Negative": 1,
//         "Neutral": 0,
//         "Positive": 0
//       },
//       "18 March 2024 - 24 March 2024": {
//         "Negative": 1,
//         "Neutral": 0,
//         "Positive": 0
//       },
//       "total": {
//         "Negative": 0.667,
//         "Neutral": 0,
//         "Positive": 0.333
//       }
//     }
//   },
//   {
//     "bank": "MariBank",
//     "sentiments": {
//       "22 January 2024 - 28 January 2024": {
//         "Negative": 0,
//         "Neutral": 1,
//         "Positive": 0
//       },
//       "25 March 2024 - 31 March 2024": {
//         "Negative": 0,
//         "Neutral": 1,
//         "Positive": 0
//       },
//       "29 January 2024 - 04 February 2024": {
//         "Negative": 0,
//         "Neutral": 0,
//         "Positive": 1
//       },
//       "total": {
//         "Negative": 0,
//         "Neutral": 0.667,
//         "Positive": 0.333
//       }
//     }
//   }
// ]

// const gxsData = reviewsData.filter(item => item.bank === "GXS");

// gxsData.forEach(item => {
//   delete item.sentiments.total;
// });
// console.log(gxsData);

const data = {
  "insights": "POSITIVE INSIGHTS\n\n* The overall rating for GXS Bank is consistently high, averaging around 4.32 out of 5.\n* The interface of the GXS application has received positive feedback, with an average rating of 4.82 out of 5.\n* The transaction aspect of the GXS application has a perfect score of 5.0.\n\nNEGATIVE INSIGHTS\n\n* There are no ratings for several categories such as update, performance, speed, reliability, bug, and customer support, making it difficult to assess these areas.\n* The ratings for the features of the GXS application are low, averaging around 2.0 out of 5.\n* There are periods of significantly lower ratings for the overall GXS application, specifically in December 2022, February 2023, July 2023, August 2023, September 2023, October 2023, and February 2024.\n\nTOPIC INSIGHTS\n\n* Overall: The overall rating for GXS Bank is generally high, but there are periods of significant decline. More consistent data is needed for other categories to provide a comprehensive analysis.\n* Features: The ratings for the features of the GXS application are low and need improvement.\n* Interface: The interface of the GXS application has been well-received, with high ratings.\n* Transaction: The transaction aspect of the GXS application is excellent, with a perfect score.\n* Service: The service category has high ratings, but there are periods of decline.\n* Other categories (update, performance, speed, reliability, bug, customer support): There is no data available for these categories, making it impossible to provide insights."
}
// console.log(data);

const processDataForInsights = (inputData) => {

  const groups = inputData.insights.split(/\n{2,}/);
  // console.log(groups);
  const allInsights = {};
  let currentKey = null;
  
  for (const item of groups){
    if (item.startsWith('POSITIVE') || item.startsWith('NEGATIVE') || item.startsWith('TOPIC')){
      currentKey = item.replace(' INSIGHTS', '').toLowerCase();
      allInsights[currentKey] = [];
    } else if (currentKey){
      allInsights[currentKey].push(item);
    }
  }

  // transform data to correct format for input
  const transformedData = Object.entries(allInsights).map(([group, insights]) => ({
    group,
    insights: insights.join('\n')
  }));
  return transformedData;

}; // END OF FUNCTION

const output = processDataForInsights(data);
console.log(output);