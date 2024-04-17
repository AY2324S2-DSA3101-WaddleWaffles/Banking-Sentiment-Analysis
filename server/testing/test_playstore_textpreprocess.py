import pytest
import json
import pandas as pd
import numpy as np

def test_preprocess_playstore_data(playstore_data_preprocessor, unprocessed_playstore_text):
    processed_data = '{"review":"generally good however please add either nfc function to the app or allow link to google wallet or apple pay everyone is going wallet less these days without having the need to carry physical wallets or cards and why are we unable to scan sgqr codes for payments only paynow qr codes would definitely get my stars if not for the above shortcomings stars for now ","rating":4,"date":1712987614000,"bank":"GXS","title":"","source":"playstore"}'
    expected_output = pd.json_normalize(json.loads(processed_data))
    actual_output = playstore_data_preprocessor(unprocessed_playstore_text)
    assert actual_output['review'].all() == expected_output['review'].all()
    