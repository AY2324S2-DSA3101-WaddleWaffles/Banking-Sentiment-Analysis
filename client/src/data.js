const apiData = [{"bank":"GXS","day":15,"id":1,"month":5,"rating":5,"review":"I am very satisfied with the service provided by GXS. The staff is friendly and helpful.","sentiment":"pos","source":"google-play-store","title":"Excellent Service","topic":"support","year":2023},
                {"bank":"OCBC","day":20,"id":2,"month":6,"rating":4,"review":"OCBC has exceeded my expectations. Their online banking system is user-friendly and efficient.","sentiment":"pos","source":"app-store","title":"Great Experience","topic":"features","year":2023},
                {"bank":"GXS","day":10,"id":3,"month":7,"rating":1,"review":"I had a terrible experience at GXS. The staff was unhelpful and rude.","sentiment":"neg","source":"google-play-store","title":"Disappointing Service","topic":"support","year":2023},
                {"bank":"OCBC","day":5,"id":4,"month":8,"rating":2,"review":"The online banking system of OCBC is slow and often crashes. Not recommended.","sentiment":"neg","source":"app-store","title":"Poor Online System","topic":"features","year":2023},
                {"bank":"GXS","day":1,"id":5,"month":9,"rating":2,"review":"I tried to close my account with GXS, but the process was tedious and took weeks to complete.","sentiment":"neg","source":"google-play-store","title":"Account Closure Issue","topic":"billing","year":2023},
                {"bank":"UOB","day":15,"id":6,"month":10,"rating":3,"review":"I'm worried about the security of my account with UOB. There have been reports of unauthorized transactions.","sentiment":"neu","source":"app-store","title":"Security Concerns","topic":"security","year":2023},
                {"bank":"GXS","day":20,"id":7,"month":11,"rating":5,"review":"GXS's mobile app is fantastic! It's user-friendly and has all the features I need.","sentiment":"pos","source":"google-play-store","title":"Great Mobile App","topic":"features","year":2023},
                {"bank":"UOB","day":25,"id":8,"month":12,"rating":4,"review":"I had a billing issue with UOB, but their customer support team was quick to resolve it. Great service!","sentiment":"pos","source":"app-store","title":"Billing Issue Resolved","topic":"billing","year":2023},
                {"bank":"GXS","day":5,"id":9,"month":1,"rating":2,"review":"GXS needs to improve its online banking system. It's outdated and not user-friendly.","sentiment":"neg","source":"google-play-store","title":"Improvement Needed","topic":"features","year":2024},
                {"bank":"UOB","day":10,"id":10,"month":2,"rating":1,"review":"I contacted UOB's customer support multiple times, but they never responded. Very disappointed.","sentiment":"neg","source":"app-store","title":"Unresponsive Customer Support","topic":"support","year":2024}
            ];

// function calcSentimentPercentage(data){
//     // filter data for GXS bank
//     const gxsData = data.filter(entry => entry.bank === 'GXS');

//     // group data by moth and sentiment
//     const groupedData ={};
//     gxsData.forEach(({month, sentiment}) => {
//         if (!groupedData[month]) groupedData[month] = { pos: 0, neu: 0, neg: 0 };
//         groupedData[month][sentiment] ++;
//     });

//     // calculate average percentage for each month
//     const result =[];
//     for (const month in groupedData){
//         const total = Object.values(groupedData[month]).reduce((acc,val) => acc+val,0);
//         const percentages ={}
//         for (const sentiment in groupedData[month]) {
//             const sentimentKey = sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
//             percentages[sentimentKey] = ((groupedData[month][sentiment]/total) * 100).toFixed(0) + '%';
//         }
//         result.push({month: parseInt(month), ...percentages});
//     }
//     return result;
// };

// const data = calcSentimentPercentage(apiData);
// const mappedData = data.map(item => ({
//     month: item.month,
//     Positive: item.Pos,
//     Neutral: item.Neu,
//     Negative: item.Neg
// }));
// console.log(mappedData) // correct output

function avgRatingsByBank(data){

    // group data by month and bank
    const groupedData = {};
    data.forEach(({ month, bank, rating }) => {
        if (!groupedData[month]) groupedData[month] = {};
        if (!groupedData[month][bank]) groupedData[month][bank] = [];

        groupedData[month][bank].push(rating);
    });
   //console.log(groupedData); //integer

    // calculate avg rating for each bank within each month
    const result = [];
    for (const month in groupedData){
        const entry = { month: parseInt(month) };

        const allBanks = ['GXS', 'OCBC', 'UOB'];
        allBanks.forEach(bank => {
            if (!groupedData[month][bank]) {
                entry[bank] = 0;
            } else {
                const avgRating = groupedData[month][bank].reduce((acc, val) => acc + val, 0) / groupedData[month][bank].length;
                entry[bank] = avgRating.toFixed(1); // round avg rating to 1dp
                entry[bank] = parseFloat(entry[bank]);
            }
        });
        result.push(entry);
    }
    return result;
}


const data = avgRatingsByBank(apiData)

// toFixed: converts number to string
// parseFloat: converts string to float
data.forEach(obj => {
    for (const key in obj) {
      if (key !== 'month' && Number.isInteger(obj[key])) {
        obj[key] = obj[key].toFixed(1);
        obj[key] = parseFloat(obj[key]); // strips the '.0' in 9.0
      }

    }
  });

// console.log(data);

function parseToInteger(input) {
    const floatVal = parseFloat(input);
    const integerVal = parseInt(floatVal);
  
    if (floatVal === integerVal) {
      return integerVal;
    } else {
      return floatVal;
    }
  }
  
  // Test cases
  console.log(parseToInteger('2.2')); // Output: 2.2
  console.log(parseToInteger('2.0')); // Output: 2.0
  console.log(parseToInteger('2.5')); // Output: 2.5
  console.log(parseToInteger('3'));   // Output: 3