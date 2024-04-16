from nltk.corpus import stopwords
from util.stdout_supress import suppress_stdout

import numpy as np

import nltk
import shap
nltk.download('stopwords', quiet=True)

class Explainer:
    """
    Class for generating keyword explanations using SHAP values.

    Attributes:
        explainer: A SHAP explainer object.
        special_chars: String containing special characters to be removed from words.
        sentiment_index: Dictionary mapping sentiment labels to their corresponding indices.
        stop_words: Set of stopwords in English.
    """

    def __init__(self, model):
        """
        Initialises the Explainer with a SHAP explainer object.

        Args:
            model: A model to be explained.
        """

        self.explainer = shap.Explainer(model)
        self.special_chars = ' \t\n\r!@#$%^&*()-_=+`~[]{}\\|;:\'",.<>?/'
        self.sentiment_index = {"Negative": 0, "Neutral": 1, "Positive": 2}
        self.stop_words = set(stopwords.words('english'))
 
    def get_keywords(self, text, sentiment):
        """
        Get keywords that contribute to the sentiment prediction of the text.

        Args:
            text: Input text to be explained.
            sentiment: Sentiment label of the text.

        Returns:
            List of keywords that contribute to the sentiment prediction.
        """
        shap_values = self.explainer([text], silent=True)
        importance = shap_values.values[0][:,self.sentiment_index[sentiment]]
        sorted_words = shap_values.data[0][np.argsort(importance)][::-1]
        keywords = list(filter(lambda word: word not in self.stop_words, [word.strip(self.special_chars).lower() for word in sorted_words if any(c.isalpha() for c in word)]))
        
        return keywords
