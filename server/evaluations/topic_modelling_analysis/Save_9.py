# Summary: Added gensim.corpora import dictionary. Aiming to add in a list of words for model to 
# classify each title instead.
# changed corpus
# added from nltk.tokenize import word_tokenize
# classifies each title according to words given. However, NaN still present, some classifications seem
# to be inaccurate.

import csv
import pandas as pd
import gensim
from gensim import corpora
from gensim.models import LdaModel
from gensim.corpora import Dictionary
from pprint import pprint
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
from collections import Counter
from collections import defaultdict
from nltk.tokenize import word_tokenize

nltk.download('stopwords')
nltk.download('punkt')

csv_file = r'D:\Documents\NUS\Y3 S2\DSA3101\Project\all_app_reviews.csv'

df = pd.read_csv(csv_file)

text_data = df['title'].astype(str)  # Replace 'column_name' with the name of the column containing text data

#######
df.dropna(subset=['title'], inplace=True)
tokenized_titles = [word_tokenize(title.lower()) for title in df['title']]
dictionary = Dictionary(tokenized_titles)
dictionary.filter_extremes(no_below=10, no_above=0.5)
corpus = [dictionary.doc2bow(tokens) for tokens in tokenized_titles]
associated_words = ['application', 'login', 'interface', 'update', 'bug']
lda_model = LdaModel(corpus, num_topics=len(associated_words), passes=10, id2word=dictionary, eta='auto', eval_every=None, iterations=500, alpha='auto', random_state=42)
similarity_df = pd.DataFrame(index=df.index, columns=associated_words)
for i, title in enumerate(tokenized_titles):
    bow = dictionary.doc2bow(title)
    topics = lda_model.get_document_topics(bow)
    for j, word in enumerate(associated_words):
        similarity_df.at[i, word] = max(score for topic_id, score in topics if topic_id == j)

similarity_df = similarity_df.apply(pd.to_numeric)

df['associated_word'] = similarity_df.idxmax(axis=1)

df = df.drop(df.columns[[1, 2, 3, 4]], axis=1)

print(df)

#######

