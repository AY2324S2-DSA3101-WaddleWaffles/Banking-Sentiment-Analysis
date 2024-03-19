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
        self.prompt = lambda concern: f"There is a concern: {concern}. Generate five actionable proposals for the customer experience team to target the concern."

    def recommend(self, concern):
        """
        Generate a recommendation based on the given concern.

        Args:
            concern (str): The concern provided by the user.

        Returns:
            str: The generated recommendation.
        """

        recommendation = self.model.generate(self.prompt(concern=concern)).split("\n", 2)[-1]
        return recommendation
    
    def end_session(self):
        """
        Logout the machine from the Hub and removes API token from machine.
        """
        self.model.end_session()

        return
    