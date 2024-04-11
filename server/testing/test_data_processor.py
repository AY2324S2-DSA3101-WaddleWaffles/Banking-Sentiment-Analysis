from datetime import datetime

import pytest

def test_topic_retrieval(data_manager, reviews_data):
    expected_topics = {"topics": ["interface","reliability","transaction","performance","speed","customer support","features","bug","service","update"]}
    actual_topics = data_manager.get_topics(data=reviews_data)

    # The order of topics is not expected to be the same. The length and content will be asserted.
    assert len(actual_topics["topics"]) == len(expected_topics["topics"])
    assert set(actual_topics["topics"]) == set(expected_topics["topics"])


def test_topic_sentiment_retrieval_gxs_filtered(data_manager, gxs_data):
    # Test for GXS data
    expected_output = {'bank': 'GXS', 'start_date': None, 'end_date': None, 'topic_sentiments': {'service': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, 'interface': {'Positive': 0.909, 'Neutral': 0.091, 'Negative': 0.0}, 'features': {'Positive': 0.0, 'Neutral': 0.0, 'Negative': 1.0}, 'transaction': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}}
    actual_output = data_manager.get_topic_sentiments(data=gxs_data, start_date=None, end_date=None, bank="GXS")
    assert actual_output == expected_output


def test_topic_sentiment_retrieval_gxs_date_filtered(data_manager, gxs_data_time_filtered_3_months):
    # Test for GXS data with date filter
    start_date, end_date = "01-02-2023", "31-05-2023"
    expected_output = {'bank': 'GXS', 'start_date': '01-02-2023', 'end_date': '31-05-2023', 'topic_sentiments': {'service': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, 'interface': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}}
    actual_output = data_manager.get_topic_sentiments(data=gxs_data_time_filtered_3_months, start_date=start_date, end_date=end_date, bank="GXS")
    assert actual_output == expected_output


def test_monthly_avg_rating_retrieval_gxs_date_filtered(data_manager, gxs_data_time_filtered_5_months):
    # Test for GXS data with date filter
    start_date, end_date = datetime.strptime("01-02-2023", "%d-%m-%Y").date(), datetime.strptime("31-07-2023", "%d-%m-%Y").date()
    expected_output = {'bank': 'GXS', 'ratings': [{'period': 'February 2023', 'rating': 5.0}, {'period': 'March 2023', 'rating': 5.0}, {'period': 'April 2023', 'rating': 5.0}, {'period': 'May 2023', 'rating': None}, {'period': 'June 2023', 'rating': None}, {'period': 'July 2023', 'rating': 3.5}], 'total_rating': 4.4}
    actual_output = data_manager.get_monthly_avg_rating(data=gxs_data_time_filtered_5_months, start_date=start_date, end_date=end_date, bank="GXS", topic=None)
    assert actual_output == expected_output


def test_monthly_avg_rating_retrieval_gxs_date_topic_filtered(data_manager, gxs_data_time_filtered_5_months_interface):
    # Test for GXS data with date filter and topic
    start_date, end_date = datetime.strptime("01-02-2023", "%d-%m-%Y").date(), datetime.strptime("31-07-2023", "%d-%m-%Y").date()
    expected_output = {'bank': 'GXS', 'ratings': [{'period': 'February 2023', 'rating': None}, {'period': 'March 2023', 'rating': None}, {'period': 'April 2023', 'rating': 5.0}, {'period': 'May 2023', 'rating': None}, {'period': 'June 2023', 'rating': None}, {'period': 'July 2023', 'rating': 5.0}], 'total_rating': 5.0, 'topic': 'interface'}
    actual_output = data_manager.get_monthly_avg_rating(data=gxs_data_time_filtered_5_months_interface, start_date=start_date, end_date=end_date, bank="GXS", topic="interface")
    assert actual_output == expected_output


