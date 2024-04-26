<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <img src="https://gcdnb.pbrd.co/images/lrxYvjKU6Sev.png?o=1" alt="Logo" width="140">

  <h3 align="center">WaddleWaffles: GXS Sentiment Analysis</h3>

  <p align="center">
    A streamlined sentiment analysis project for GXS banking application
    <br />
    <i>Developed for DSA3101 Data Science in Practice @ NUS</i>
    <br />
    <a href="https://drive.google.com/file/d/1hGMBpKIKP1wSXKwrT1CE1gMuME0qlIZN/view?usp=sharing" target="_blank"><strong>Explore the technical document »</strong></a>
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1YK8oLCGTkMyjDOb5-7S4vYogRJZNr-A-/view" target="_blank">View Video</a>
    ·
    <a href="https://github.com/AY2324S2-DSA3101-WaddleWaffles/Banking-Sentiment-Analysis/wiki" target="_blank">Wiki</a>
    ·
    <a href="https://drive.google.com/file/d/1i5UWJOJTjjajt6A0oaUqOz8mKhsvj0dZ/view?usp=sharing" target="_blank">Business Requirements Document</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#techstack">Techstack</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#developers">Developers</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Screen Shot][product-page1]

In the domain of data analytics, analysts encounter considerable challenges, particularly in managing the continuous influx of digital data, including the daily arrival of new reviews for their products. The task of effectively processing and extracting insights from this abundance of information demands considerable expertise and effort. 

Our product, tailored for GXS, aims to revolutionise GXS' customer understanding, conduct competitive analysis, and drive data-driven improvements. We believe our product is relevant, convenient, and reliable. Here's why:

* **Near Real-time Analysis**: Our product saves you the trouble of uploading your own data, and retrieves latest GXS banking application reviews with a click of a button.
* **Streamlined Analysis Process**: Every analysis process is automated. Scraping of latest reviews, aligned with the execution of modelling process under a single pipeline, makes your life much more easier in conducting analysis.
* **Integration of Large Language Models**: We deploy text generation models to assist with the identification of trends and patterns.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Techstack

Below is the list of techstack used for the project:

Frontend:

[![React][React.js]][React-url]
[![Mantine][Mantine]][Mantine-url]

Backend:

[![Flask][Flask]][Flask-url]
<a href="https://huggingface.co">
  <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/powered-by-huggingface-dark.svg" alt="HuggingFace" width="100">
</a>

Database:

[![MongoDB][MongoDB]][MongoDB-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get the project running on your machine, follow these steps:

### Prerequisites

Ensure you have Docker installed on your machine. You can download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started). Afterwards, make sure your docker daemon is running.

