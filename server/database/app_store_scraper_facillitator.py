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

class AppScraperFacillitator:
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
        self.bank_names = ['gxs', 'dbs', 'ocbc', 'uob','trust','maribank']
        self.apps = {'gxs': 'gxs-bank','dbs': 'dbs-digibank', 'ocbc': 'ocbc-digital-mobile-banking','uob': 'uob-tmrw','trust': 'trust-bank-sg','maribank': 'maribank'}
        self.app_ids = {'gxs': '1632183616', 'dbs': '1068403826', 'ocbc': '292506828', 'uob' : '1049286296', 'trust':'1598460384', 'maribank':'1658919834'}

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




# GXS = AppStore(country = 'sg', app_name = 'gxs-bank', app_id = '1632183616')

# GXS.review()

# pd_GXS_reviews = pd.DataFrame(np.array(GXS.reviews), columns = ['review'])

# pd_GXS_reviews = pd_GXS_reviews.join(pd.DataFrame(pd_GXS_reviews.pop('review').tolist()))

#print(pd_GXS_reviews)

# pd_GXS_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/GXS_app_reviews.csv') 

# GXS_review_rating = pd_GXS_reviews[['review', 'rating']]
# print(GXS_review_rating)

# DBS = AppStore(country = 'sg', app_name = 'dbs-digibank', app_id = '1068403826')

# DBS.review()

# pd_DBS_reviews = pd.DataFrame(np.array(DBS.reviews), columns = ['review'])

# pd_DBS_reviews = pd_DBS_reviews.join(pd.DataFrame(pd_DBS_reviews.pop('review').tolist()))

#print(pd_DBS_reviews)

# pd_DBS_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/DBS_app_reviews.csv') 

# OCBC = AppStore(country = 'sg', app_name = 'ocbc-digital-mobile-banking', app_id = '292506828')

# OCBC.review()

# pd_OCBC_reviews = pd.DataFrame(np.array(OCBC.reviews), columns = ['review'])

# pd_OCBC_reviews = pd_OCBC_reviews.join(pd.DataFrame(pd_OCBC_reviews.pop('review').tolist()))

# #print(pd_OCBC_reviews)

# pd_OCBC_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/OCBC_app_reviews.csv') 

# UOB = AppStore(country = 'sg', app_name = 'uob-tmrw', app_id = '1049286296')

# UOB.review()

# pd_UOB_reviews = pd.DataFrame(np.array(UOB.reviews), columns = ['review'])

# pd_UOB_reviews = pd_UOB_reviews.join(pd.DataFrame(pd_UOB_reviews.pop('review').tolist()))

# pd_UOB_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/UOB_app_reviews.csv') 

# Trust = AppStore(country = 'sg', app_name = 'trust-bank-sg', app_id = '1598460384')

# Trust.review()

# pd_Trust_reviews = pd.DataFrame(np.array(Trust.reviews), columns = ['review'])

# pd_Trust_reviews = pd_Trust_reviews.join(pd.DataFrame(pd_Trust_reviews.pop('review').tolist()))


# pd_Trust_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/Trust_app_reviews.csv') 

# Maribank = AppStore(country = 'sg', app_name = 'maribank', app_id = '1658919834')

# Maribank.review()

# pd_Maribank_reviews = pd.DataFrame(np.array(Maribank.reviews), columns = ['review'])

# pd_Maribank_reviews = pd_Maribank_reviews.join(pd.DataFrame(pd_Maribank_reviews.pop('review').tolist()))

# pd_Maribank_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/Maribank_app_reviews.csv') 