# Summary: 
# 
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

#csv_file = r'./all_app_reviews.csv'
csv_file = r'./My_Bank_Data.csv'

df = pd.read_csv(csv_file)

text_data = df['review'].astype(str)  # Replace 'column_name' with the name of the column containing text data

#######
df.dropna(subset=['review'], inplace=True)
tokenized_review = [word_tokenize(review.lower()) for review in df['review']]
dictionary = Dictionary(tokenized_review)
dictionary.filter_extremes(no_below=10, no_above=0.5)
corpus = [dictionary.doc2bow(tokens) for tokens in tokenized_review]
associated_words = ['login', 'interface', 'crash', 'speed', 'update', 'notifications', 'functions', 'security', 'error']
lda_model = LdaModel(corpus, num_topics=len(associated_words), passes=10, id2word=dictionary, eta='auto', eval_every=None, iterations=500, alpha='auto', random_state=42)
similarity_df = pd.DataFrame(index=df.index, columns=associated_words)

threshold = 0.1  # Set your threshold value here

for i, review in enumerate(tokenized_review):
    bow = dictionary.doc2bow(review)
    topics = lda_model.get_document_topics(bow)
    for j, word in enumerate(associated_words):
        max_score = 0.0  # Initialize with default probability score
        for topic_id, score in topics:
            if topic_id == j:
                max_score = score
                break  # Exit loop once topic is found
        if max_score < threshold:
            max_score = 0.0  # Assign a default probability score if below threshold
        similarity_df.at[i, word] = max_score

similarity_df = similarity_df.apply(pd.to_numeric)

df['associated_word'] = similarity_df.idxmax(axis=1)

df = df.drop(df.columns[[1, 2, 3, 4]], axis=1)

df['associated_word'] = df['associated_word'].fillna("others")

print(df)

full_associated_words_list = df['associated_word'].tolist()
#print(full_associated_words_list)

# Create a new column for accuracy score and initialize with 0
df['accuracy'] = 0

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    # Check if the associated word matches the label or label2
    if row['associated_word'] == row['label'] or row['associated_word'] == row['label2']:
        # If there's a match, assign an accuracy score of 1
        df.at[index, 'accuracy'] = 1

# Calculate the overall accuracy
overall_accuracy = df['accuracy'].sum() / len(df)

# Print the DataFrame with the accuracy column
print(df)

# Print the overall accuracy
print("Overall Accuracy:", overall_accuracy)




