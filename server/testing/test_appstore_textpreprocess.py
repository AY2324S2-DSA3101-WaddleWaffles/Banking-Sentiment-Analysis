import pytest
import json
import pandas as pd
import numpy as np

def test_textpreprocess_appstore_data(appstore_data_preprocessor, unprocessed_appstore_text):
    processed_data = '{"review":"have been using for years and still the best banking app ","title":"very good app","date":1709953965000,"rating":"5","bank":"DBS","source":"appstore"}'
    expected_output = pd.json_normalize(json.loads(processed_data))
    actual_output = appstore_data_preprocessor(unprocessed_appstore_text)
    assert actual_output['review'].all() == expected_output['review'].all()
    