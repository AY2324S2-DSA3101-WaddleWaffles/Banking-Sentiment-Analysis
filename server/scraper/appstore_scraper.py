"""
Scrapes data from the apple store
If given a parameter, datetime, should only scrape data from that datetime onwards
Request limit should be around 3500 requests per hour. If no datetime will not have enough requests to scrape.
"""

import pandas as pd
import numpy as np
import json
import requests
import time
from datetime import datetime
#from util.stdout_supress import suppress_stdout

class AppScraper:
    """
    A class for scraping the Apple store for reviews

    Attr:
        apps (dictionary): Dictionary of bank names to apps
        app_ids (dictoinary): Dictionary of bank names to app_id
    """

    def __init__(self, apps, app_ids):
        """
        Initialise the Scraper object
        Args:
            apps (dictionary): Dictionary of bank names to apps
            app_ids (dictoinary): Dictionary of bank names to app_id
        """
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
        #suppress_stdout(enable=True)
        scraped_reviews = []
        for bank in self.apps.keys():
            i = 1
            df = pd.DataFrame()
            while(i < 11):
                url = f"https://itunes.apple.com/sg/rss/customerreviews/page={i}/id={self.app_ids[bank]}/sortby=mostrecent/json"
                page = requests.get(url)
                i += 1
                if ('entry' not in page.json()['feed'] or i == 11):
                    break
                df = pd.concat([df, pd.DataFrame(page.json()['feed']['entry'])])
            df2 = pd.DataFrame()
            df2['review'] = [d['label'] for d in df["content"]]
            df2['title'] = [d['label'] for d in df["title"]]
            df2['date'] = [d['label'] for d in df["updated"]]   
            df2['rating'] = [d['label'] for d in df["im:rating"]]  
            df2['date'] = pd.to_datetime(df2['date']).dt.tz_localize(None)
            df2 = df2.loc[df2["date"] > datetime_scrape]
            df2['bank'] = bank
            scraped_reviews.append(df2)
            
        pd_reviews = pd.concat(scraped_reviews)
        # suppress_stdout(enable=False)
        return pd_reviews, datetime.now()
