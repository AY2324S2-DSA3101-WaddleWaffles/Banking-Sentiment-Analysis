from appstore_scraper import AppScraper
from appstore_textpreprocess import preprocess_appstore_data
from database.database_pipeline import DataManager
from playstore_scraper import PlayStoreScraper
from playstore_textpreprocess import preprocess_playstore_data


import datetime as dt
import pandas as pd


class ScrapePipeline:
    """
    Pipeline checks which data to scrape, scrapes data and saves relevant data.
    Attr:
        appstore_apps (dict): Dictionary of bank names to appstore apps
        appstore_app_ids (dict): Dictionary of bank names to playstore app ids
        bank_names (list): List of bank names
        last_scraped (datetime): datetime of last called scrape
        playstore_apps (dict): Dictionary of bank names to playstore apps
        playstore_tokens (dict): Dictionary of banknames to tokens
    """

    def __init__(self, username, password):
        """
        Initialise DataPipeline object
        On initialise, extract relevant data from database

        Args:
            username (str): MongoDB username.
            password (str): MongoDB password.
        """

        database = DataManager(username, password)
        self.playstore_apps = database.retrieve_miscellaneous("playstore", "apps")
        self.playstore_tokens = database.retrieve_miscellaneous("playstore", "tokens")
        self.appstore_app_ids = database.retrieve_miscellaneous("appstore", "app_ids")
        self.appstore_apps = database.retrieve_miscellaneous("appstore", "apps")
        self.last_scraped = database.retrieve_miscellaneous("appstore", "datetime")
    
    def scrape_new_reviews(self):
        """
        Get preprocessed reviews from playstore and appstore update to database
        """
        playstore_scraper = PlayStoreScraper(self.bank_names, self.playstore_apps)
        playstore_reviews, new_tokens = playstore_scraper.scrape_banks(self.playstore_tokens)
        playstore_reviews_processed = preprocess_playstore_data(playstore_reviews)
        playstore_reviews_processed["source"] = "playstore"

        appstore_scraper =  AppScraper(self.bank_names,  self.appstore_apps, self.appstore_app_ids)
        appstore_reviews, scraped_datetime = appstore_scraper.scrape_banks(self.last_scraped) 
        appstore_reviews_processed = preprocess_appstore_data(appstore_reviews)
        appstore_reviews_processed["source"] = "appstore"

        all_reviews = pd.concat([playstore_reviews, appstore_reviews])

        datetime_col = pd.to_datetime(all_reviews["date"])

        all_reviews["year"] = datetime_col.dt.year
        all_reviews["month"] = datetime_col.dt.month
        all_reviews["day"] = datetime_col.dt.day
        all_reviews.drop(columns = ["date"], inplace = True)
        
        return all_reviews, new_tokens, scraped_datetime
 