def test_weekly_avg_rating_retrieval_gxs_date_filtered(data_manager):
    # Test for GXS data with date filter
    sorted_ratings = [{'period': '29 May 2023 - 04 June 2023', 'rating': None}, {'period': '22 May 2023 - 28 May 2023', 'rating': None}, {'period': '15 May 2023 - 21 May 2023', 'rating': None}, {'period': '08 May 2023 - 14 May 2023', 'rating': None}, {'period': '01 May 2023 - 07 May 2023', 'rating': None}, {'period': '24 April 2023 - 30 April 2023', 'rating': None}, {'period': '17 April 2023 - 23 April 2023', 'rating': None}, {'period': '10 April 2023 - 16 April 2023', 'rating': None}, {'period': '03 April 2023 - 09 April 2023', 'rating': None}, {'period': '27 March 2023 - 02 April 2023', 'rating': 5.0}, {'period': '20 March 2023 - 26 March 2023', 'rating': None}, {'period': '13 March 2023 - 19 March 2023', 'rating': None}, {'period': '06 March 2023 - 12 March 2023', 'rating': None}, {'period': '27 February 2023 - 05 March 2023', 'rating': 5.0}, {'period': '20 February 2023 - 26 February 2023', 'rating': None}, {'period': '13 February 2023 - 19 February 2023', 'rating': None}, {'period': '06 February 2023 - 12 February 2023', 'rating': None}, {'period': '30 January 2023 - 05 February 2023', 'rating': 5.0}]
    all_summed_ratings = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [5, 1], [0, 0], [0, 0], [0, 0], [5, 1], [0, 0], [0, 0], [0, 0], [5, 1]]
    expected_output = {'bank': 'GXS', 'ratings': [{'period': '30 January 2023 - 05 February 2023', 'rating': 5.0}, {'period': '06 February 2023 - 12 February 2023', 'rating': None}, {'period': '13 February 2023 - 19 February 2023', 'rating': None}, {'period': '20 February 2023 - 26 February 2023', 'rating': None}, {'period': '27 February 2023 - 05 March 2023', 'rating': 5.0}, {'period': '06 March 2023 - 12 March 2023', 'rating': None}, {'period': '13 March 2023 - 19 March 2023', 'rating': None}, {'period': '20 March 2023 - 26 March 2023', 'rating': None}, {'period': '27 March 2023 - 02 April 2023', 'rating': 5.0}, {'period': '03 April 2023 - 09 April 2023', 'rating': None}, {'period': '10 April 2023 - 16 April 2023', 'rating': None}, {'period': '17 April 2023 - 23 April 2023', 'rating': None}, {'period': '24 April 2023 - 30 April 2023', 'rating': None}, {'period': '01 May 2023 - 07 May 2023', 'rating': None}, {'period': '08 May 2023 - 14 May 2023', 'rating': None}, {'period': '15 May 2023 - 21 May 2023', 'rating': None}, {'period': '22 May 2023 - 28 May 2023', 'rating': None}, {'period': '29 May 2023 - 04 June 2023', 'rating': None}], 'total_rating': 5.0}
    actual_output = data_manager.get_weekly_avg_rating(sorted_ratings=sorted_ratings, all_summed_ratings=all_summed_ratings, bank="GXS", topic=None)
    assert actual_output == expected_output


def test_weekly_avg_rating_retrieval_gxs_date_topic_filtered(data_manager):
    # Test for GXS data with date filter and topic
    sorted_ratings = [{'period': '29 May 2023 - 04 June 2023', 'rating': None}, {'period': '22 May 2023 - 28 May 2023', 'rating': None}, {'period': '15 May 2023 - 21 May 2023', 'rating': None}, {'period': '08 May 2023 - 14 May 2023', 'rating': None}, {'period': '01 May 2023 - 07 May 2023', 'rating': None}, {'period': '24 April 2023 - 30 April 2023', 'rating': None}, {'period': '17 April 2023 - 23 April 2023', 'rating': None}, {'period': '10 April 2023 - 16 April 2023', 'rating': None}, {'period': '03 April 2023 - 09 April 2023', 'rating': None}, {'period': '27 March 2023 - 02 April 2023', 'rating': 5.0}, {'period': '20 March 2023 - 26 March 2023', 'rating': None}, {'period': '13 March 2023 - 19 March 2023', 'rating': None}, {'period': '06 March 2023 - 12 March 2023', 'rating': None}, {'period': '27 February 2023 - 05 March 2023', 'rating': None}, {'period': '20 February 2023 - 26 February 2023', 'rating': None}, {'period': '13 February 2023 - 19 February 2023', 'rating': None}, {'period': '06 February 2023 - 12 February 2023', 'rating': None}, {'period': '30 January 2023 - 05 February 2023', 'rating': None}]
    all_summed_ratings = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [5, 1], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    expected_output = {'bank': 'GXS', 'ratings': [{'period': '30 January 2023 - 05 February 2023', 'rating': None}, {'period': '06 February 2023 - 12 February 2023', 'rating': None}, {'period': '13 February 2023 - 19 February 2023', 'rating': None}, {'period': '20 February 2023 - 26 February 2023', 'rating': None}, {'period': '27 February 2023 - 05 March 2023', 'rating': None}, {'period': '06 March 2023 - 12 March 2023', 'rating': None}, {'period': '13 March 2023 - 19 March 2023', 'rating': None}, {'period': '20 March 2023 - 26 March 2023', 'rating': None}, {'period': '27 March 2023 - 02 April 2023', 'rating': 5.0}, {'period': '03 April 2023 - 09 April 2023', 'rating': None}, {'period': '10 April 2023 - 16 April 2023', 'rating': None}, {'period': '17 April 2023 - 23 April 2023', 'rating': None}, {'period': '24 April 2023 - 30 April 2023', 'rating': None}, {'period': '01 May 2023 - 07 May 2023', 'rating': None}, {'period': '08 May 2023 - 14 May 2023', 'rating': None}, {'period': '15 May 2023 - 21 May 2023', 'rating': None}, {'period': '22 May 2023 - 28 May 2023', 'rating': None}, {'period': '29 May 2023 - 04 June 2023', 'rating': None}], 'total_rating': 5.0, 'topic': 'interface'}
    actual_output = data_manager.get_weekly_avg_rating(sorted_ratings=sorted_ratings, all_summed_ratings=all_summed_ratings, bank="GXS", topic="interface")
    assert actual_output == expected_output


