'''
Preprocess review data from the google scraper.
'''
import pandas as pd
import numpy as np
import os
import re
import string

def preprocess_playstore_data(df):
    """
    Preprocess reviews string data scraped from the google play store and standardize columns

    Args:
        df(pd.Dataframe): Dataframe using pd package containing unchanged data of scraped reviews

    Return:
        pd.Dataframe of the preprocessed text containing date,review,rating,title,bank as columns.
    """
    df = df.drop(["userImage", "userName", "repliedAt", "replyContent", "thumbsUpCount", "reviewId", "appVersion", "reviewCreatedVersion"], axis = 1)
    df.rename(columns= {"content" : "review", "score":"rating", "at": "date"}, inplace=True)
    df["title"] = ""
    df.dropna(subset=['review'], inplace=True) # Drops empty reviews

    emoji_pattern = re.compile("["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags 
            u"\U00002500-\U00002BEF"  # chinese char
            u"\U00002702-\U000027B0"
            u"\U000024C2-\U0001F251"
            u"\U0001f926-\U0001f937"
            u"\U00010000-\U0010ffff"
            u"\u2640-\u2642" 
            u"\u2600-\u2B55"
            u"\u200d"
            u"\u23cf"
            u"\u23e9"
            u"\u231a"
            u"\ufe0f"  # dingbats
            u"\u3030"
                        "]+", flags=re.UNICODE)

    translate_table = str.maketrans(string.punctuation, " " * len(string.punctuation))

    def preproccessing(sentence):
        if not isinstance(sentence, str):
            return "" # If title is empty return blank title
        sentence_noemoji = emoji_pattern.sub(r'', sentence) #removes emoji
        sentence_nobreaks = sentence_noemoji.replace('\r', '').replace('\n', '') #remove breaks
        sentence_nopunctuation = sentence_nobreaks.translate(translate_table) #removes punctuation
        sentence_nopunctuation = sentence_nopunctuation.replace("'", " ").replace('"', " ").replace("’", "").replace("…", " ").replace("‘", "")
        sentence_nonumbers = re.sub("\d", "",sentence_nopunctuation)
        sentence_noextraspaces = re.sub(' +', ' ', sentence_nonumbers) #remove extra spaces
        sentence_lowered = sentence_noextraspaces.lower()
        return sentence_lowered

    df['review'] = df['review'].apply(preproccessing)
    df['title'] = df['title'].apply(preproccessing)
    df['bank'] = df['bank'].str.upper()
    df['source'] = 'playstore'
    df['review'].replace('', np.nan, inplace=True)
    df.dropna(subset=['review'], inplace=True)
    return df
