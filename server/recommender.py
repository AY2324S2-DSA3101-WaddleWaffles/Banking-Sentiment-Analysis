from dotenv import load_dotenv
from models.text_generation_model import TextGenerationModel

import os

# Load variables from .env file
load_dotenv()

class Recommender:
    """
    A class for generating recommendations based on customer concerns.

    Attributes:
        model (TextGenerationModel): A text generation model used for generating recommendations.
        prompt (function): A lambda function to generate a prompt based on a given concern.
    """

    def __init__(self, huggingface_token=os.getenv("HUGGINGFACE_TOKEN")):
        """
        Initialise the Recommender object.

        Args:
            huggingface_token (str, optional): API token for Hugging Face. Defaults to value from environment variable.
        """

        self.model = TextGenerationModel(huggingface_token)
        self.output_format = "1.[SOLUTION 1]\n[DETAILS]\n\n2.[SOLUTION 2]\n[DETAILS]\n\n3.[SOLUTION 3]..."
        self.prompt = lambda concern: f"There is a concern: {concern}. Using this format: {self.output_format}, give five solutions with details for the customer experience team to target the concern."

    def recommend(self, concern):
        """
        Generate a recommendation based on the given concern.

        Args:
            concern (str): The concern provided by the user.

        Returns:
            str: The generated recommendation.
        """
        full_prompt = self.prompt(concern)
        recommendation = self.model.generate(full_prompt).split(full_prompt)[-1]
        return recommendation
    
    def end_session(self):
        """
        Logout the machine from the Hub and removes API token from machine.
        """
        self.model.end_session()

        return
    