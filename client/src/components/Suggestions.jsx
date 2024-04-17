import React from 'react';
import { Accordion, ThemeIcon } from '@mantine/core';
import { IconZoomQuestion, IconBulb } from '@tabler/icons-react'; 

// will change into api call after everything is confirmed by backend •̀֊•́
const data = {"suggestions":"PROBLEMS\n\nFunctions: The total rating for the functions of the GXS application is 2.618, which is below average.\n\n* August 2022, September 2022, November 2022, February 2023, March 2023, April 2023, May 2023, June 2023, July 2023, August 2023, September 2023, April 2024: Ratings are 1.0 or below.\n\nStability: The total rating for the stability of the GXS application is 3.5, which is above average. However, there were periods of instability in August 2023 and February 2024.\n\nUpdate: The total rating for the update of the GXS application is 3.083, which is below average.\n\n* August 2023, February 2024: Ratings are 1.0 or below.\n\nSpeed: The total rating for the speed of the GXS application is 3.714, which is above average. However, there were periods of slow performance in September 2022, July 2023, August 2023, and July 2023.\n\nInterface: The total rating for the interface of the GXS application is 3.965, which is above average. However, there were periods of poor interface design in July 2023, August 2023, September 2023, October 2023, and November 2023.\n\nService: The total rating for the service of the GXS application is 2.595, which is below average.\n\n* April 2023, July 2023, August 2023, September 2023, October 2023, November 2023, December 2023, January 2024, February 2024: Ratings are 1.5 or below.\n\nSecurity: The total rating for the security of the GXS application is 2.033, which is below average.\n\n* January 2023, February 2024: Ratings are 1.0 or below.\n\nLogin: The total rating for the login of the GXS application is 1.429, which is below average.\n\n* April 2023, May 2023, June 2023, July 2023, August 2023, September 2023, October 2023, November 2023, December 2023, January 2024, February 2024, March 2024: Ratings are 1.333 or below.\n\nNotifications: The total rating for the notifications of the GXS application is 1.0, which is below average.\n\n* May 2023, June 2023, July 2023, August 2023, September 2023, October 2023, November 2023, December 2023, January 2024, February 2024, March 2024: Ratings are 1.0 or below.\n\nSUGGESTIONS FOR FUNCTIONS\n\n* Improve the functionality of the application during periods of low ratings.\n* Conduct regular maintenance and updates to ensure optimal performance.\n* Implement user feedback mechanisms to identify and address issues in a timely manner.\n\nSUGGESTIONS FOR STABILITY\n\n* Investigate and resolve the causes of instability during periods of low ratings.\n* Implement monitoring and alerting systems to detect and address issues before they affect users.\n* Regularly test the system for vulnerabilities and address any identified issues.\n\nSUGGESTIONS FOR UPDATE\n\n* Improve the frequency and quality of updates.\n* Implement user feedback mechanisms to identify and address issues in a timely manner.\n* Communicate updates and changes to users in a clear and concise manner.\n\nSUGGESTIONS FOR SPEED\n\n* Investigate and resolve the causes of slow performance during periods of low ratings.\n* Implement caching and optimization techniques to improve load times.\n* Regularly test the system for performance issues and address any identified issues."}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const processSuggestions = (suggestionsText) => {
  const sections = suggestionsText.split(/\n\n(?=[A-Z\s]+(?:\n|$))/);
  const categorizedData = {};

  sections.forEach(section => {
    const lines = section.split('\n');
    let category = lines.shift();
    const content = lines.filter(line => line !== '').join('\n');

    if (!category.startsWith('PROBLEMS')) {
      category = category.replace(/^SUGGESTIONS FOR\s+/, '');
      category = capitalizeFirstLetter(category.toLowerCase());
    }

    categorizedData[category] = content;
  });

  return categorizedData;
};

// Add a function to remove asterisks
const removeAsterisks = (text) => {
  return text.replace(/\*/g, '').trim(); // Removes all asterisks and trims whitespace from the start and end of the string
};

