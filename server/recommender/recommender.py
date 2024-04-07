from models.text_generation_model import TextGenerationModel

class Recommender:
    """
    A class for generating recommendations based on customer concerns.

    Attributes:
        model (TextGenerationModel): A text generation model used for generating recommendations.
        prompt (function): A lambda function to generate a prompt based on a given concern.
    """

    def __init__(self, huggingface_token):
        """
        Initialise the Recommender object.

        Args:
            huggingface_token (str, optional): API token for Hugging Face. Defaults to value from environment variable.
        """

        self.model = TextGenerationModel(huggingface_token)
        self.output_format = "1.[SOLUTION 1 HERE]\n[DETAILS OF SOLUTION]\n\n2.[SOLUTION 2 HERE]\n[DETAILS OF SOLUTION]\n\n3.[SOLUTION 3 HERE]..."
        self.prompt = lambda concern: f"There is a concern: {concern}. Give exactly three solutions for the customer experience team to target the concern. Format your output only with three short solutions and short description of them."

    def recommend(self, concern, stream=False):
        """
        Generate a recommendation based on the given concern.

        Args:
            concern (str): The concern provided by the user.

        Returns:
            str: The generated recommendation.
        """
        full_prompt = self.prompt(concern)
        recommendation = self.model.generate(full_prompt, stream=stream).split(full_prompt)[-1]
        return recommendation
    
    def end_session(self):
        """
        Logout the machine from the Hub and removes API token from machine.
        """
        self.model.end_session()

        return
    