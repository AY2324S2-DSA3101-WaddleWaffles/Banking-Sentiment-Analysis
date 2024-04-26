<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <img src="https://gcdnb.pbrd.co/images/qwArMpfpYMA0.png?o=1" alt="Logo" width="160">

  <h3 align="center">WaddleWaffles: GXS Sentiment Analysis</h3>
  <p align="center">
    Server Component of the Project
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About</a></li>
    <li><a href="#solution-architecture">Solution Architecture</a></li>
    <li><a href="#techniques-utilised">Techniques Utilised</a></li>
    <li><a href="#directory-structure">Directory Structure</a></li>
    <li><a href="#unit-testing">Unit Testing</a></li>
  </ol>
</details>



<!-- ABOUT -->
## About

Welcome to the server directory. Here, you will find all the backend components for the project, including data processing tools, database management scripts, sentiment analysis models, and scraping utilities. It also includes files for Docker setup and Flask controller for interacting with the database and providing key functionalities.

_For more details of every component, please refer to the [technical document](#)._

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- SOLUTION ARCHITECTURE -->
## Solution Architecture
![Solution Architecture][solution-architecture]

Our Flask controller, `server.py`, orchestrates the overarching architecture by handling data retrieval requests and initialising all component processes.

- In typical review queries, data retrieved from MongoDB undergoes processing through our data processor before being forwarded to the frontend.
- In the case of newly scraped reviews, the data is processed within our scraper function before being forwarded to the relevant models for inference and analysis.

<!-- TECHNIQUES UTILISED -->
## Techniques Utilised

After conducting literature reviews, the following techniques and models are utilised:

- **Sentiment Analysis: BERTweet**

  The BERTweet model is a specialised variant of BERT trained specifically for sentiment analysis. It excels at understanding the nuances of language, including emojis, slang, and informal expressions, making it highly effective for analysing sentiment across various domains and languages.

- **Topic Modelling: BART-large-mnli**

  BART-large-mnli is a variant of the BART (Bidirectional and Auto-Regressive Transformers) model, fine-tuned for zero-shot topic modeling tasks. By leveraging the BART architecture and pre-training on a diverse range of data, it excels at generating coherent and contextually relevant topics across various domains without the need for topic-specific training data. 

- **Explainable AI: SHapley Additive exPlanations (SHAP)**

  SHAP is a method used in explainable AI to identify the key features influencing model predictions. By computing SHAP values, we can pinpoint the specific words or phrases that contribute most to sentiment classification, providing valuable insights into the decision-making process of the model.

- **Inquirer: Mixtral-8x7B-Instruct-v0.1**

  Mixtral is a powerful text generation model used to facilitate the identification of patterns, trends, and correlations within the data, enabling the generation of actionable insights and informed recommendations.


<!-- DIRECTORY STRUCTURE -->
## Directory Structure

Our directory structure tree is as follows:

```sh
server/
    ├── cache/
    │   └── cache_client.py
    ├── data_processor/
    │   └── data_processor.py
    ├── database/
    │   ├── database_pipeline.py
    │   ├── database_setup.py
    │   └── database_updater.py
    ├── explainer/
    │   └── explainer.py
    ├── inquirer/
    │   └── inquirer.py
    ├── models/
    │   ├── sentiment_analysis_model.py
    │   ├── text_generation_model.py
    │   └── topic_model.py
    ├── scraper/
    │   ├── appstore_scraper.py
    │   ├── appstore_textpreprocess.py
    │   ├── playstore_scraper.py
    │   ├── playstore_textpreprocess.py
    │   └── scrape_pipeline.py
    ├── .dockerignore
    ├── .gitignore
    ├── Dockerfile
    ├── requirements.txt
    ├── server.py
    ├── evaluations/
    │   └── [evaluation notebooks]
    ├── testing/
    │   └── [unit testing files]
    └── util/
        └── stdout_supress.py
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- UNIT TESTING -->
## Unit Testing

Follow the steps to run pytest:

1) Assuming you are in the project directory, navigate to the server directory
    ```sh
    cd server
    ```

2) Create a Python virtual environment
    ```sh
    python -m venv venv
    ```

2) Activate the virtual environment based on your OS

    Windows:
    ```sh
    venv/Scripts/activate
    ```

    MacOS/Linux:
    ```sh
    source venv/bin/activate
    ```

2) Install the required dependencies (pytest and pandas)
    ```sh
    pip install pytest pandas
    ```

2) Run pytest on files with the ‘test’ prefix as its filename.

    ```sh
    python -m pytest -k test -v
    ```

You should be able to see every test executed in your terminal with the ‘-v’ flag.


<!-- MARKDOWN LINKS & IMAGES -->
[solution-architecture]: https://gcdnb.pbrd.co/images/sAPX7qQfxJJi.png?o=1
