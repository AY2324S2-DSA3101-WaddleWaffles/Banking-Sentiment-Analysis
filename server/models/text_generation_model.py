from huggingface_hub import login, logout
from transformers import AutoTokenizer, AutoModelForCausalLM, TextStreamer
from util.stdout_supress import suppress_stdout


class TextGenerationModel:
    """
    A class for text generation using Gemma-2b.

    Attributes:
        model_name (str): The name of the pretrained model to use.
        tokeniser (AutoTokenizer): The tokeniser for tokenising inputs.
        model (AutoModelForCausalLM): The pretrained model for text generation.
    """
        
    def __init__(self, huggingface_token):
        """
        Initialise the TextGenerationModel object.

        Args:
            huggingface_token (str): API token for Hugging Face Hub.
        """

        # Disable useless printing of login info
        suppress_stdout(enable=True)

        # Login into HuggingFace Hub to gain access to gated models
        login(token=huggingface_token)

        # Initialise model and tokeniser
        self.model_name = "google/gemma-2b-it"
        self.tokeniser = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name)
        logout()

        # Enable printing
        suppress_stdout(enable=False)

        self.streamer = TextStreamer(self.tokeniser)
    
    def generate(self, prompt, max_new_tokens=256, stream=False):
        """
        Generate text based on the given prompt.

        Args:
            prompt (str): The prompt for text generation.
            max_new_tokens (int, optional): The maximum number of tokens to generate. Defaults to 256.

        Returns:
            str: The generated text.
        """

        # Tokenise input
        input_ids = self.tokeniser(prompt, return_tensors="pt")

        # Generate text from model
        outputs = self.model.generate(**input_ids, max_new_tokens=max_new_tokens, streamer=self.streamer if stream else None)

        # Decode the output into text
        generated_output = self.tokeniser.decode(outputs[0], skip_special_tokens=True)
        return generated_output
    
    def end_session(self):
        """
        Logout the machine from the Hub and removes API token from machine.
        """
        logout()

        return
