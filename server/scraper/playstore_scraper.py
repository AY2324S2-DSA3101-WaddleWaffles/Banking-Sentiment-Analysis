"""
Scrapes data from the google plays store
If given a parameter, continuation token, should only scrape data from that review onwards
"""
import pandas as pd
import numpy as np
import json
from google_play_scraper import reviews, Sort, app

# Quota is 200,000 queries per day

class PlayStoreScraper:
    """
    A class for scraping the google play store for reviews

    Attr:
        bank_names (list): List of all bank names
        apps (dictionary): Dictionary of bank names to apps
    """

    def __init__(self, bank_names, apps):
        """
        Initialise playstore Scraper object
        Args:
            bank_names (list): List of all bank names
            apps (dictionary): Dictionary of bank names to apps
        """

        self.bank_names = ['gxs', 'dbs', 'ocbc', 'uob','trust','maribank']
        self.apps = {'gxs': 'sg.com.gxs.app','dbs': 'com.dbs.sg.dbsmbanking', 'ocbc': 'com.ocbc.mobile','uob': 'com.uob.mighty.app','trust': 'sg.trust','maribank': 'sg.com.maribankmobile.digitalbank'}

    def scrape_banks(self, tokens):
        """
        Scrapes reviews for multiple banks' apps and adds the bank name to each review.

        Args:
            continuation_token (dictionary): Dictionary of banks to tokens allowing the scraper to skip past scraped data.

        Returns:
            pd.DataFrame: A DataFrame containing the scraped dataset with columns for reviews and bank names.
            dict: A dictionary mapping bank names to continuation tokens.
        """
        scraped_reviews = []
        banks_in_review = []
        new_tokens = {}
        for bank in self.bank_names:
            result, continuation_token = reviews(
                self.apps[bank],
                lang = 'en',
                country = 'us',
                sort = Sort.NEWEST,
                count = 5000,
                continuation_token = tokens[bank]
            )
            new_tokens[bank] = continuation_token

            for i in result:
                banks_in_review.append(bank)
                scraped_reviews.append(i)

        pd_reviews = pd.DataFrame(np.array(scraped_reviews), columns = ['review'])

        pd_reviews = pd_reviews.join(pd.DataFrame(pd_reviews.pop('review').tolist()))

        pd_reviews["bank"] = banks_in_review

        return pd_reviews, new_tokens
