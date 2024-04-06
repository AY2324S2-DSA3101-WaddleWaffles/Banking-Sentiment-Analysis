from database.database_pipeline import DataManager
from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

import calendar
import os

app = Flask(__name__)
CORS(app)

# Load variables from .env file
load_dotenv()

# Access the loaded variables
db_user, db_pass = os.getenv("DATABASE_USERNAME"), os.getenv("DATABASE_PASSWORD")

data_manager = DataManager(db_user, db_pass)

@app.route("/latest-day", methods=["GET"])
def get_latest_day():
    return jsonify({"latest_day": str(datetime.now().date())})

@app.route("/reviews/topics", methods=["GET"])
def get_all_topics():
    topics = {"topics": list(set(map(lambda x: x["topic"], data_manager.retrieve_sample_reviews())))}
    return jsonify(topics)

@app.route("/reviews/topics-sentiment", methods=["GET"])
def get_sentiment_by_topic():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()

    results = []
    for bank in banks:
        reviews = data_manager.retrieve_sample_reviews(start_date=start_date, end_date=end_date, bank=bank)
        result = {}
        topic_sentiments = {}
        for review in reviews:
            topic, sentiment = review["topic"], review["sentiment"]
            topic_sentiments[topic] = topic_sentiments.get(topic, {"Positive": 0, "Neutral": 0, "Negative": 0})
            topic_sentiments[topic][sentiment] += 1
        
        for topic in topic_sentiments:
            review_count = sum(topic_sentiments[topic].values())
            topic_sentiments[topic] = {sentiment: round(amount / review_count, 3) for sentiment, amount in topic_sentiments[topic].items()}
        result["bank"] = bank
        result["start_date"] = start_date
        result["end_date"] = end_date
        result["topic_sentiments"] = topic_sentiments
        results.append(result)
    
    return jsonify(results)

