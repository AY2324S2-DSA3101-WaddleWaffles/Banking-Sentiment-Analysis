import * as React from 'react';
import { LineChart } from '@mantine/charts';
import { testData } from './data';

// export const apiData = [{"bank":"GXS","day":15,"id":1,"month":5,"rating":5,"review":"I am very satisfied with the service provided by GXS. The staff is friendly and helpful.","sentiment":"pos","source":"google-play-store","title":"Excellent Service","topic":"support","year":2023},
//                 {"bank":"OCBC","day":20,"id":2,"month":6,"rating":4,"review":"OCBC has exceeded my expectations. Their online banking system is user-friendly and efficient.","sentiment":"pos","source":"app-store","title":"Great Experience","topic":"features","year":2023},
//                 {"bank":"GXS","day":10,"id":3,"month":7,"rating":1,"review":"I had a terrible experience at GXS. The staff was unhelpful and rude.","sentiment":"neg","source":"google-play-store","title":"Disappointing Service","topic":"support","year":2023},
//                 {"bank":"OCBC","day":5,"id":4,"month":8,"rating":2,"review":"The online banking system of OCBC is slow and often crashes. Not recommended.","sentiment":"neg","source":"app-store","title":"Poor Online System","topic":"features","year":2023},
//                 {"bank":"GXS","day":1,"id":5,"month":9,"rating":2,"review":"I tried to close my account with GXS, but the process was tedious and took weeks to complete.","sentiment":"neg","source":"google-play-store","title":"Account Closure Issue","topic":"billing","year":2023},
//                 {"bank":"UOB","day":15,"id":6,"month":10,"rating":3,"review":"I'm worried about the security of my account with UOB. There have been reports of unauthorized transactions.","sentiment":"neu","source":"app-store","title":"Security Concerns","topic":"security","year":2023},
//                 {"bank":"GXS","day":20,"id":7,"month":11,"rating":5,"review":"GXS's mobile app is fantastic! It's user-friendly and has all the features I need.","sentiment":"pos","source":"google-play-store","title":"Great Mobile App","topic":"features","year":2023},
//                 {"bank":"UOB","day":25,"id":8,"month":12,"rating":4,"review":"I had a billing issue with UOB, but their customer support team was quick to resolve it. Great service!","sentiment":"pos","source":"app-store","title":"Billing Issue Resolved","topic":"billing","year":2023},
//                 {"bank":"GXS","day":5,"id":9,"month":1,"rating":2,"review":"GXS needs to improve its online banking system. It's outdated and not user-friendly.","sentiment":"neg","source":"google-play-store","title":"Improvement Needed","topic":"features","year":2024},
//                 {"bank":"UOB","day":10,"id":10,"month":2,"rating":1,"review":"I contacted UOB's customer support multiple times, but they never responded. Very disappointed.","sentiment":"neg","source":"app-store","title":"Unresponsive Customer Support","topic":"support","year":2024}];

// need data with percentages for each sentiment, according to date/month



function LineData() {
    return (
        <LineChart
            h={300}
            data={testData}
            dataKey={'year'}
            series={[
                {name: 'positive', color: 'green'},
                {name: 'neutral', color: 'grey'},
                {name: 'negative', color: 'red'},
            ]} 
        />
    );
}

export default LineData();