from transformers import pipeline


class SentimentAnalysisModel:
    """
    A class for sentiment analysis.

    Attributes:
        pipe (pipeline): The pipeline for sentiment analysis.
    """

    def __init__(self):
        """
        Initalise the SentimentAnalysisModel object.
        """

        # Initalise pipe
        self.pipe = pipeline("text-classification", model="finiteautomata/bertweet-base-sentiment-analysis", top_k=None, truncation=True)
    
    def get_sentiment(self, reviews):
        """
        Generate the sentiment(s) of the bank review(s).

        Args: 
            reviews (str/list[str]): The bank review(s) to derive sentiment from.

        Returns:
            result (list): List of dictionary/dictionaries that contains the significance of the three possible sentiments (POS, NEU, NEG).
        """

        # Converts reviews to a list if it is a string 
        if isinstance(reviews, str):
            reviews = [reviews]

        results = []

        # Loop through each review to extract all three sentiment types and their corresponding probability into a dictionary
        for review in reviews:
            categories = self.pipe(review)
            result = {}

            for output in categories:
                for sentiment in output:
                    sentiment_type = sentiment["label"]
                    probability = sentiment["score"]
                    result[sentiment_type] = probability
            
            results.append(result)

        return results
    
test = SentimentAnalysisModel()
print(test.get_sentiment("I love you"))