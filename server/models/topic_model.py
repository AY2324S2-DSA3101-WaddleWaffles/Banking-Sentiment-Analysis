from transformers import pipeline
import pandas as pd
import re  # Import the regular expression module

class TopicModellingModel:
    """
    A class for topic modelling.

    Attributes:
        pipe (pipeline): The pipeline for topic modelling.
    """

    def __init__(self, topics):
        """
        Initalise the TopicModellingModel object.
        """
        # Initialise pipe - Load zero-shot classification pipeline
        self.pipe = pipeline("zero-shot-classification")
        self.topics = topics

    def get_topic(self, reviews):
        """
        Generates the topic(s) of the bank review(s).

        Args: 
            reviews (str/list[str]): The bank review(s) to derive the topic from.

        Returns:
            result (str/dataframe): review as a string if input is a string, else a dataframe with the review(s) in the first column and the review's predicted topic in the second column.
        """

        # Converts reviews to a list if it is a string 
        if isinstance(reviews, str):
            reviews = [reviews]
            is_string = True
        else: 
            is_string = False

        # Define your list of associated words/categories
        associated_words = self.topics

        # Initialize variables 
        predictions = []

        # Iterate over each review
        for review in reviews:
            # Check if the review contains only numbers and symbols 
            if re.match(r'^[\d\W]+\s*$', review):
                predicted_associated_word = 'Not Applicable'  # Assigns 'Not Applicable' to predicted word 
            else:
                # Perform zero-shot classification on the reviews
                result = self.pipe(review, associated_words)

                # Get the predicted associated word with the highest probability score for each review
                predicted_associated_word = result['labels'][0]

            # Append prediction to list
            predictions.append({'Review': review,
                                'Predicted Topic': predicted_associated_word})

        # Create a DataFrame from the predictions list
        predictions_df = pd.DataFrame(predictions)

        if is_string:
            return predictions[0]['Predicted Topic']
        
        return predictions_df
    