from unittest.mock import MagicMock

import pytest

def test_text_generation_model_querying(text_generation_model):
    # Mocking the H2OGPTE client
    mock_client = MagicMock()
    text_generation_model.client = mock_client

    mock_response_content = "MOCKED TEXT GENERATION RESPONSE"
    mock_response = MagicMock()
    mock_response.content = mock_response_content
    mock_client.connect.return_value.__enter__.return_value.query.return_value = mock_response

    generated_text = text_generation_model.generate("MOCKED TEXT GENERATION QUERY")

    assert generated_text == mock_response_content
