from appstore_scraper import AppScraper
from appstore_textpreprocess import preprocess_appstore_data
from playstore_scraper import PlayStoreScraper
from playstore_textpreprocess import preprocess_playstore_data
import pandas as pd
import datetime as dt

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

    def __init__(self):
        """
        Initialise DataPipeline object
        On initialise, extract relevant data from database
        """
        self.bank_names = [] # Pull from database
        self.playstore_apps = {} # Pull from database
        self.appstore_app_ids = {} #Pull from database
        self.appstore_apps = {} # Pull from database
        self.playstore_tokens = {} # Pull from database
        self.last_scraped = None # Pull from datapase
    
    def update_reviews(self):
        """
        Get preprocessed reviews from playstore and appstore update to database
        """
        playstore_scraper = PlayStoreScraperFacillitator(self.bank_names, self.playstore_apps)
        playstore_reviews, new_tokens = playstore_scraper.scrape_banks(self.playstore_tokens)
        playstore_reviews_processed = preprocess_playstore_data(playstore_reviews)
        playstore_reviews_processed["source"] = "playstore"

        appstore_scraper =  AppScraperFacillitator(self.bank_names,  self.appstore_apps, self.appstore_app_ids)
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
 