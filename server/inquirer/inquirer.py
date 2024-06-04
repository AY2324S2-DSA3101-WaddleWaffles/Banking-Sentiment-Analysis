from models.text_generation_model import TextGenerationModel

import json

class Inquirer:
    """
    A class for generating recommendations based on customer concerns.

    Attributes:
        model (TextGenerationModel): A text generation model used for generating insights and recommendations.
        insights_output (str): Output format for insights.
        comparison_output (str): Output format for feature comparison.
        suggestions_output (str): Output format for suggestions.
        main_data_prompt (function): A lambda function to generate a prompt based on overall data.
        topic_data_prompt (function): A lambda function to generate a prompt based on topic-specific data.
        insights_prompt (function): A lambda function to generate a prompt for insights.
        comparison_prompt (function): A lambda function to generate a prompt for feature comparison.
        suggestions_prompt (function): A lambda function to generate a prompt for suggestions.
        rules_prompt (str): Prompt specifying rules for the generated output.
    """

    def __init__(self, api_key):
        """
        Initialize the Inquirer object.

        Args:
            api_key (str): The API key for accessing the text generation model.
        """

        self.model = TextGenerationModel(api_key=api_key)
        self.insights_output = "{\"Positive Insights\": <Paragraph>, \"Negative Insights\": <Paragraph>, \"Topic Insights\": <Paragraph>}. "
        self.comparison_output = "{\"Better Topics\": {<Topic>: <Paragraph on why>, <Topic>: <Paragraph on why>, ...}, \"Worse Topics\": {<Topic>: <Paragraph on why>, <Topic>: <Paragraph on why>, ...}}. "
        self.suggestions_output = "{<Topic>: <Suggestion>, <Topic>: <Suggestion>,...}. "

        self.main_data_prompt = lambda data: f"The following is the overall data acquired from our banking application: {data}."
        self.topic_data_prompt = lambda bank, topic, data: f"This is the ratings for the {topic} of the {bank} application: {data}."
        self.insights_prompt = lambda format: f"You are an analyst from GXS Bank. Help me describe what you see in terms of trend with this JSON format: {format}"
        self.comparison_prompt = lambda format: f"You are an analyst from GXS Bank. Help me compare performance of topics with the other bank using this JSON format: {format}"
        self.suggestions_prompt = lambda format: f"You are an analyst from GXS Bank. Based on the poor/negative topics picked up, suggest and recommend solutions to them using this JSON format: {format}"

        self.rules_prompt = "Do not put extra words like 'Based on...'. Output STRICTLY in JSON ONLY. Do not talk about null data."

    def get_insights(self, general_data, topics_data={}):
        """
        Generate insights based on the provided data.

        Args:
            general_data (str): The overall data acquired from the banking application.
            topics_data (dict): Dictionary containing ratings for different topics.

        Returns:
            str: The generated insights.
        """

        full_prompt = self.insights_prompt(self.insights_output) + self.rules_prompt
        full_prompt += self.main_data_prompt(general_data)
        for topic, data in topics_data.items():
            full_prompt += self.topic_data_prompt("GXS", topic, data)

        insights = self.model.generate(full_prompt)

        json_insights = self.convert_json(insights)

        if type(json_insights["Topic Insights"]) == dict:
            json_insights["Topic Insights"] = " ".join([value for value in json_insights["Topic Insights"].values()])

        return json_insights
    
    def get_comparison(self, gxs_topics_data, other_bank, other_bank_topics_data):
        """
        Generate a comparison report between GXS Bank and another bank.

        Args:
            gxs_topics_data (dict): Dictionary containing ratings for GXS Bank's topics.
            other_bank (str): Name of the other bank being compared.
            other_bank_topics_data (dict): Dictionary containing ratings for the other bank's topics.

        Returns:
            str: The generated comparison report.
        """

        full_prompt = self.comparison_prompt(self.comparison_output) + self.rules_prompt
        for topic, data in gxs_topics_data.items():
            full_prompt += self.topic_data_prompt("GXS", topic, data)
        for topic, data in other_bank_topics_data.items():
            full_prompt += self.topic_data_prompt(other_bank, topic, data)

        comparison = self.model.generate(full_prompt)
        return self.convert_json(comparison)
    
    def get_suggestions(self, topics_data={}):
        """
        Generate suggestions for improving features based on provided data.

        Args:
            topics_data (dict): Dictionary containing ratings for different topics.

        Returns:
            str: The generated suggestions.
        """
        
        full_prompt = self.suggestions_prompt(self.suggestions_output) + self.rules_prompt
        for topic, data in topics_data.items():
            full_prompt += self.topic_data_prompt("GXS", topic, data)

        suggestions = self.model.generate(full_prompt)
        suggestions = suggestions.replace("\'","\"")
        return self.convert_json(suggestions)
    
    def strip_output(self, output):
        """
        Strip excess words from the output string that is formatted as JSON.

        Args:
            output (str): String of output.

        Returns:
            str: The stripped output.
        """
        while output[0] != "{":
            output = output[1:]
        while output[-1] != "}":
            output = output[:-1]   
        return output

    def convert_json(self, output):
        """
        Convert a string in JSON format into actual JSON.

        Args:
            output (str): String of output.

        Returns:
            str: The generated JSON.
        """
        output = self.strip_output(output)
        output = output.replace("\n", "").replace('\"', '"')
        output = json.loads(output)
        return output
    