<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <img src="https://gcdnb.pbrd.co/images/rjvqY70mE4yZ.png?o=1" alt="Logo" width="160">

  <h3 align="center">WaddleWaffles: GXS Sentiment Analysis</h3>
  <p align="center">
    Client Component of the Project
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About</a></li>
    <li><a href="#solution-architecture">Solution Architecture</a></li>
    <li><a href="#directory-structure">Directory Structure</a></li>
  </ol>
</details>



<!-- ABOUT -->
## About

Welcome to the client directory. Here, you will find all the frontend pages and components for our project. 

_For more details of every page and component, please refer to the [technical document](https://drive.google.com/file/d/1hGMBpKIKP1wSXKwrT1CE1gMuME0qlIZN/view?usp=sharing)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- SOLUTION ARCHITECTURE -->
## Solution Architecture
![Solution Architecture][solution-architecture]\
The frontend architecture embraces a component-based approach, each responsible for a specific piece of functionality or UI element.This design paradigm enables easier management, maintenance, and scalability of the application, fostering a more organised and efficient development process.



<!-- DIRECTORY STRUCTURE -->
## Directory Structure

The `client` directory contains various folders and files for frontend development. The folders and files in client are as follows: 

### src/
- **App.jsx**: The main component of the React application. In our application's Appshell, we have three main components: the Header, Navigation Bar, and Main. Main contains three pages of the dashboard: Overview, Comparison, and Product Reviews. Each of these pages has its own set of components.
- **Main.jsx**: Attaches Mantine’s theme and Appshell layout for App.jsx.
- **HeaderSimple.jsx**: Header of the application, containing the title, GXS logo, date filter, and refresh button.
- **NavbarTooltip.jsx**: Navigation Bar of the application, allowing the user to click on a button to direct them to another page.
- **Overview.jsx**: Overview page that provides a provides a holistic overview of the sentiment ratings attributed to GXS Bank only. This is also the default page when the user enters the dashboard.
- **Comparison.jsx**: Comparison page that provides a comparative analysis of GXS Bank against competitors, assessing key performance indicators.
- **NewProductReviews.jsx**: Product Reviews page to allow the user to look at an in-depth analysis of each GXS Bank’s reviews.

### src/assets/
Contains GXS logo.

### src/components/

#### Components of the Header:
- **DateFilter.jsx**: Date Filter component for users to adjust the date range using the Calendar pop-up in the date filter component. 
- **RefreshButton.jsx**: Refresh Button for user to retrieve the latest reviews from data sources and refresh the database. 
Both components control state changes across all the components, allowing for synchronized updates throughout the application upon interacting with this 2 components.

#### Components of Overview Page:
- **AvgRatingsGXS.jsx**
- **NumberOfReviews.jsx**
- **DonutChart.jsx**
- **BarChart.jsx**
- **InsightsOverview.jsx**
- **TopicFilter.jsx**

#### Components of Comparison Page:
- **ComparisonBar.jsx**
- **TableCount.jsx**
- **ComparisonLine.jsx**
- **ChooseBank.jsx**
- **InsightsComparison.jsx**
- **Legend.jsx**

#### Components of Product Reviews Page:
- **OriginalComments.jsx**
- **TopWords.jsx**
- **Suggestions.jsx**
- **TopicFilterPR.jsx**


Our directory structure tree is as follows:

```sh
client/
    ├── src/
    │   ├── assets/
    │   │   └── ... 
    │   ├── components/
    │   │   └── ... 
    │   ├── App.jsx
    │   ├── HeaderSimple.jsx
    │   ├── NavbarTooltip.jsx
    │   ├── Overview.jsx
    │   ├── Comparison.jsx
    │   ├── Comparison.jsx
    │   └── NewProductReviews.jsx
    ├── .gitignore
    ├── .eslintrc.cjs
    ├── Dockerfile
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[solution-architecture]: https://gcdnb.pbrd.co/images/w5cdR9nTUoAf.png?o=1

