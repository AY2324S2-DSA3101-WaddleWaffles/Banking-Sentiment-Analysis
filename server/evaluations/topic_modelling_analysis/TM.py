# d:/Documents/NUS/Y3 S2/DSA3101/Project/Banking-Sentiment-Analysis/server/
import csv
import pandas as pd
import gensim
from gensim import corpora
from gensim.models import LdaModel
from pprint import pprint
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

# Path to your CSV file
csv_file = r'D:\Documents\NUS\Y3 S2\DSA3101\Project\all_app_reviews.csv'

# Read and print the contents of the CSV file
with open(csv_file, newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        pass

df = pd.read_csv(csv_file)

# Extract text data from the desired column
text_data = df['title'].astype(str)  # Replace 'column_name' with the name of the column containing text data

# Preprocessing
stop_words = set(stopwords.words('english'))
punctuation = set(string.punctuation)

def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    tokens = [token for token in tokens if token not in stop_words and token not in punctuation and len(token) > 3]
    return tokens

processed_text_data = [preprocess_text(text) for text in text_data]

# Create a dictionary mapping of word IDs to words
dictionary = corpora.Dictionary(processed_text_data)

# Convert tokenized documents into a document-term matrix
corpus = [dictionary.doc2bow(doc) for doc in processed_text_data]

# Train the LDA model
lda_model = LdaModel(corpus=corpus,
                     id2word=dictionary,
                     num_topics=3,  # Specify the number of topics
                     passes=10)     # Number of passes through the corpus during training

# Get the topic distribution for each document
doc_topics = []
for doc_bow in corpus:
    doc_topics.append(lda_model.get_document_topics(doc_bow))

# Find the topic with the highest probability for each document
max_topic_indices = [max(doc_topic, key=lambda x: x[1])[0] for doc_topic in doc_topics]

# Add a new column to the DataFrame to store the most associated topic for each document
df['most_associated_topic'] = max_topic_indices

# Display the DataFrame with the new column
#print(df)

categories = {
    0: "Category A",
    1: "Category B",
    2: "Category C",
}

# Add a new column to the DataFrame to store the topic categories for each document
df['topic_category'] = df['most_associated_topic'].map(categories)

# Display the DataFrame with the new column
print(df)

df['topic_category'] = df['topic_category'].map({v: k for k, v in categories.items()})
grouped = df.groupby('topic_category')

for category, group in grouped:
    print(f"Category: {category}")
    print(group)  # Print the contents of the group
    print("\n")

