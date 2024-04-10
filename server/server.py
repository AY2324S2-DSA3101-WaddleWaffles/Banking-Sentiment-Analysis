from database.database_pipeline import DataManager
from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from inquirer.inquirer import Inquirer

import calendar
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

@app.route("/latest-day", methods=["GET"])
def get_latest_day():
    return jsonify({"latest_day": str(datetime.now().date())})

@app.route("/reviews/topics", methods=["GET"])
def get_all_topics():
    topics = {"topics": list(set(map(lambda x: x["topic"], data_manager.retrieve_sample_reviews())))}
    return jsonify(topics)

@app.route("/reviews", methods=["GET"])
def get_reviews():
    start_date, end_date = request.args.get("start-date"), request.args.get("end-date")
    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()
    reviews = []
    for bank in banks:
        reviews.extend(data_manager.retrieve_sample_reviews(start_date=start_date, end_date=end_date, bank=bank))

    return jsonify(reviews)

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
            topic_sentiments[topic] = {sentiment: round(amount / review_count, 3) if review_count != 0 else None for sentiment, amount in topic_sentiments[topic].items()}
        result["bank"] = bank
        result["start_date"] = start_date
        result["end_date"] = end_date
        result["topic_sentiments"] = topic_sentiments
        results.append(result)
    
    return jsonify(results)