@app.route("/reviews/average-rating", methods=["GET"])
def get_average_rating(num_months=None):
    start_date = datetime.strptime(request.args.get("start-date") or "08-01-2022", "%d-%m-%Y").date()
    end_date = datetime.strptime(request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y"), "%d-%m-%Y").date()
    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()

    if num_months:
        latest_day = datetime.now().date()
        deducted_date = latest_day - relativedelta(months=num_months)
        earliest_date = date(deducted_date.year, deducted_date.month, 1)
    else:
        delta = relativedelta(end_date, start_date)
        num_months = delta.years * 12 + delta.months
        latest_day = end_date
        earliest_date = start_date

    results = []

    if num_months > 3:
        for bank in banks:
            result = {}
            avg_ratings = {"total": [0, 0]}
            reviews = data_manager.retrieve_sample_reviews(start_date=date(earliest_date.year, earliest_date.month, 1).strftime("%d-%m-%Y"), end_date=latest_day.strftime("%d-%m-%Y"), bank=bank)
            for review in reviews:
                month_year = f"{calendar.month_name[review["month"]]} {review["year"]}"
                avg_ratings[month_year] = avg_ratings.get(month_year, [0, 0])
                avg_ratings[month_year][0] += review["rating"]
                avg_ratings[month_year][1] += 1
                avg_ratings["total"][0] += review["rating"]
                avg_ratings["total"][1] += 1

            for rating_period in avg_ratings:
                summed_rating, count = avg_ratings[rating_period]
                avg_ratings[rating_period] = round(summed_rating / count, 3)

            result["bank"] = bank
            result["average_ratings"] = avg_ratings
            results.append(result)
        
        return jsonify(results)
    
    for bank in banks:
        # Get the closest Sunday
        tracked_date = latest_day - relativedelta(days=(latest_day.weekday() + 1) if latest_day.weekday() != 6 else 0)
        result = {}
        avg_ratings = {"total": [0, 0]}
        while earliest_date <= tracked_date:
            monday_date = tracked_date - relativedelta(days=6)
            date_string = f"{monday_date.strftime("%d %B %Y")} - {tracked_date.strftime("%d %B %Y")}"
            reviews = data_manager.retrieve_sample_reviews(start_date=monday_date.strftime("%d-%m-%Y"), end_date=tracked_date.strftime("%d-%m-%Y"), bank=bank)
            for review in reviews:
                avg_ratings[date_string] = avg_ratings.get(date_string, [0, 0])
                avg_ratings[date_string][0] += review["rating"]
                avg_ratings[date_string][1] += 1
                avg_ratings["total"][0] += review["rating"]
                avg_ratings["total"][1] += 1
            
            tracked_date = monday_date - relativedelta(days=1)

        for rating_period in avg_ratings:
            summed_rating, count = avg_ratings[rating_period]
            avg_ratings[rating_period] = round(summed_rating / count, 3)
        
        result["bank"] = bank
        result["average_ratings"] = avg_ratings
        results.append(result)

    return jsonify(results)

@app.route("/reviews/latest-average-rating", methods=["GET"])
def get_latest_average_rating():
    num_months = int(request.args.get("months-count") or 99)
    return get_average_rating(num_months)

@app.route("/reviews/average-sentiment", methods=["GET"])
def get_average_sentiment():
    start_date = datetime.strptime(request.args.get("start-date") or "08-01-2022", "%d-%m-%Y").date()
    end_date = datetime.strptime(request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y"), "%d-%m-%Y").date()
    delta = relativedelta(end_date, start_date)
    num_months = delta.years * 12 + delta.months
    latest_day = end_date
    earliest_date = start_date

    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()

    results = []

    if num_months > 3:
        for bank in banks:
            result = {}
            sentiments = {"total": {"Positive": 0, "Neutral": 0, "Negative": 0}}
            reviews = data_manager.retrieve_sample_reviews(start_date=date(earliest_date.year, earliest_date.month, 1).strftime("%d-%m-%Y"), end_date=latest_day.strftime("%d-%m-%Y"), bank=bank)
            for review in reviews:
                month_year = f"{calendar.month_name[review["month"]]} {review["year"]}"
                sentiments[month_year] = sentiments.get(month_year, {"Positive": 0, "Neutral": 0, "Negative": 0})
                sentiments[month_year][review["sentiment"]] += 1
                sentiments["total"][review["sentiment"]] += 1

            for sentiment_period in sentiments:
                count = sum(sentiments[sentiment_period].values())
                sentiments[sentiment_period] = {period: round(amount / count, 3) for period, amount in sentiments[sentiment_period].items()}

            result["bank"] = bank
            result["sentiments"] = sentiments
            results.append(result)
        
        return jsonify(results)
    
    for bank in banks:
        # Get the closest Sunday
        tracked_date = latest_day - relativedelta(days=(latest_day.weekday() + 1) if latest_day.weekday() != 6 else 0)
        result = {}
        sentiments = {"total": {"Positive": 0, "Neutral": 0, "Negative": 0}}
        while earliest_date <= tracked_date:
            monday_date = tracked_date - relativedelta(days=6)
            date_string = f"{monday_date.strftime("%d %B %Y")} - {tracked_date.strftime("%d %B %Y")}"
            reviews = data_manager.retrieve_sample_reviews(start_date=monday_date.strftime("%d-%m-%Y"), end_date=tracked_date.strftime("%d-%m-%Y"), bank=bank)
            for review in reviews:
                sentiments[date_string] = sentiments.get(date_string, {"Positive": 0, "Neutral": 0, "Negative": 0})
                sentiments[date_string][review["sentiment"]] += 1
                sentiments["total"][review["sentiment"]] += 1
            
            tracked_date = monday_date - relativedelta(days=1)

        for sentiment_period in sentiments:
            count = sum(sentiments[sentiment_period].values())
            sentiments[sentiment_period] = {period: round(amount / count, 3) for period, amount in sentiments[sentiment_period].items()}
        
        result["bank"] = bank
        result["sentiments"] = sentiments
        results.append(result)

    return jsonify(results)

@app.route("/reviews/word-associations", methods=["GET"])
def get_word_associations():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()

    results = []
    for bank in banks:
        reviews = data_manager.retrieve_sample_reviews(start_date=start_date, end_date=end_date, bank=bank)
        result = {}
        associations = {}
        for review in reviews:
            topic = review["topic"]
            asssociation_words = review["associations"]
            if topic not in associations:
                associations[topic] = {}

            for word in asssociation_words:
                associations[topic][word] = associations[topic].get(word, 0) + 1

        for topic in associations:
            top_associations = sorted(associations[topic].items(), key=lambda x: x[1], reverse=True)[:5]
            associations[topic] = top_associations
        
        result["bank"] = bank
        result["start_date"] = start_date
        result["end_date"] = end_date
        result["associations"] = associations
        results.append(result)

    return jsonify(results)

@app.route("/reviews/counts", methods=["GET"])
def get_review_counts():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()

    results = []

    for bank in banks:
        reviews = data_manager.retrieve_sample_reviews(start_date=start_date, end_date=end_date, bank=bank)
        review_counts = len(reviews)
        results.append({"start_date": start_date, "end_date": end_date, "bank": bank, "count":review_counts})
    
    return results

@app.route("/reviews/recommendation", methods=["GET"])
def generate_recommendation():
    return jsonify({"recommendation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "\
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "\
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})

@app.route("/reviews/insights", methods=["GET"])
def generate_insights():
    return jsonify({"insights": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "\
                    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "\
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."})

@app.route("/reviews/donut-chart-data", methods=["GET"])
def get_donut_chart_data():
    bank = request.args.get("bank") or "GXS"

    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    if not start_date and not end_date:
        start_date = (datetime.now().date() - relativedelta(months=3)).strftime("%d-%m-%Y")
    
    reviews = data_manager.retrieve_sample_reviews(start_date=start_date, end_date=end_date, bank=bank)

    sentiments = {"Positive": 0, "Neutral": 0, "Negative": 0}
    for review in reviews:
        sentiment = review["sentiment"]
        sentiments[sentiment] += 1

    total_count = sum(sentiments.values())
    for sentiment in sentiments:
        sentiments[sentiment] = round(sentiments[sentiment] / total_count, 3)

    colour = {"Positive": "teal.6", "Neutral": "yellow.6", "Negative": "red.6"}
    data = []
    for sentiment, percentage in sentiments.items():
        data.append({"name": sentiment, "value": percentage, "color": colour[sentiment], "start_date": start_date, "end_date": end_date})
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001)
