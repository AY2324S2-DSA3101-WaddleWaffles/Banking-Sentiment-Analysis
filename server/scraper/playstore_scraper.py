"""
Scrapes data from the google plays store
If given a parameter, continuation token, should only scrape data from that review onwards
Quota is 200,000 queries per day
"""

import pandas as pd
import numpy as np
import json
from datetime import datetime
from google_play_scraper import reviews, Sort, app


class PlayStoreScraper:
    """
    A class for scraping the google play store for reviews

    Attr:
        apps (dictionary): Dictionary of bank names to apps
    """

    def __init__(self, apps):
        """
        Initialise playstore Scraper object

        Args:
            apps (dictionary): Dictionary of bank names to apps
        """

        self.apps = {}

    def scrape_banks(self, datetime_scrape = datetime.min):
        """
        Scrapes reviews for multiple banks' apps and adds the bank name to each review.

        Args:
            datetime (datetime, optional): Scrapes data from datetime onwards, if empty, scrapes all reviews.

        Returns:
            pd.DataFrame: A DataFrame containing the scraped dataset with columns for reviews and bank names.
            datetime: Current datetime
        """
        scraped_reviews = []
        banks_in_review = []
        for bank in self.apps.keys():
            result, continuation_token = reviews(
                self.apps[bank],
                lang = 'en',
                country = 'us',
                sort = Sort.NEWEST,
                count = 500,
                continuation_token = None
            )

            for i in result:
                banks_in_review.append(bank)
                scraped_reviews.append(i)

        pd_reviews = pd.DataFrame(np.array(scraped_reviews), columns = ['review'])

        pd_reviews = pd_reviews.join(pd.DataFrame(pd_reviews.pop('review').tolist()))

        pd_reviews["bank"] = banks_in_review
        
        pd_reviews["date"] = pd.to_datetime(pd_reviews["date"])

        pd_reviews = pd_reviews.loc(pd_reviews["date"] > datetime_scrape)

        return pd_reviews, datetime.now()
