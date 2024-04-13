import React from 'react';

const data = {
  "suggestions": "PROBLEMS\n\n* The ratings for the performance, reliability, bug, update, and speed of the GXS application are all null, indicating a lack of data or poor performance in these areas.\n* The ratings for the features of the GXS application are low, with an average rating of 2.0.\n* The interface of the GXS application has inconsistent ratings, ranging from 3.0 to 5.0.\n* The customer support ratings for the GXS application are missing for all periods.\n\nSUGGESTIONS FOR PERFORMANCE\n\n* Implement monitoring tools to track the performance of the GXS application and identify any issues as they arise.\n* Regularly test the application under various loads and conditions to ensure it can handle real-world use cases.\n* Invest in optimizing the application's codebase and infrastructure to improve its overall performance.\n\nSUGGESTIONS FOR RELIABILITY\n\n* Implement robust error handling and logging mechanisms to quickly identify and resolve any issues that may arise.\n* Regularly perform load testing and stress testing to ensure the application can handle high traffic and heavy usage.\n* Use redundant and fault-tolerant systems to minimize downtime and ensure availability.\n\nSUGGESTIONS FOR BUG\n\n* Implement automated testing and continuous integration to catch bugs early in the development cycle.\n* Encourage developers to write unit tests and perform code reviews to catch potential bugs before they make it into production.\n* Establish a clear process for reporting and addressing bugs, including a dedicated bug tracking system and regular bug triage meetings.\n\nSUGGESTIONS FOR UPDATE\n\n* Implement a structured release management process to ensure updates are thoroughly tested and properly rolled out.\n* Provide detailed release notes and documentation to help users understand what changes have been made and how to use new features.\n* Offer beta programs and early access releases to gather feedback and identify potential issues before releasing updates to all users.\n\nSUGGESTIONS FOR FEATURES\n\n* Conduct user research and usability testing to identify which features are most important to users and prioritize their development.\n* Ensure that new features are well-documented and easy to discover and use.\n* Consider implementing feature flags or gradual rollouts to test new features with a subset of users before making them available to everyone.\n\nSUGGESTIONS FOR INTERFACE\n\n* Implement consistent design patterns and user interfaces across the entire application.\n* Conduct user research and usability testing to identify pain points and areas for improvement in the user interface.\n* Provide clear and concise instructions and tooltips to help users understand how to use the application.\n\nSUGGESTIONS FOR CUSTOMER SUPPORT\n\n* Implement a dedicated customer support platform to manage and respond to user inquiries and issues.\n* Provide detailed documentation and self-service resources to help users troubleshoot common issues.\n* Establish a clear escalation path for more complex issues and ensure that customer support representatives have the necessary training and resources to address them."
};

const removeAsterisks = (text) => {
  return text.replace(/\*/g, '');
};

const processSuggestions = (suggestionsText) => {
  const sections = suggestionsText.split(/\n\n(?=[A-Z\s]+(?:\n|$))/);

  const categorizedData = {};

  sections.forEach(section => {
    const lines = section.split('\n');
    const category = lines.shift();
    const content = lines.filter(line => line !== '').join('\n');
    categorizedData[category] = content;
  });

  return categorizedData;
};

const Suggestions = () => {
  const categorizedData = processSuggestions(data.suggestions);

  // Remove asterisks from each content
  Object.keys(categorizedData).forEach(category => {
    categorizedData[category] = removeAsterisks(categorizedData[category]);
  });

  return (
    <div>
      {/* Render each category with its content */}
      {Object.entries(categorizedData).map(([category, content]) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {/* Split content into list items */}
            {content.split('\n').map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