def test_monthly_avg_sentiment_retrieval_gxs_date_filtered(data_manager, gxs_data_time_filtered_5_months):
    # Test for GXS data with date filter
    start_date, end_date = datetime.strptime("01-02-2023", "%d-%m-%Y").date(), datetime.strptime("31-07-2023", "%d-%m-%Y").date()
    expected_output = {'bank': 'GXS', 'sentiments': [{'period': 'February 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': 'March 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': 'April 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': 'May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': 'June 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': 'July 2023', 'sentiment': {'Positive': 0.5, 'Neutral': 0.0, 'Negative': 0.5}}], 'total_sentiments': {'Positive': 0.8, 'Neutral': 0.0, 'Negative': 0.2}}
    actual_output = data_manager.get_monthly_avg_sentiment(data=gxs_data_time_filtered_5_months, start_date=start_date, end_date=end_date, bank="GXS", topic=None)
    assert actual_output == expected_output


def test_monthly_avg_sentiment_retrieval_gxs_date_topic_filtered(data_manager, gxs_data_time_filtered_5_months_interface):
    # Test for GXS data with date filter and topic
    start_date, end_date = datetime.strptime("01-02-2023", "%d-%m-%Y").date(), datetime.strptime("31-07-2023", "%d-%m-%Y").date()
    expected_output = {'bank': 'GXS', 'sentiments': [{'period': 'February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': 'March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': 'April 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': 'May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': 'June 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': 'July 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}], 'total_sentiments': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, 'topic': 'interface'}
    actual_output = data_manager.get_monthly_avg_sentiment(data=gxs_data_time_filtered_5_months_interface, start_date=start_date, end_date=end_date, bank="GXS", topic="interface")
    assert actual_output == expected_output


def test_weekly_avg_sentiment_retrieval_gxs_date_filtered(data_manager):
    # Test for GXS data with date filter
    sorted_sentiments = [{'period': '29 May 2023 - 04 June 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '22 May 2023 - 28 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '15 May 2023 - 21 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '08 May 2023 - 14 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '01 May 2023 - 07 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '24 April 2023 - 30 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '17 April 2023 - 23 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '10 April 2023 - 16 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '03 April 2023 - 09 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 March 2023 - 02 April 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '20 March 2023 - 26 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 March 2023 - 19 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '06 March 2023 - 12 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 February 2023 - 05 March 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '20 February 2023 - 26 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 February 2023 - 19 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '06 February 2023 - 12 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '30 January 2023 - 05 February 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}]
    all_summed_sentiments = [{'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}]
    expected_output = {'bank': 'GXS', 'sentiments': [{'period': '30 January 2023 - 05 February 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '06 February 2023 - 12 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 February 2023 - 19 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '20 February 2023 - 26 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 February 2023 - 05 March 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '06 March 2023 - 12 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 March 2023 - 19 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '20 March 2023 - 26 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 March 2023 - 02 April 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '03 April 2023 - 09 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '10 April 2023 - 16 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '17 April 2023 - 23 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '24 April 2023 - 30 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '01 May 2023 - 07 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '08 May 2023 - 14 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '15 May 2023 - 21 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '22 May 2023 - 28 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '29 May 2023 - 04 June 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}], 'total_sentiments': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}
    actual_output = data_manager.get_weekly_avg_sentiment(sorted_sentiments=sorted_sentiments, all_summed_sentiments=all_summed_sentiments, bank="GXS", topic=None)
    assert actual_output == expected_output


def test_weekly_avg_sentiment_retrieval_gxs_date_topic_filtered(data_manager):
    # Test for GXS data with date filter and topic
    sorted_sentiments = [{'period': '29 May 2023 - 04 June 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '22 May 2023 - 28 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '15 May 2023 - 21 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '08 May 2023 - 14 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '01 May 2023 - 07 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '24 April 2023 - 30 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '17 April 2023 - 23 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '10 April 2023 - 16 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '03 April 2023 - 09 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 March 2023 - 02 April 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '20 March 2023 - 26 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 March 2023 - 19 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '06 March 2023 - 12 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 February 2023 - 05 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '20 February 2023 - 26 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 February 2023 - 19 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '06 February 2023 - 12 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '30 January 2023 - 05 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}]
    all_summed_sentiments = [{'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}, {'Positive': 0, 'Neutral': 0, 'Negative': 0}]
    expected_output = {'bank': 'GXS', 'sentiments': [{'period': '30 January 2023 - 05 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '06 February 2023 - 12 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 February 2023 - 19 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '20 February 2023 - 26 February 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 February 2023 - 05 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '06 March 2023 - 12 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '13 March 2023 - 19 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '20 March 2023 - 26 March 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '27 March 2023 - 02 April 2023', 'sentiment': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}}, {'period': '03 April 2023 - 09 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '10 April 2023 - 16 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '17 April 2023 - 23 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '24 April 2023 - 30 April 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '01 May 2023 - 07 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '08 May 2023 - 14 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '15 May 2023 - 21 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '22 May 2023 - 28 May 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}, {'period': '29 May 2023 - 04 June 2023', 'sentiment': {'Positive': 0, 'Neutral': 0, 'Negative': 0}}], 'total_sentiments': {'Positive': 1.0, 'Neutral': 0.0, 'Negative': 0.0}, 'topic': 'interface'}
    actual_output = data_manager.get_weekly_avg_sentiment(sorted_sentiments=sorted_sentiments, all_summed_sentiments=all_summed_sentiments, bank="GXS", topic="interface")
    assert actual_output == expected_output


def test_word_associations_retrieval_gxs_filtered(data_manager, gxs_data):
    # Test for GXS data
    expected_output = {'bank': 'GXS', 'start_date': None, 'end_date': None, 'associations': {'service': [('service', 4), ('convenient', 2), ('satisfied', 1), ('reliable', 1), ('recommended', 1)], 'interface': [('user-friendly', 7), ('efficient', 7), ('great', 6), ('smooth', 2), ('issues', 2)], 'features': [('expectations', 4), ('crucial', 4), ('below', 4)], 'transaction': [('transactions', 1), ('time', 1), ('smooth', 1)]}}
    actual_output = data_manager.get_word_associations(data=gxs_data, start_date=None, end_date=None, bank="GXS")
    assert actual_output == expected_output


def test_word_associations_retrieval_gxs_date_filtered(data_manager, gxs_data_time_filtered_5_months):
    # Test for GXS data with date filter
    expected_output = {'bank': 'GXS', 'start_date': '01-02-2023', 'end_date': '31-07-2023', 'associations': {'service': [('service', 1), ('reliable', 1), ('recommended', 1), ('experience', 1), ('efficient', 1)], 'interface': [('user-friendly', 1), ('reliable', 1), ('great', 1), ('fast', 1), ('excellent', 1)], 'features': [('expectations', 1), ('crucial', 1), ('below', 1)]}}
    actual_output = data_manager.get_word_associations(data=gxs_data_time_filtered_5_months, start_date="01-02-2023", end_date="31-07-2023", bank="GXS")
    assert actual_output == expected_output


def test_review_count_retrieval_gxs_filtered(data_manager, gxs_data):
    # Test for GXS data
    expected_output = {'start_date': None, 'end_date': None, 'bank': 'GXS', 'count': 22}
    actual_output = data_manager.get_review_counts(data=gxs_data, start_date=None, end_date=None, bank="GXS")
    assert actual_output == expected_output


def test_review_count_retrieval_gxs_date_filtered(data_manager, gxs_data_time_filtered_5_months):
    # Test for GXS data with date filter
    expected_output = {'start_date': '01-02-2023', 'end_date': '31-07-2023', 'bank': 'GXS', 'count': 5}
    actual_output = data_manager.get_review_counts(data=gxs_data_time_filtered_5_months, start_date="01-02-2023", end_date="31-07-2023", bank="GXS")
    assert actual_output == expected_output


def test_donut_data_retrieval_gxs_date_filtered(data_manager, gxs_data_time_filtered_5_months):
    expected_output = [{'name': 'Positive', 'value': 0.8, 'color': 'teal.6', 'start_date': '01-02-2023', 'end_date': '31-07-2023'}, {'name': 'Neutral', 'value': 0.0, 'color': 'yellow.6', 'start_date': '01-02-2023', 'end_date': '31-07-2023'}, {'name': 'Negative', 'value': 0.2, 'color': 'red.6', 'start_date': '01-02-2023', 'end_date': '31-07-2023'}]
    actual_output = data_manager.get_donut_data(data=gxs_data_time_filtered_5_months, start_date="01-02-2023", end_date="31-07-2023")
    assert actual_output == expected_output