const Suggestions = () => {
  const categorizedData = processSuggestions(data.suggestions);

  // Apply removeAsterisks to the problemsContent directly
  const problemsContent = removeAsterisks(categorizedData["PROBLEMS"]);
  const suggestions = Object.entries(categorizedData).filter(([category]) => category !== "PROBLEMS");

  return (
    <div>
      <div>
        <div style={{ display: 'inline-block', verticalAlign: 'middle'}}>
          <ThemeIcon variant="light" radius="xl" size="lg" color="violet" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
            <IconZoomQuestion style={{ width: '70%', height: '70%' }} />
          </ThemeIcon>
          <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
            Current Problems
          </span>
        </div>
        <ul style={{ textAlign: 'left', fontSize: '14px' }}>
          {problemsContent.split('\n').map((item, index) => (
            item && <li key={index}>{removeAsterisks(item)}</li> // Remove asterisks from each problem
          ))}
        </ul>
      </div>

      <div style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '10px' }}>
        <ThemeIcon variant="light" radius="xl" size="lg" color="violet" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
          <IconBulb style={{ width: '70%', height: '70%' }} />
        </ThemeIcon>
        <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
          Suggestions for Different Areas 
        </span>
      </div>

      <Accordion variant="contained" transitionDuration={500} style={{ textAlign: 'left' }}>
        {suggestions.map(([category, content]) => (
          <Accordion.Item  key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
            <Accordion.Control style={{color: "white", backgroundColor:"#666fc9", borderRadius:"0px"}}>{category}</Accordion.Control>
            <Accordion.Panel style={{backgroundColor:"#37384a"}}>
              <ul>
                {content.split('\n').map((item, index) => (
                  <li key={index}>{removeAsterisks(item)}</li> // Remove asterisks from each suggestion item
                ))}
              </ul>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Suggestions;


// import React, { useState, useEffect } from 'react';
// import { Accordion, ThemeIcon } from '@mantine/core';
// import { IconZoomQuestion, IconBulb } from '@tabler/icons-react';

// const processSuggestions = (suggestionsText) => {
//   const sections = suggestionsText.split(/\n\n(?=[A-Z\s]+(?:\n|$))/);
//   const problems = {};
//   const suggestions = {};

//   sections.forEach((section) => {
//     const lines = section.split('\n');
//     let category = lines.shift().trim();
//     const contentLines = lines.filter(line => line.trim() !== '');
//     let subcategories = {};

//     contentLines.forEach(line => {
//       const [subCategoryName, ...subCategoryContent] = line.split(':');
//       let content = subCategoryContent.join(':').trim();
//       // Remove asterisks for both problems and suggestions uniformly
//       content = content.replace(/\*/g, ''); 
//       subcategories[subCategoryName.trim()] = content;
//     });

//     if (category.startsWith('PROBLEMS')) {
//       problems[category] = subcategories;
//     } else {
//       category = category.replace('SUGGESTIONS FOR ', '').trim();
//       suggestions[category.toLowerCase()] = subcategories;
//     }
//   });

//   return { problems, suggestions };
// };

// const Suggestions = () => {
//   const [data, setData] = useState({ problems: {}, suggestions: {} });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch('http://127.0.0.1:5001/reviews/suggestions');
//         if (!response.ok) {
//           throw new Error(`Network response was not ok (${response.status})`);
//         }
//         const apiData = await response.json();
//         const processedData = processSuggestions(apiData.suggestions);
//         setData(processedData);
//       } catch (error) {
//         console.error('Fetch Error:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div>
//         <div style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: '10px' }}>
//           <ThemeIcon variant="light" radius="xl" size="lg" color="violet" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
//             <IconZoomQuestion style={{ width: '70%', height: '70%' }} />
//           </ThemeIcon>
//           <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
//             Current Problems
//           </span>
//         </div>
//       </div>

//       <div>
//         <Accordion variant="contained" transitionDuration={500} style={{ textAlign: 'left' }}>
//           {Object.entries(data.problems.PROBLEMS || {}).map(([subCategory, content], index) => (
//             <Accordion.Item key={index} value={subCategory}>
//               <Accordion.Control style={{color: "white", backgroundColor:"#666fc9", borderRadius:"0px"}}>
//                 {subCategory}
//               </Accordion.Control>
//               <Accordion.Panel style={{backgroundColor:"#37384a"}}>
//                 <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
//               </Accordion.Panel>
//             </Accordion.Item>
//           ))}
//         </Accordion>
//       </div>

//       <div style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '20px', marginBottom: '10px' }}>
//         <ThemeIcon variant="light" radius="xl" size="lg" color="violet" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
//           <IconBulb style={{ width: '70%', height: '70%' }} />
//         </ThemeIcon>
//         <span style={{ fontSize: '18px', fontWeight: 'bold', verticalAlign: 'middle' }}>
//           Suggestions for Different Areas
//         </span>
//       </div>

//       <div>
//         <Accordion variant="contained" transitionDuration={500} style={{ textAlign: 'left' }}>
//           {Object.entries(data.suggestions).map(([category, subCategories], idx) => (
//             <Accordion.Item key={idx} value={category}>
//               <Accordion.Control style={{color: "white", backgroundColor:"#666fc9", borderRadius:"0px"}}>
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </Accordion.Control>
//               <Accordion.Panel style={{backgroundColor:"#37384a"}}>
//                 {Object.entries(subCategories).map(([subCategory, content], index) => (
//                   <p key={index}><b>{subCategory}:</b> {content.split('\n').map((item, itemIndex) => <span key={itemIndex}>{item}<br/></span>)}</p>
//                 ))}
//               </Accordion.Panel>
//             </Accordion.Item>
//           ))}
//         </Accordion>
//       </div>
//     </div>
//   );
// };

// export default Suggestions;


