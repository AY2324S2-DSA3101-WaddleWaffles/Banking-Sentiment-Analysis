from cache.cache_client import CacheClient
from database.database_pipeline import DataManager
from database.database_updater import DatabaseUpdater
from data_processor.data_processor import DataProcessor
from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from inquirer.inquirer import Inquirer

import json
import os

app = Flask(__name__)
CORS(app)

# Load variables from .env file
load_dotenv()

# Access the loaded variables
db_user, db_pass, h2o_api = os.getenv("DATABASE_USERNAME"), os.getenv("DATABASE_PASSWORD"), os.getenv("H2O_API_KEY")

data_manager = DataManager(db_user, db_pass)
inquirer = Inquirer(h2o_api)
data_processor = DataProcessor()
database_updater = DatabaseUpdater(data_manager)
cache = CacheClient()

@app.route("/latest-day", methods=["GET"])
def get_latest_day():
    timings = [data_manager.retrieve_miscellaneous(store, "datetime")["latestdate"] for store in ["appstore", "playstore"]]
    date_objects = [datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S") for date_str in timings]
    latest_date = max(date_objects)
    formatted_latest_date = latest_date.strftime("%d %B %Y")
    return jsonify({"latest_day": formatted_latest_date})

@app.route("/update-database", methods=["GET"])
def update_database():
    return jsonify({"status": database_updater.update_database()})

@app.route("/reviews/topics", methods=["GET"])
def get_all_topics():
    reviews = data_manager.retrieve_reviews()
    topics = data_processor.get_topics(reviews)
    return jsonify(topics)

@app.route("/reviews", methods=["GET"])
def get_reviews():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_banks()

    cache_key = cache.generate_key("reviews", [start_date, end_date, banks])
    reviews = cache.retrieve(cache_key)
    if reviews:
        return jsonify(reviews)

    reviews = []
    for bank in banks:
        reviews.extend(data_manager.retrieve_reviews(start_date=start_date, end_date=end_date, bank=bank))
    reviews = data_processor.clear_nan(reviews)

    cache.update(cache_key, reviews)
    return jsonify(reviews)

@app.route("/reviews/topics-sentiment", methods=["GET"])
def get_sentiment_by_topic():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_banks()

    cache_key = cache.generate_key("reviews/topics-sentiment", [start_date, end_date, banks])
    all_topic_sentiments = cache.retrieve(cache_key)
    if all_topic_sentiments:
        return jsonify(all_topic_sentiments)

    all_topic_sentiments = []
    for bank in banks:
        reviews = data_manager.retrieve_reviews(start_date=start_date, end_date=end_date, bank=bank)
        topic_sentiments = data_processor.get_topic_sentiments(reviews, start_date, end_date, bank)
        all_topic_sentiments.append(topic_sentiments)

    cache.update(cache_key, all_topic_sentiments)
    return jsonify(all_topic_sentiments)

@app.route("/reviews/average-rating", methods=["GET"])
def get_average_rating(num_months=None):
    start_date = datetime.strptime(request.args.get("start-date") or "01-08-2022", "%d-%m-%Y").date()
    end_date = datetime.strptime(request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y"), "%d-%m-%Y").date()
    banks = request.args.getlist("bank") or data_manager.retrieve_banks()
    topic = request.args.get("topic")

    cache_key = cache.generate_key("reviews/average-rating", [start_date, end_date, banks, topic, num_months])
    all_avg_rating = cache.retrieve(cache_key)
    if all_avg_rating:
        return jsonify(all_avg_rating)
    
    if num_months:
        end_date = datetime.now().date()
        deducted_date = end_date - relativedelta(months=num_months)
        start_date = date(deducted_date.year, deducted_date.month, 1)
    else:
        delta = relativedelta(end_date, start_date)
        num_months = delta.years * 12 + delta.months

    all_avg_rating = []

    for bank in banks:
        if num_months > 3:
            reviews = data_manager.retrieve_reviews(start_date=date(start_date.year, start_date.month, 1).strftime("%d-%m-%Y"), end_date=end_date.strftime("%d-%m-%Y"), bank=bank, topic=topic)
            avg_rating = data_processor.get_monthly_avg_rating(reviews, start_date, end_date, bank, topic)
            all_avg_rating.append(avg_rating)
        else:    
            # Get the coming Sunday
            tracked_date = end_date + relativedelta(days=(6 - end_date.weekday()) if end_date.weekday() != 6 else 0)
            sorted_ratings = []
            all_summed_ratings = []
            while start_date <= tracked_date:
                monday_date = tracked_date - relativedelta(days=6)
                reviews = data_manager.retrieve_reviews(start_date=monday_date.strftime("%d-%m-%Y"), end_date=tracked_date.strftime("%d-%m-%Y"), bank=bank, topic=topic)
                partial_avg_rating, summed_rating = data_processor.aggregate_weekly_avg_rating(reviews, monday_date, tracked_date)
                
                sorted_ratings.append(partial_avg_rating)
                all_summed_ratings.append(summed_rating)
                tracked_date = monday_date - relativedelta(days=1)

            avg_rating = data_processor.get_weekly_avg_rating(sorted_ratings, all_summed_ratings, bank, topic)
            all_avg_rating.append(avg_rating)

    cache.update(cache_key, all_avg_rating)
    return jsonify(all_avg_rating)

@app.route("/reviews/latest-average-rating", methods=["GET"])
def get_latest_average_rating():
    end_date = datetime(2022, 8, 1)
    num_months = int(request.args.get("months-count") or (datetime.today().year - end_date.year) * 12 + (datetime.today().month - end_date.month))

    cache_key = cache.generate_key("/reviews/latest-average-rating", [num_months])
    output = cache.retrieve(cache_key)
    if output:
        return output
    
    output = get_average_rating(num_months)
    cache.update(cache_key, output)
    return output

@app.route("/reviews/average-sentiment", methods=["GET"])
def get_average_sentiment():
    start_date = datetime.strptime(request.args.get("start-date") or "01-08-2022", "%d-%m-%Y").date()
    end_date = datetime.strptime(request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y"), "%d-%m-%Y").date()
    delta = relativedelta(end_date, start_date)
    num_months = delta.years * 12 + delta.months
    latest_day = end_date
    earliest_date = start_date

    banks = request.args.getlist("bank") or data_manager.retrieve_banks()
    topic = request.args.get("topic")

    cache_key = cache.generate_key("reviews/average-sentiment", [start_date, end_date, banks, topic, num_months])
    all_avg_sentiment = cache.retrieve(cache_key)
    if all_avg_sentiment:
        return jsonify(all_avg_sentiment)

    all_avg_sentiment = []

    for bank in banks:
        if num_months > 3:
            reviews = data_manager.retrieve_reviews(start_date=date(earliest_date.year, earliest_date.month, 1).strftime("%d-%m-%Y"), end_date=latest_day.strftime("%d-%m-%Y"), bank=bank, topic=topic)
            avg_sentiment = data_processor.get_monthly_avg_sentiment(reviews, start_date, end_date, bank, topic)
            all_avg_sentiment.append(avg_sentiment)
        
        else:    
            # Get the coming Sunday
            tracked_date = latest_day + relativedelta(days=(6 - latest_day.weekday()) if latest_day.weekday() != 6 else 0)
            sorted_sentiments = []
            all_summed_sentiments = []
            while earliest_date <= tracked_date:
                monday_date = tracked_date - relativedelta(days=6)
                reviews = data_manager.retrieve_reviews(start_date=monday_date.strftime("%d-%m-%Y"), end_date=tracked_date.strftime("%d-%m-%Y"), bank=bank, topic=topic)
                partial_avg_sentiment, summed_sentiment = data_processor.aggregate_weekly_avg_sentiment(reviews, monday_date, tracked_date)
                
                sorted_sentiments.append(partial_avg_sentiment)
                all_summed_sentiments.append(summed_sentiment)
                tracked_date = monday_date - relativedelta(days=1)

            avg_sentiment = data_processor.get_weekly_avg_sentiment(sorted_sentiments, all_summed_sentiments, bank, topic)
            all_avg_sentiment.append(avg_sentiment)

    cache.update(cache_key, all_avg_sentiment)
    return jsonify(all_avg_sentiment)

@app.route("/reviews/word-associations", methods=["GET"])
def get_word_associations():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_banks()

    cache_key = cache.generate_key("reviews/word-associations", [start_date, end_date, banks])
    all_word_assocs = cache.retrieve(cache_key)
    if all_word_assocs:
        return jsonify(all_word_assocs)

    all_word_assocs = []
    for bank in banks:
        reviews = data_manager.retrieve_reviews(start_date=start_date, end_date=end_date, bank=bank)
        word_assocs = data_processor.get_word_associations(reviews, start_date, end_date, bank)
        all_word_assocs.append(word_assocs)

    cache.update(cache_key, all_word_assocs)
    return jsonify(all_word_assocs)

@app.route("/reviews/counts", methods=["GET"])
def get_review_counts():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_banks()

    cache_key = cache.generate_key("reviews/counts", [start_date, end_date, banks])
    all_counts = cache.retrieve(cache_key)
    if all_counts:
        return jsonify(all_counts)

    all_counts = []

    for bank in banks:
        reviews = data_manager.retrieve_reviews(start_date=start_date, end_date=end_date, bank=bank)
        counts = data_processor.get_review_counts(reviews, start_date, end_date, bank)
        all_counts.append(counts)

    cache.update(cache_key, all_counts)
    return jsonify(all_counts)

@app.route("/reviews/insights", methods=["GET"])
def generate_insights():
    start_date = request.args.get("start-date") or "01-08-2022"
    end_date = request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y")
    request_args = {
        "start-date": start_date,
        "end-date": end_date,
        "bank": "GXS",
        "topic": None
    }
    
    cache_key = cache.generate_key("reviews/insights", [start_date, end_date])
    insights = cache.retrieve(cache_key)
    if insights:
        return jsonify({"insights": insights})

    topics = get_all_topics().get_json()["topics"]
    topics_data = {}
    with app.test_request_context('/reviews/average-rating', query_string=request_args):
        general_data = get_average_rating().get_json()

    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = get_average_rating().get_json()
            topics_data[topic] = topic_data
    
    insights = inquirer.get_insights(general_data=general_data, topics_data=topics_data)
    cache.update(cache_key, insights)
    return jsonify({"insights": insights})

@app.route("/reviews/comparison", methods=["GET"])
def generate_comparison():
    start_date = request.args.get("start-date") or "01-08-2022"
    end_date = request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y")
    compared_bank = request.args.get("compared-bank")
    request_args = {
        "start-date": start_date,
        "end-date": end_date,
        "bank": "GXS",
        "topic": None
    }
    
    cache_key = cache.generate_key("reviews/comparison", [start_date, end_date, compared_bank])
    comparison = cache.retrieve(cache_key)
    if comparison:
        return jsonify({"comparison": comparison})

    topics = get_all_topics().get_json()["topics"]
    gxs_topics_data = {}
    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = get_average_rating().get_json()
            gxs_topics_data[topic] = topic_data

    request_args["bank"] = compared_bank
    other_bank_topics_data = {}
    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = get_average_rating().get_json()
            other_bank_topics_data[topic] = topic_data
        
    comparison = inquirer.get_comparison(gxs_topics_data=gxs_topics_data, other_bank=compared_bank, other_bank_topics_data=other_bank_topics_data)
    cache.update(cache_key, comparison)
    return jsonify({"comparison": comparison})

@app.route("/reviews/suggestions", methods=["GET"])
def generate_suggestions():
    start_date = request.args.get("start-date") or "01-08-2022"
    end_date = request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y")
    request_args = {
        "start-date": start_date,
        "end-date": end_date,
        "bank": "GXS",
        "topic": None
    }
    
    cache_key = cache.generate_key("reviews/suggestions", [start_date, end_date])
    suggestions = cache.retrieve(cache_key)
    if suggestions:
        return jsonify({"suggestions": suggestions})

    topics = get_all_topics().get_json()["topics"]
    topics_data = {}

    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = get_average_rating().get_json()
            topics_data[topic] = topic_data
    
    suggestions = inquirer.get_suggestions(topics_data=topics_data)
    cache.update(cache_key, suggestions)
    return jsonify({"suggestions": suggestions})

@app.route("/reviews/donut-chart-data", methods=["GET"])
def get_donut_chart_data():
    bank = request.args.get("bank") or "GXS"

    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    if not start_date and not end_date:
        start_date = (datetime.now().date() - relativedelta(months=3)).strftime("%d-%m-%Y")
    
    cache_key = cache.generate_key("reviews/donut-chart-data", [start_date, end_date])
    data = cache.retrieve(cache_key)
    if data:
        return jsonify(data)

    reviews = data_manager.retrieve_reviews(start_date=start_date, end_date=end_date, bank=bank)
    data = data_processor.get_donut_data(reviews, start_date, end_date)

    cache.update(cache_key, data)
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001)
