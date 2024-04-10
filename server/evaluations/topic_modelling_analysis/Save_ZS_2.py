# Summary: may or may not use due to slowness - need to test. added a new list of associated words
# Removed 'application' as it was too general - login and interface are parts of application, but models
# often classify as application as the word app is used - app is used a lot, so the classification is
# not very useful
# First List: ['application', 'login', 'interface', 'update', 'bug']
# Second List: associated_words = ['application', 'login', 'interface', 'update', 
#                    'notifications', 'responsiveness', 'services']
# Third List: ['login', 'interface', 'crash', 'speed', 'update', 'notifications', 'functions', 'security', 'error']
# Second Summary: did zero-shot, slow, toggled around with the words according to zp's instructions,
# began work on my own dataset to test accuracy of models
from transformers import pipeline
import pandas as pd


#csv_file = r'./all_app_reviews.csv'
csv_file = r'./My_Bank_Reviews.csv'

df = pd.read_csv(csv_file)

text_data = df['title'].astype(str)  # Replace 'column_name' with the name of the column containing text data
# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification")

# Drop rows with missing values in the 'title' column
df = df.dropna(subset=['title'])

# Define your list of associated words
associated_words = ['application', 'login', 'interface', 'update', 
                    'notifications', 'responsiveness', 'services']

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