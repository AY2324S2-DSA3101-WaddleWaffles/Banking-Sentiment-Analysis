from transformers import pipeline
import pandas as pd
import re  # Import the regular expression module

class TopicModellingModel:
    """
    A class for topic modelling.

    Attributes:
        pipe (pipeline): The pipeline for sentiment analysis.
    """

    def __init__(self):
        """
        Initalise the TopicModellingModel object.
        """
        # Initialise pipe - Load zero-shot classification pipeline
        self.pipe = pipeline("zero-shot-classification")

    def get_topic(self, reviews):
        """
        Generate the sentiment(s) of the bank review(s).

        Args: 
            reviews (str/list[str]): The bank review(s) to derive sentiment from.

        Returns:
            result (list): List of dictionary/dictionaries that contains the significance of the three possible sentiments (POS, NEU, NEG).
        """

        # Define your list of associated words/categories
        associated_words = ['login', 'interface', 'crash', 'speed', 'update', 'notifications', 'functions', 'security', 'error']

        # Initialize variables for accuracy calculation
        predictions = []

        # Iterate over each review
        for review in reviews:
            # Check if the review contains only alphanumeric characters
            if re.match(r'^[\d\W]+\s*$', review):
                predicted_associated_word = 'Not Applicable'  # Assign 'Not Applicable' to predicted word
            else:
                # Perform zero-shot classification on the reviews
                result = self.pipe(review, associated_words)

                # Get the predicted associated word with the highest probability score for each review
                predicted_associated_word = result['labels'][0]

            # Append prediction to list
            predictions.append({'Review': review,
                                'Predicted Word': predicted_associated_word})

        # Create a DataFrame from the predictions list
        predictions_df = pd.DataFrame(predictions)

        return predictions_df