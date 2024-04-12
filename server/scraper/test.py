
import pandas as pd
from tqdm import tqdm
import json
import time
import os
import datetime as datetime


# Monkey fix for google_play_scraper
# google_play_scraper.features.reviews = reviews

# bank_names = ['gxs', 'dbs', 'ocbc', 'uob','maribank','trust']
# apps = {'gxs': 'sg.com.gxs.app','dbs': 'com.dbs.sg.dbsmbanking', 'ocbc': 'com.ocbc.mobile','uob': 'com.uob.mighty.app','trust': 'sg.trust','maribank': 'sg.com.maribankmobile.digitalbank'}
# continuation_tokens = {}

# # Fetch reviews
# reviews_count = 3000 # change count here

# for bank in bank_names:
#     result = []
#     if bank not in continuation_tokens:
#         continuation_tokens[bank] = None
    
#     with tqdm(total=reviews_count, position=0, leave=True) as pbar:
        
#         while len(result) < reviews_count:
#             continuation_token = None
#             if continuation_tokens[bank] is not None:
#                 continuation_token = _ContinuationToken(continuation_tokens[bank])
#             new_result, continuation_token = reviews(
#                 apps[bank],
#                 continuation_token= continuation_token,
#                 lang='en',
#                 country='us',
#                 filter_score_with=None,
#                 count=199
#             )
#             if not new_result:
#                 break
#             result.extend(new_result)
#             pbar.update(len(new_result))
            
#             continuation_tokens[bank] = continuation_token.token
        

#     # Create a DataFrame from the reviews & Download the file
#     df = pd.DataFrame(result)
#     df['bank'] = bank
#     if len(df.index) > 0:
#         df = preprocess_playstore_data(df)
    
#     df["source"] = "google-play-store"
    
#     df.to_csv(f'fixed_play_store_data/{bank}_playstore_reviews.csv')

# csv_files = [f for f in os.listdir("fixed_play_store_data") if f.endswith('.csv')]

# dfs = []

# for csv in csv_files:
#     df = pd.read_csv(os.path.join("fixed_play_store_data", csv), index_col=0)
    
#     dfs.append(df)

# final_df = pd.concat(dfs, ignore_index= True)
# datetime_col = pd.to_datetime(final_df["date"])

# final_df["year"] = datetime_col.dt.year
# final_df["month"] = datetime_col.dt.month
# final_df["day"] = datetime_col.dt.day
# final_df.drop(columns = ["date"], inplace = True)
# final_df["source"] = "playstore"

# df = pd.read_csv("apple_data/updated_all_apple_reviews.csv", index_col=0)
# df["source"] = "appstore"
# final_df = pd.concat([df, final_df], ignore_index= True)

# final_df.to_csv("test_data/all_reviews.csv")
print(datetime.strptime)
