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

_For more details of every page and component, please refer to the [technical document](#)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- SOLUTION ARCHITECTURE -->
## Solution Architecture
![Solution Architecture][solution-architecture]

In our application's Appshell, we have three main components: the Header, Navigation Bar, and Main. The Main component contains three pages of the dashboard: Overview, Comparison, and Product Reviews. Each of these pages has its own set of components.

The Date Filter and Refresh Button components located in the Header are connected to each of the dashboard pages. They control state changes across the components, allowing for synchronized updates throughout the application upon interacting with this 2 components.


<!-- DIRECTORY STRUCTURE -->
## Directory Structure

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

