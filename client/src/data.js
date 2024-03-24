export const apiData = [{"bank":"GXS","day":15,"id":1,"month":5,"rating":5,"review":"I am very satisfied with the service provided by GXS. The staff is friendly and helpful.","sentiment":"pos","source":"google-play-store","title":"Excellent Service","topic":"support","year":2023},
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

export default function calculateAvgRating(data){
    const averages ={};
    const counts ={};
            
    // calculate sums and counts for each bank and month
    data.forEach(({ bank, month, rating}) => {
        if (!averages[month]) averages[month] = {};
        if (!counts[month]) counts[month] = {};
                
        if (!averages[month][bank]) averages[month][bank] = 0;
        if (!counts[month][bank]) counts[month][bank] = 0;
            
        averages[month][bank] += rating;
        counts[month][bank]++;
    });
            
    // calculate averages
    const result = [];
    for (const month in averages) {
    const entry = { month: parseInt(month), ...averages[month] };
            
    for (const bank in averages[month]) {
        entry[bank] /= counts[month][bank];
    }
            
    result.push(entry);
    }
            
    return result;
}
            
// convert data to average ratings by bank and month
export const avgRatings = calculateAvgRating(apiData);
console.log(avgRatings)


export const testData =[
                {month: '2023', positive: 30, neutral: 40, negative: 30 },
                {month: '2023', positive: 25, neutral: 45, negative: 30 },
                {month: '2023', positive: 80, neutral: 10, negative: 10 },
                {month: '2023', positive: 65, neutral: 5, negative: 30 },
                {month: '2024', positive: 20, neutral: 50, negative: 25}
            ];