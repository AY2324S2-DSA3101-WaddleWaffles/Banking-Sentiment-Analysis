from h2ogpte import H2OGPTE

class TextGenerationModel:
    """
    A class for text generation using H2OGPTE.

    Attributes:
        client (H2OGPTE): The client for interacting with the H2OGPTE service.
        session_id (str): The ID of the deployed chat session.
    """
        
    def __init__(self, api_key):
        """
        Initialise the TextGenerationModel object.

        Args:
            api_key (str): API token for H2OGPTE service.
        """

        self.client = H2OGPTE(
            address='https://h2ogpte.genai.h2o.ai',
            api_key=api_key,
        )
        self.session_id = self.client.create_chat_session()

    def generate(self, prompt):
        """
        Generate text based on the given prompt.

        Args:
            prompt (str): The prompt for text generation.
        
        Returns:
            str: The generated text.
        """

        response = None
        while not response:
            try:
                with self.client.connect(self.session_id) as session:
                    response = session.query(prompt, timeout=15, rag_config={"rag_type": "llm_only"}, llm_args={"max_new_tokens": 128})
            except Exception as e:
                self.client.delete_chat_sessions([self.session_id])
                self.session_id = self.client.create_chat_session()
                continue

        return response.content
