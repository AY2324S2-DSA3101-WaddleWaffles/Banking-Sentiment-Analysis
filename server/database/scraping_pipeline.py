"""
Pipeline checks which data to scrape, scrapes data and saves relevant data.
"""
from play_store_scraper_facillitator import PlayStoreScraperFacillitator
from server.database.play_store_textpreprocess import preprocess_playstore_data
from app_store_scraper_facillitator import AppScraperFacillitator
from app_store_textpreprocess import preprocess_appstore_data

class DataPipeline:

    def __init__(self):
        """
        Initialise DataPipeline object
        On initialise, extract relevant data from database

        Attr:
            bank_names (list): List of bank names
            playstore_apps (dict): Dictionary of bank names to playstore apps
            playstore_app_ids (dict): Dictionary of bank names to playstore app ids
            appstore_apps (dict): Dictionary of bank names to appstore apps
            last_scraped (datetime): datetime of last called scrape
        """
        bank_names = [] # Pull from database
        playstore_apps = {} # Pull from database
        playstore_app_ids = {} #Pull from database
        appstore_apps = {} # Pull from database
        tokens = {} # Pull from database
        last_scraped = None # Pull from datapase
    
    def update_reviews(self):
        """
        Get preprocessed reviews from playstore and appstore update to database
        """
        playstore_scraper = PlayStoreScraperFacillitator(self.bank_names, self.playstore_apps, self.playstore_app_ids)
        playstore_reviews, new_tokens = playstore_scraper.scrape_banks(self.tokens)
        playstore_reviews_processed = preprocess_playstore_data(playstore_reviews)
        self.update_database(playstore_reviews_processed, updated_tokens = new_tokens)

        appstore_scraper =  AppScraperFacillitator(self.bank_names, self.appstore_apps)
        appstore_reviews, scraped_datetime = appstore_scraper.scrape_banks(self.last_scraped) 
        appstore_reviews_processed = preprocess_appstore_data(appstore_reviews)
        self.update_database(appstore_reviews_processed, scraped_datetime = scraped_datetime)



    def update_database(data, scraped_datetime = None, updated_tokens = None):
        """
        Updates database with new reviews and continuation tokens

        Args:
            data (pd.Dataframe): Data to be pushed into the database, make sure data is preprocessed
            scraped_dateime (datetime, optional): Datetime data last used for scraping
            updated_tokens (token, optional): Updated token data
        """
        return None


    
    

    