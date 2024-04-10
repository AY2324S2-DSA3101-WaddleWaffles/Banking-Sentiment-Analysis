from models.text_generation_model import TextGenerationModel

class Inquirer:
    """
    A class for generating recommendations based on customer concerns.

    Attributes:
        model (TextGenerationModel): A text generation model used for generating insights and recommendation.
        prompt (function): A lambda function to generate a prompt based on a given concern.
    """

    def __init__(self, api_key):
        """
        Initialise the Recommender object.

        Args:
        """

        self.model = TextGenerationModel(api_key=api_key)
        self.insights_output = "\n\nPOSITIVE INSIGHTS\n\n[LIST OF POSITIVE GENERAL INSIGHTS EXCLUDING TOPICS]\n\nNEGATIVE INSIGHTS\n\n[LIST OF NEGATIVE GENERAL "\
            "INSIGHTS EXCLUDING TOPICS]\n\nTOPIC INSIGHTS\n\n[LIST OF TOPIC INSIGHTS]\n\n"
        self.comparison_output = "Features that are better for GXS\n\n[LIST OF BETTER GXS FEATURES AND WHY]\n\nFeatures that are worse for GXS"\
            "\n\n[LIST OF WORSE GXS FEATURES AND WHY]\n\n"
        self.suggestions_output = "\n\nPROBLEMS\n\n[LIST OF FEATURES THAT ARE NOT UP TO STANDARD]\n\nSUGGESTIONS FOR [FEATURE]\n\n[LIST OF SUGGESTIONS TO IMPROVE THE FEATURE]\n\n"

        self.main_data_prompt = lambda data: f"The following is the overall data acquired from our banking application: {data}."
        self.topic_data_prompt = lambda bank, topic, data: f"This is the ratings for the {topic} of the {bank} application: {data}."
        self.insights_prompt = lambda format: f"You are an analyst from GXS Bank. Help me describe what you see in terms of trend with this format: {format}"
        self.comparison_prompt = lambda format: f"You are an analyst from GXS Bank. Help me compare performance of features with the other bank using this format: {format}"
        self.suggestions_prompt = lambda format: f"You are an analyst from GXS Bank. Based on the poor/negative features picked up, suggest and recommend solutions to them using this format: {format}"

        self.rules_prompt = "No need for extra words in the output like 'Based on the data...'. No need to talk about null data."

    def get_insights(self, general_data, topics_data={}):
        """
        Generate a recommendation based on the given concern.

        Args:
            concern (str): The concern provided by the user.

        Returns:
            str: The generated recommendation.
        """
        full_prompt = self.insights_prompt(self.insights_output) + self.rules_prompt
        full_prompt += self.main_data_prompt(general_data)
        for topic, data in topics_data.items():
            full_prompt += self.topic_data_prompt("GXS", topic, data)

        recommendation = self.model.generate(full_prompt)
        return recommendation
    
    def get_comparison(self, gxs_topics_data, other_bank, other_bank_topics_data):
        """
        Generate a recommendation based on the given concern.

        Args:
            concern (str): The concern provided by the user.

        Returns:
            str: The generated recommendation.
        """
        full_prompt = self.comparison_prompt(self.comparison_output) + self.rules_prompt
        for topic, data in gxs_topics_data.items():
            full_prompt += self.topic_data_prompt("GXS", topic, data)
        for topic, data in other_bank_topics_data.items():
            full_prompt += self.topic_data_prompt(other_bank, topic, data)

        recommendation = self.model.generate(full_prompt)
        return recommendation
    
    def get_suggestions(self, topics_data={}):
        """
        Generate a recommendation based on the given concern.

        Args:
            concern (str): The concern provided by the user.

        Returns:
            str: The generated recommendation.
        """
        full_prompt = self.suggestions_prompt(self.suggestions_output) + self.rules_prompt
        for topic, data in topics_data.items():
            full_prompt += self.topic_data_prompt("GXS", topic, data)

        recommendation = self.model.generate(full_prompt)
        return recommendation
    