@app.route("/reviews/average-rating", methods=["GET"])
def get_average_rating(num_months=None):
    start_date = datetime.strptime(request.args.get("start-date") or "01-08-2022", "%d-%m-%Y").date()
    end_date = datetime.strptime(request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y"), "%d-%m-%Y").date()
    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()
    topic = request.args.get("topic")

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
            reviews = data_manager.retrieve_sample_reviews(start_date=date(earliest_date.year, earliest_date.month, 1).strftime("%d-%m-%Y"), end_date=latest_day.strftime("%d-%m-%Y"), bank=bank, topic=topic)
            for review in reviews:
                month_year = f"{calendar.month_name[review["month"]]} {review["year"]}"
                avg_ratings[month_year] = avg_ratings.get(month_year, [0, 0])
                avg_ratings[month_year][0] += review["rating"]
                avg_ratings[month_year][1] += 1
                avg_ratings["total"][0] += review["rating"]
                avg_ratings["total"][1] += 1

            for rating_period in avg_ratings:
                summed_rating, count = avg_ratings[rating_period]
                avg_ratings[rating_period] = round(summed_rating / count, 3) if count != 0 else None

            sorted_ratings = []
            for year in range(earliest_date.year, latest_day.year + 1):
                for month in range(1, 13):
                    if year == earliest_date.year and month < earliest_date.month:
                        continue
                    if year == latest_day.year and month > latest_day.month:
                        continue
                    month_year = f"{calendar.month_name[month]} {year}"
                    avg_rating = avg_ratings.get(month_year, None)
                    sorted_ratings.append({"period": month_year, "rating": avg_rating})

            result["bank"] = bank
            result["monthly_ratings"] = sorted_ratings
            result["total_rating"] = avg_ratings["total"]
            if topic:
                result["topic"] = topic
            results.append(result)
        
        return jsonify(results)
    
    for bank in banks:
        # Get the coming Sunday
        tracked_date = latest_day + relativedelta(days=(6 - latest_day.weekday()) if latest_day.weekday() != 6 else 0)
        result = {}
        sorted_ratings = []
        total_rating = [0, 0]
        while earliest_date <= tracked_date:
            ratings = [0, 0]
            monday_date = tracked_date - relativedelta(days=6)
            date_string = f"{monday_date.strftime("%d %B %Y")} - {tracked_date.strftime("%d %B %Y")}"
            reviews = data_manager.retrieve_sample_reviews(start_date=monday_date.strftime("%d-%m-%Y"), end_date=tracked_date.strftime("%d-%m-%Y"), bank=bank, topic=topic)
            for review in reviews:
                ratings[0] += review["rating"]
                ratings[1] += 1
                total_rating[0] += review["rating"]
                total_rating[1] += 1
            
            weekly_rating = round(ratings[0] / ratings[1], 3) if ratings[1] != 0 else None
            sorted_ratings.append({"period": date_string, "rating": weekly_rating})

            tracked_date = monday_date - relativedelta(days=1)

        total_rating = total_rating[0] / total_rating[1] if total_rating[1] != 0 else None
        
        result["bank"] = bank
        result["weekly_ratings"] = sorted_ratings[::-1]
        result["total_rating"] = total_rating
        if topic:
            result["topic"] = topic
        results.append(result)

    return jsonify(results)

@app.route("/reviews/latest-average-rating", methods=["GET"])
def get_latest_average_rating():
    earliest_date = datetime(2022, 8, 1)
    num_months = int(request.args.get("months-count") or (datetime.today().year - earliest_date.year) * 12 + (datetime.today().month - earliest_date.month))
    return get_average_rating(num_months)

@app.route("/reviews/average-sentiment", methods=["GET"])
def get_average_sentiment():
    start_date = datetime.strptime(request.args.get("start-date") or "01-08-2022", "%d-%m-%Y").date()
    end_date = datetime.strptime(request.args.get("end-date") or datetime.now().strftime("%d-%m-%Y"), "%d-%m-%Y").date()
    delta = relativedelta(end_date, start_date)
    num_months = delta.years * 12 + delta.months
    latest_day = end_date
    earliest_date = start_date

    banks = request.args.getlist("bank") or data_manager.retrieve_sample_banks()
    topic = request.args.get("topic")

    results = []

    if num_months > 3:
        for bank in banks:
            result = {}
            sentiments = {"total": {"Positive": 0, "Neutral": 0, "Negative": 0}}
            reviews = data_manager.retrieve_sample_reviews(start_date=date(earliest_date.year, earliest_date.month, 1).strftime("%d-%m-%Y"), end_date=latest_day.strftime("%d-%m-%Y"), bank=bank, topic=topic)
            for review in reviews:
                month_year = f"{calendar.month_name[review["month"]]} {review["year"]}"
                sentiments[month_year] = sentiments.get(month_year, {"Positive": 0, "Neutral": 0, "Negative": 0})
                sentiments[month_year][review["sentiment"]] += 1
                sentiments["total"][review["sentiment"]] += 1

            for sentiment_period in sentiments:
                count = sum(sentiments[sentiment_period].values())
                sentiments[sentiment_period] = {period: round(amount / count, 3) if count != 0 else None for period, amount in sentiments[sentiment_period].items()}

            sorted_sentiments = []
            for year in range(earliest_date.year, latest_day.year + 1):
                for month in range(1, 13):
                    if year == earliest_date.year and month < earliest_date.month:
                        continue
                    if year == latest_day.year and month > latest_day.month:
                        continue
                    month_year = f"{calendar.month_name[month]} {year}"
                    sentiment = sentiments.get(month_year, {"Positive": 0, "Neutral": 0, "Negative": 0})
                    sorted_sentiments.append({"period": month_year, "sentiment": sentiment})

            result["bank"] = bank
            result["monthly_sentiments"] = sorted_sentiments
            result["total_sentiments"] = sentiments["total"]
            if topic:
                result["topic"] = topic
            results.append(result)
        
        return jsonify(results)
    
    for bank in banks:
        # Get the coming Sunday
        tracked_date = latest_day + relativedelta(days=(6 - latest_day.weekday()) if latest_day.weekday() != 6 else 0)
        result = {}
        total_sentiment = {"Positive": 0, "Neutral": 0, "Negative": 0}
        sorted_sentiments = []
        while earliest_date <= tracked_date:
            current_sentiment = {"Positive": 0, "Neutral": 0, "Negative": 0}
            monday_date = tracked_date - relativedelta(days=6)
            date_string = f"{monday_date.strftime("%d %B %Y")} - {tracked_date.strftime("%d %B %Y")}"
            reviews = data_manager.retrieve_sample_reviews(start_date=monday_date.strftime("%d-%m-%Y"), end_date=tracked_date.strftime("%d-%m-%Y"), bank=bank, topic=topic)
            for review in reviews:
                current_sentiment[review["sentiment"]] += 1
                total_sentiment[review["sentiment"]] += 1

            count = sum(current_sentiment.values())
            current_sentiment = {period: round(amount / count, 3) if count != 0 else None for period, amount in current_sentiment.items()} if count != 0 else current_sentiment
            sorted_sentiments.append({"period": date_string, "sentiment": current_sentiment})

            tracked_date = monday_date - relativedelta(days=1)

        total_count = sum(total_sentiment.values())
        total_sentiment = {period: round(amount / total_count, 3) if count != 0 else None for period, amount in total_sentiment.items()} if total_count != 0 else total_sentiment
        
        result["bank"] = bank
        result["weekly_sentiments"] = sorted_sentiments[::-1]
        result["total_sentiments"] = total_sentiment
        if topic:
            result["topic"] = topic
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
    
    topics = get_all_topics().get_json()["topics"]
    topics_data = {}
    with app.test_request_context('/reviews/average-rating', query_string=request_args):
        general_data = json.dumps(get_average_rating().get_json())

    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = json.dumps(get_average_rating().get_json())
            topics_data[topic] = topic_data
    
    insights = inquirer.get_insights(general_data=general_data, topics_data=topics_data)
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
    
    topics = get_all_topics().get_json()["topics"]
    gxs_topics_data = {}
    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = json.dumps(get_average_rating().get_json())
            gxs_topics_data[topic] = topic_data

    request_args["bank"] = compared_bank
    other_bank_topics_data = {}
    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = json.dumps(get_average_rating().get_json())
            other_bank_topics_data[topic] = topic_data
        
    comparison = inquirer.get_comparison(gxs_topics_data=gxs_topics_data, other_bank=compared_bank, other_bank_topics_data=other_bank_topics_data)
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
    
    topics = get_all_topics().get_json()["topics"]
    topics_data = {}

    for topic in topics:
        request_args["topic"] = topic
        with app.test_request_context('/reviews/average-rating', query_string=request_args):
            topic_data = json.dumps(get_average_rating().get_json())
            topics_data[topic] = topic_data
    
    suggestions = inquirer.get_suggestions(topics_data=topics_data)
    return jsonify({"suggestions": suggestions})

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
        sentiments[sentiment] = round(sentiments[sentiment] / total_count, 3)  if total_count != 0 else None

    colour = {"Positive": "teal.6", "Neutral": "yellow.6", "Negative": "red.6"}
    data = []
    for sentiment, percentage in sentiments.items():
        data.append({"name": sentiment, "value": percentage, "color": colour[sentiment], "start_date": start_date, "end_date": end_date})
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001)
