import pandas as pd
import numpy as np
import json
from app_store_scraper import AppStore

## Request limit should be around 3500 requests per hour.
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

Trust = AppStore(country = 'sg', app_name = 'trust-bank-sg', app_id = '1598460384')

Trust.review()

pd_Trust_reviews = pd.DataFrame(np.array(Trust.reviews), columns = ['review'])

pd_Trust_reviews = pd_Trust_reviews.join(pd.DataFrame(pd_Trust_reviews.pop('review').tolist()))


pd_Trust_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/Trust_app_reviews.csv') 

Maribank = AppStore(country = 'sg', app_name = 'maribank', app_id = '1658919834')

Maribank.review()

pd_Maribank_reviews = pd.DataFrame(np.array(Maribank.reviews), columns = ['review'])

pd_Maribank_reviews = pd_Maribank_reviews.join(pd.DataFrame(pd_Maribank_reviews.pop('review').tolist()))

pd_Maribank_reviews.to_csv('Banking-Sentiment-Analysis/server/database/data/Maribank_app_reviews.csv') 