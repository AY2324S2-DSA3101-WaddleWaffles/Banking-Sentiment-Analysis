"""
Scrapes data from the google plays store
If given a parameter, continuation token, should only scrape data from that review onwards
"""

import pandas as pd
import numpy as np
import json
from google_play_scraper import reviews, Sort, app

# Quota is 200,000 queries per day

class PlayStoreScraperFacillitator:
    """
    A class for scraping the google play store for reviews

    Attr:
        bank_names (list): List of all bank names
        apps (dictionary): Dictionary of bank names to apps
    """

    def __init__(self, bank_names, apps):
        """
        Initialise playstore Facillitator object
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
        for bank in self.bank_names:
            result, continuation_token = reviews(
                self.apps[bank],
                lang = 'en',
                country = 'us',
                sort = Sort.NEWEST,
                count = 5000,
                continuation_token = tokens[bank]
            )
            tokens[bank] = continuation_token

            for i in result:
                banks_in_review.append(bank)
                scraped_reviews.append(i)

        pd_reviews = pd.DataFrame(np.array(scraped_reviews), columns = ['review'])

        pd_reviews = pd_reviews.join(pd.DataFrame(pd_reviews.pop('review').tolist()))

        pd_reviews["bank"] = banks_in_review

        return pd_reviews, tokens

# def scrape_dbs(token = None):
#     """
#     Scrapes DBS bank app for reviews
#     Args:
#         continuation_token (token, optional) : Token allows scraper to skip past scraped data
#     """
#     DBS_result, dbs_continuation_token = reviews(
#         'com.dbs.sg.dbsmbanking',
#         lang = 'en',
#         country = 'us',
#         sort = Sort.NEWEST,
#         count = 5000,
#         continuation_token = token
#     )

#     pd_DBS_reviews = pd.DataFrame(np.array(DBS_result), columns = ['review'])

#     pd_DBS_reviews = pd_DBS_reviews.join(pd.DataFrame(pd_DBS_reviews.pop('review').tolist()))

#     pd_DBS_reviews["bank"] = "dbs"

#     return pd_DBS_reviews

# def scrape_ocbc(token = None):
#     """
#     Scrapes OCBC bank app for reviews
#     Args:
#         continuation_token (token, optional) : Token allows scraper to skip past scraped data
#     """
#     ocbc_result, ocbc_continuation_token = reviews(
#         'com.ocbc.mobile',
#         lang = 'en',
#         country = 'us',
#         sort = Sort.NEWEST,
#         count = 5000,
#         continuation_token = token
#     )

#     pd_ocbc_reviews = pd.DataFrame(np.array(ocbc_result), columns = ['review'])

#     pd_ocbc_reviews = pd_ocbc_reviews.join(pd.DataFrame(pd_ocbc_reviews.pop('review').tolist()))

#     pd_ocbc_reviews["bank"] = "ocbc"

#     return pd_ocbc_reviews
#     # pd_ocbc_reviews.to_csv('play_store_data/ocbc_playstore_reviews.csv') 

# def scrape_uob(token = None):
#     """
#     Scrapes UOB bank app for reviews
#     Args:
#         continuation_token (token, optional) : Token allows scraper to skip past scraped data
#     """
#     uob_result, uob_continuation_token = reviews(
#         'com.uob.mighty.app',
#         lang = 'en',
#         country = 'us',
#         sort = Sort.NEWEST,
#         count = 5000,
#         continuation_token = token
#     )

#     pd_uob_reviews = pd.DataFrame(np.array(uob_result), columns = ['review'])

#     pd_uob_reviews = pd_uob_reviews.join(pd.DataFrame(pd_uob_reviews.pop('review').tolist()))

#     pd_uob_reviews["bank"] = "uob"

#     return pd_uob_reviews

# def scrape_trust(token = None):
#     """
#     Scrapes trust bank app for reviews
#     Args:
#         continuation_token (token, optional) : Token allows scraper to skip past scraped data
#     """
#     trust_result, trust_continuation_token = reviews(
#         'sg.trust',
#         lang = 'en',
#         country = 'us',
#         sort = Sort.NEWEST,
#         count = 5000,
#         continuation_token = token
#     )

#     pd_trust_reviews = pd.DataFrame(np.array(trust_result), columns = ['review'])

#     pd_trust_reviews = pd_trust_reviews.join(pd.DataFrame(pd_trust_reviews.pop('review').tolist()))

#     pd_trust_reviews["bank"] = "trust"

#     return pd_trust_reviews

# def scrape_maribank(token = None):
#     """
#     Scrapes DBS bank app for reviews
#     Args:
#         continuation_token (token, optional) : Token allows scraper to skip past scraped data
#     """
#     maribank_result, maribank_continuation_token = reviews(
#         'sg.com.maribankmobile.digitalbank',
#         lang = 'en',
#         country = 'us',
#         sort = Sort.NEWEST,
#         count = 5000,
#         continuation_token = token
#     )

#     pd_maribank_reviews = pd.DataFrame(np.array(maribank_result), columns = ['review'])

#     pd_maribank_reviews = pd_maribank_reviews.join(pd.DataFrame(pd_maribank_reviews.pop('review').tolist()))

#     pd_maribank_reviews["bank"] = "maribank"

#     return pd_maribank_reviews

