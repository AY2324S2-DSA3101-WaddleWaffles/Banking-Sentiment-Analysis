# Summary: Included label and label2, self labelled based on reviews to test model's accuracy. Tested
# on ZS, score of 0.8. Will run on LDA and see results. ZS still slow, takes 4 mins.
# Now running on venv on laptop - installed transformers, pandas, tf-keras

from transformers import pipeline
import pandas as pd


#csv_file = r'./all_app_reviews.csv'
csv_file = r'./My_Bank_Data.csv'

df = pd.read_csv(csv_file)

text_data = df['title'].astype(str)  # Replace 'column_name' with the name of the column containing text data
# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification")

# Drop rows with missing values in the 'title' column
df = df.dropna(subset=['title'])

# Define your list of associated words
associated_words = ['login', 'interface', 'crash', 'speed', 'update', 'notifications', 'functions', 'security', 'error']
# Assuming df is your DataFrame and 'title' is the column containing titles

# Checking accuracy section
accuracy_scores = []
predictions = []

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    # Perform zero-shot classification on the title
    result = classifier(row['review'], associated_words)
    
    # Get the predicted associated word with the highest probability score
    predicted_associated_word = result['labels'][0]
    
    # Check if the predicted associated word matches either 'label' or 'label2'
    if predicted_associated_word == row['label'] or predicted_associated_word == row['label2']:
        accuracy_scores.append(1)  # Correct prediction
    else:
        accuracy_scores.append(0)  # Incorrect prediction

    predictions.append({'Predicted Word': predicted_associated_word,
                        'Label': row['label'],
                        'Label2': row['label2']})

# Calculate accuracy score
accuracy = sum(accuracy_scores) / len(accuracy_scores)

print("Accuracy Score:", accuracy)

# Create a DataFrame from the predictions list
predictions_df = pd.DataFrame(predictions)

# Print the DataFrame
print(predictions_df)