Before proceeding, you will need to obtain the necessary API key for the database and the text generation model. Please <a href="#developers">contact the project developers</a> to request the API keys.

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/AY2324S2-DSA3101-WaddleWaffles/Banking-Sentiment-Analysis.git
   ```

2. Navigate to the project directory
   ```sh
   cd Banking-Sentiment-Analysis
   ```

3. With the `.env` file received, place it in the server directory
    ```sh
   mv /path/to/.env server/.env
   ```
    Replace `/path/to/.env` with the actual path to the `.env` file provided to you, or you can simply drag it into the `server` folder.

4. While in the root project directory, build and run the Docker containers
    ```sh
   docker-compose up
   ```

The project should now be running locally. You can access it in your web browser at http://localhost:5173.

> [!IMPORTANT]  
> The first time you run `docker-compose up`, it may take around 10 minutes to finish running as it needs to install server dependencies using `pip install`. Please be patient during this process.
> 
> If you see this in your terminal, do not proceed to http://localhost:5173 just yet. The server is still not ready:
>
> <img src="https://gcdnb.pbrd.co/images/3ykAitNkb2Uz.png?o=1" alt="Screenshot-semiready-docker" width="400">
>
> <br>
> Do wait until you see that both containers are running before accessing the project:
>
> <img src="https://gcdnb.pbrd.co/images/tBjCjxvfoCDm.png?o=1" alt="Screenshot-ready-docker" width="400">

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Our project dashboard features three main tabs aimed to tackle each of our primary objectives:

### Insights Overview
![Product Screen Shot][product-page1]

This tab summarises GXS bank application ratings, sentiments, and trends over time. It offers a breakdown of sentiment across various topics and provides detailed analysis of average ratings, both monthly and weekly, to identify trends. Additionally, text-based insights are generated to further understand user feedback.
<br>

### Inter-bank Comparison
![Product Screen Shot][product-page2]

This tab allows for a detailed analysis of GXS alongside its competitors. It enables users to compare aggregated ratings performance over time and offers insights into feature performance differences between GXS and selected competitor banks.
<br>

### Into The Specifics
![Product Screen Shot][product-page3]

This tab provides a detailed analysis of individual product reviews. It aggregates authentic reviews from multiple platforms, tags them with features, and identifies key words contributing to sentiments. It also offers potential solutions generated by LLM for negatively-rated features, aiming to address root causes effectively.

_For more details, please refer to the [technical document](https://drive.google.com/file/d/1hGMBpKIKP1wSXKwrT1CE1gMuME0qlIZN/view?usp=sharing)._
_You can also refer to the various `README.md` within the subdirectories of the repository._


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- DEVELOPERS -->
## Developers

This project is made possible with the efforts of everyone in the team: 

<div>
 <table>
  <tr>
    <th>Name</th>
    <th>GitHub</th>
    <th>Sub-Team</th>
  </tr>
  <tr>
    <td>Eileen Lee</td>
    <td>
      <a href="https://github.com/eileenleex" target="_blank">
        eileenleex
      </a>
    </td>
    <td>Frontend</td>
  </tr>
  <tr>
    <td>Huang Wenhui</td>
    <td>
      <a href="https://github.com/Eigen-V" target="_blank">
        Eigen-V
      </a>
    </td>
    <td>Frontend</td>
  </tr>
   <tr>
    <td>Nicole Chong</td>
    <td>
      <a href="https://github.com/nicolechongg" target="_blank">
        nicolechongg
      </a>
    </td>
    <td>Frontend</td>
  </tr>
  <tr>
    <td>Tee Yue Ning</td>
    <td>
      <a href="https://github.com/saladeehehe" target="_blank">
        saladeehehe
      </a>
    </td>
    <td>Frontend</td>
  </tr>
  <tr>
    <td>Jennifer Chue</td>
    <td>
      <a href="https://github.com/jenniferchue16" target="_blank">
        jenniferchue16
      </a>
    </td>
    <td>Backend</td>
  </tr>
  <tr>
    <td>Lee Zhan Peng</td>
    <td>
      <a href="https://github.com/leezhanpeng" target="_blank">
        leezhanpeng
      </a>
    </td>
    <td>Backend</td>
  </tr>
  <tr>
    <td>Lincoln Teo</td>
    <td>
      <a href="https://github.com/BreatheManually" target="_blank">
        BreatheManually
      </a>
    </td>
    <td>Backend</td>
  </td>
  <tr>
    <td>Yeo Hiong Wu</td>
    <td>
      <a href="https://github.com/darrylyxy" target="_blank">
        darrylyxy
      </a>
    </td>
    <td>Backend</td>
  </tr>
</table>

For any further concerns regarding the project, or request of API keys, please contact Zhan Peng @ leezp@u.nus.edu.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

We would like to thank Professor Hernandez Marin Sergio and our fellow TAs for their guidance and support throughout the development of this project.

We also appreciate the feedback given by  guest lecturers and fellow coursemates during the roadshow.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[product-page1]: https://gcdnb.pbrd.co/images/HmOrWh4GFUN3.png?o=1
[product-page2]: https://gcdnb.pbrd.co/images/DQCNcQeuj1qc.png?o=1
[product-page3]: https://gcdnb.pbrd.co/images/rTy9jYNT3MqC.png?o=1
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Flask]: https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Mantine]: https://img.shields.io/badge/Mantine-ffffff?style=for-the-badge&logo=Mantine&logoColor=339af0
[Mantine-url]: https://mantine.dev/
