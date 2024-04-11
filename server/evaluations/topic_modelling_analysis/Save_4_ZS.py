# Summary: Added edge cases such as !@#!#!$@!$@! and 12335 and feagkjagaehkg to deal with nonsense reviews
# Cannot detect nonsense words/letters, but can detect strings of just numbers or just symbols
# Can detect combination of string of numbers and symbols combined as well, but cannot detect 
# string of letters with numbers or symbols combined.

from transformers import pipeline
import pandas as pd
import re  # Import the regular expression module

# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification")

# Load the CSV file
csv_file = './My_Bank_Data_2.csv'
df = pd.read_csv(csv_file)

# Ensure that the 'title' column contains the text data you want to classify
text_data = df['review'].astype(str)

# Define your list of associated words/categories
associated_words = ['login', 'interface', 'crash', 'speed', 'update', 'notifications', 'functions', 'security', 'error']

# Initialize variables for accuracy calculation
correct_predictions = 0
total_predictions = 0
predictions = []

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    review = row['review']
    # Check if the review contains only alphanumeric characters
    if re.match(r'^[\d\W]+\s*$', review):
        predicted_associated_word = 'Not Applicable'  # Assign 'Not Applicable' to predicted word
    # Perform zero-shot classification on the title
    else:
        result = classifier(row['review'], associated_words)

    # Get the predicted associated word with the highest probability score
        predicted_associated_word = result['labels'][0]

    # Increment the total number of predictions
    total_predictions += 1

    # Check if the predicted associated word matches any of the labels provided
    if predicted_associated_word in [row['label'], row['label2']]:
        correct_predictions += 1

    # Append prediction to list
    predictions.append({'Review': row['review'],
                        'Predicted Word': predicted_associated_word,
                        'Label': row['label'],
                        'Label2': row['label2']})

# Calculate accuracy
accuracy = correct_predictions / total_predictions

print("Accuracy Score:", accuracy)

# Create a DataFrame from the predictions list
predictions_df = pd.DataFrame(predictions)

# Print the DataFrame
print(predictions_df)
