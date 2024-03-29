import pandas as pd
import numpy as np
import os
import re
import string

csv_files = [f for f in os.listdir("data") if f.endswith('.csv')]

print(csv_files)

dfs = []

for csv in csv_files:
    df = pd.read_csv(os.path.join("data", csv))
    dfs.append(df)

final_df = pd.concat(dfs, ignore_index= True)

df = final_df.drop(["userName", "isEdited", "Unnamed: 0", "Unnamed: 0.1", 'developerResponse'], axis= 1)

df.dropna(subset=['review'], inplace=True) # Drops empty reviews

print(df.columns)

emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
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

df.to_csv('data/all_app_reviews.csv')