"""
Scrapes data from the apple store
If given a parameter, datetime, should only scrape data from that datetime onwards
"""

import pandas as pd
import numpy as np
import json
import datetime
from app_store_scraper import AppStore

## Request limit should be around 3500 requests per hour. If no datetime will not have enough requests to scrape.

class AppScraper:
    """
    A class for scraping the Apple store for reviews

    Attr:
        bank_names (list): List of all bank names
        apps (dictionary): Dictionary of bank names to apps
        app_ids (dictoinary): Dictionary of bank names to app_id
    """

    def __init__(self, bank_names, apps, app_ids):
        """
        Initialise the Facillitator object
        Args:
            bank_names (list): List of all bank names
            apps (dictionary): Dictionary of bank names to apps
            app_ids (dictoinary): Dictionary of bank names to app_id
        """
        self.bank_names = bank_names
        self.apps = apps
        self.app_ids = app_ids
        
    def scrape_banks(self, datetime_scrape = datetime.min):
        """
        Scrapes reviews for multiple banks' apps and adds the bank name to each review.

        Args:
            datetime (datetime, optional): Scrapes data from datetime onwards, if empty, scrapes all reviews.

        Returns:
            pd.Dataframe: of all bank reviews scraped
            datetime: Current datetime
        """

        scraped_reviews = []
        banks_in_review = []
        for bank in self.bank_names:
            result = AppStore(country = 'sg', app_name = self.apps[bank], app_id = self.app_ids[bank], after = datetime_scrape)
            
            for i in result:
                banks_in_review.append(bank)
                scraped_reviews.append(i)

        pd_reviews = pd.DataFrame(np.array(scraped_reviews), columns = ['review'])

        pd_reviews = pd_reviews.join(pd.DataFrame(pd_reviews.pop('review').tolist()))

        pd_reviews["bank"] = banks_in_review

        return pd_reviews, datetime.now()
