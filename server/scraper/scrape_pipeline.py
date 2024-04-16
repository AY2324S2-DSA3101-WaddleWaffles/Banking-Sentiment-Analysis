from scraper.appstore_scraper import AppScraper
from scraper.appstore_textpreprocess import preprocess_appstore_data
from scraper.playstore_scraper import PlayStoreScraper
from scraper.playstore_textpreprocess import preprocess_playstore_data

import datetime as dt
import pandas as pd

class ScrapePipeline:
    """
    Pipeline checks which data to scrape, scrapes data and saves relevant data.
    Attr:
        appstore_apps (dict): Dictionary of bank names to appstore apps
        appstore_app_ids (dict): Dictionary of bank names to playstore app ids
        bank_names (list): List of bank names
        app_last_scraped (datetime): datetime of last called scrape on app store
        playstore_apps (dict): Dictionary of bank names to playstore apps
        play_last_scraped (datetime): datetime of last called scrape on play store
    """

    def __init__(self, database):
        """
        Initialise DataPipeline object
        On initialise, extract relevant data from database

        Args:
            database (DataManager): Data manager for info retrieval.
        """
        
        self.playstore_apps = database.retrieve_miscellaneous("playstore", "apps")
        self.play_last_scraped = pd.to_datetime(database.retrieve_miscellaneous("playstore", "datetime")["latestdate"])
        self.appstore_app_ids = database.retrieve_miscellaneous("appstore", "app_ids")
        self.appstore_apps = database.retrieve_miscellaneous("appstore", "apps")
        self.app_last_scraped = pd.to_datetime(database.retrieve_miscellaneous("appstore", "datetime")["latestdate"])
    
    def scrape_new_reviews(self):
        """
        Get preprocessed reviews from playstore and appstore update to database
        
        Returns:
            pd.Dataframe of all new reviews
            datetime of scraping playstore
            datetime of scraping appstore
        """
        playstore_scraper = PlayStoreScraper(self.playstore_apps)
        playstore_reviews, playstore_scraped_datetime = playstore_scraper.scrape_banks(self.play_last_scraped)
        playstore_reviews = preprocess_playstore_data(playstore_reviews)
    

        appstore_scraper =  AppScraper(self.appstore_apps, self.appstore_app_ids)
        appstore_reviews, app_scraped_datetime = appstore_scraper.scrape_banks(self.app_last_scraped) 
        appstore_reviews = preprocess_appstore_data(appstore_reviews)
    

        all_reviews = pd.concat([playstore_reviews, appstore_reviews])
        
        if all_reviews.empty:
            return all_reviews, playstore_scraped_datetime, app_scraped_datetime

        datetime_col = pd.to_datetime(all_reviews["date"])

        all_reviews["year"] = datetime_col.dt.year
        all_reviews["month"] = datetime_col.dt.month
        all_reviews["day"] = datetime_col.dt.day
        all_reviews.drop(columns = ["date"], inplace = True)
        
        return all_reviews, playstore_scraped_datetime, app_scraped_datetime
 