from models.text_generation_model import TextGenerationModel

class Explainer:

    def __init__(self, api_key):
        """
        Initialize the Inquirer object.

        Args:
            api_key (str): The API key for accessing the text generation model.
        """
        self.model = TextGenerationModel(api_key=api_key)

        self.text_prompt = lambda text: f"Text: {text}"
        self.sentiment_prompt = lambda sentiment: f"Sentiment: {sentiment}"
        self.rules_prompt = "Given the following text and its sentiment, extract three key words that contributed most significantly to the expressed sentiment:"
        self.format_prompt = "Extracted ONLY singular key words with no other output other than following this format: WORD, WORD, WORD."

    def get_keywords(self, text, sentiment):

        full_prompt =  self.rules_prompt + "\n\n" + self.text_prompt(text) + "\n\n" + self.sentiment_prompt(sentiment) + "\n\n" + self.format_prompt

        keywords = self.model.generate(full_prompt)
        return keywords
    