# Summary: works well, but bug and application seem to have too similar connotations, model 
# seems to be using them interchangeably. any review with "app" will be classified as application
# even though there is a bug mentioned
from transformers import pipeline
import pandas as pd


csv_file = r'./all_app_reviews.csv'

df = pd.read_csv(csv_file)

text_data = df['title'].astype(str)  # Replace 'column_name' with the name of the column containing text data
# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification")

# Drop rows with missing values in the 'title' column
df = df.dropna(subset=['title'])

# Define your list of associated words
associated_words = ['application', 'login', 'interface', 'update', 'bug']

# Assuming df is your DataFrame and 'title' is the column containing titles

# Iterate over each title and perform zero-shot classification
for title in df['title']:
    # Perform zero-shot classification on the title
    result = classifier(title, associated_words)
    
    # Get the associated word with the highest probability score
    associated_word = result['labels'][0]
    
    # Print the title and its associated word
    print("Title:", title)
    print("Associated Word:", associated_word)
    print()