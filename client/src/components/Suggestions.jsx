import React, { useState, useEffect } from 'react';
import { Accordion, ThemeIcon } from '@mantine/core';
import { IconBulb } from '@tabler/icons-react';

const Suggestions = ({ selectedDateRange, refreshFlag }) => {
  const [data, setData] = useState({ suggestions: {} });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Convert date range into the required DD-MM-YYYY formart
    const newStartDate = selectedDateRange.startDate;
    const newEndDate = selectedDateRange.endDate;
    const formattedStartDate = newStartDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');
    const formattedEndDate = newEndDate.toLocaleDateString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    }).replace(/\//g, '-');

    // API link for suggested solutions pertaining to GXS reviews with specified date range
    const api = `http://127.0.0.1:5001/reviews/suggestions?bank=GXS&start-date=${formattedStartDate}&end-date=${formattedEndDate}`;
    console.log("apiendpoint:",api)

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const apiData = await response.json();
        setData(apiData);
        console.log(data)
        
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

//   return (
//     <div>
//       <div style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '20px', marginBottom: '10px' }}>
//         <ThemeIcon variant="light" radius="xl" size="lg" color="violet" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
//           <IconBulb style={{ width: '70%', height: '70%' }} />
//         </ThemeIcon>
//         <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
//           Suggestions for Different Areas
//         </span>
//       </div>

//       <div>
//       <Accordion variant="contained" transitionDuration={500} style={{ textAlign: 'left' }}>
//         {Object.entries(data.suggestions).map(([category, content], idx) => (
//           <Accordion.Item key={idx} value={category}>
//             <Accordion.Control style={{ color: "white", backgroundColor: "#666fc9", borderRadius: "0px" }}>
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </Accordion.Control>
//             <Accordion.Panel style={{ backgroundColor: "#37384a" }}>
//               <p>{content}</p>
//             </Accordion.Panel>
//           </Accordion.Item>
//         ))}
//       </Accordion>

//       </div>
//     </div>
//   );
// };

// export default Suggestions;

// import React, { useState, useEffect } from 'react';
// import { Accordion, ThemeIcon } from '@mantine/core';
// import { IconBulb } from '@tabler/icons-react';

// const Suggestions = ({ selectedDateRange, refreshFlag }) => {
//   const [data, setData] = useState({ suggestions: {} });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Set data to the constant representing suggestions
//     setData({
//       suggestions: {
//         functions: "Regularly review and update feature sets, prioritize development based on user feedback, and ensure that all features are thoroughly tested before deployment.",
//         interface: "Simplify navigation, use consistent design elements, and ensure that all features are easily accessible on both desktop and mobile devices.",
//         login: "Add two-factor authentication, allow users to recover forgotten passwords via email or SMS, and ensure a consistent user experience across different devices.",
//         notifications: "Allow users to customize notification preferences, send reminders for important actions, and avoid sending duplicate or irrelevant notifications.",
//         security: "Implement stronger encryption algorithms, conduct regular security audits, and provide staff training on cybersecurity best practices.",
//         service: "Improve customer support response times, offer multiple channels of communication (e.g., phone, email, chat), and provide clear and concise instructions for common tasks.",
//         speed: "Optimize server response times, reduce image sizes, and consider implementing lazy loading for content that is not immediately visible to the user.",
//         stability: "Monitor server performance, implement load balancing and failover mechanisms, and address any software bugs promptly."
//       }
//     });

//     // Set loading to false
//     setIsLoading(false);
//   }, [selectedDateRange.startDate, selectedDateRange.endDate, refreshFlag]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <div style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '20px', marginBottom: '10px' }}>
        <ThemeIcon variant="light" radius="xl" size="lg" color="violet" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
          <IconBulb style={{ width: '70%', height: '70%' }} />
        </ThemeIcon>
        <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
          Suggestions for Different Areas
        </span>
      </div>

      <div className = "small-accordion">
        <Accordion variant="contained" transitionDuration={500} >
          {Object.entries(data.suggestions).map(([category, content], idx) => (
            <Accordion.Item key={idx} value={category}>
              <Accordion.Control style={{ color: "white", backgroundColor: "#666fc9", borderRadius: "0px" }}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Accordion.Control>
              <Accordion.Panel style={{ backgroundColor: "#37384a" }}>
                <p>{content}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Suggestions;
