from datetime import datetime
from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample data
customer_reviews = [
    {"id": 1, "year": 2023, "month": 5, "day": 15, "bank": "GXS", "title": "Excellent Service", "review": "I am very satisfied with the service provided by GXS. The staff is friendly and helpful.", "rating": 5, "sentiment": "pos", "topic": "support", "source": "google-play-store"},
    {"id": 2, "year": 2023, "month": 6, "day": 20, "bank": "OCBC", "title": "Great Experience", "review": "OCBC has exceeded my expectations. Their online banking system is user-friendly and efficient.", "rating": 4, "sentiment": "pos", "topic": "features", "source": "app-store"},
    {"id": 3, "year": 2023, "month": 7, "day": 10, "bank": "GXS", "title": "Disappointing Service", "review": "I had a terrible experience at GXS. The staff was unhelpful and rude.", "rating": 1, "sentiment": "neg", "topic": "support", "source": "google-play-store"},
    {"id": 4, "year": 2023, "month": 8, "day": 5, "bank": "OCBC", "title": "Poor Online System", "review": "The online banking system of OCBC is slow and often crashes. Not recommended.", "rating": 2, "sentiment": "neg", "topic": "features", "source": "app-store"},
    {"id": 5, "year": 2023, "month": 9, "day": 1, "bank": "GXS", "title": "Account Closure Issue", "review": "I tried to close my account with GXS, but the process was tedious and took weeks to complete.", "rating": 2, "sentiment": "neg", "topic": "billing", "source": "google-play-store"},
    {"id": 6, "year": 2023, "month": 10, "day": 15, "bank": "UOB", "title": "Security Concerns", "review": "I'm worried about the security of my account with UOB. There have been reports of unauthorized transactions.", "rating": 3, "sentiment": "neu", "topic": "security", "source": "app-store"},
    {"id": 7, "year": 2023, "month": 11, "day": 20, "bank": "GXS", "title": "Great Mobile App", "review": "GXS's mobile app is fantastic! It's user-friendly and has all the features I need.", "rating": 5, "sentiment": "pos", "topic": "features", "source": "google-play-store"},
    {"id": 8, "year": 2023, "month": 12, "day": 25, "bank": "UOB", "title": "Billing Issue Resolved", "review": "I had a billing issue with UOB, but their customer support team was quick to resolve it. Great service!", "rating": 4, "sentiment": "pos", "topic": "billing", "source": "app-store"},
    {"id": 9, "year": 2024, "month": 1, "day": 5, "bank": "GXS", "title": "Improvement Needed", "review": "GXS needs to improve its online banking system. It's outdated and not user-friendly.", "rating": 2, "sentiment": "neg", "topic": "features", "source": "google-play-store"},
    {"id": 10, "year": 2024, "month": 2, "day": 10, "bank": "UOB", "title": "Unresponsive Customer Support", "review": "I contacted UOB's customer support multiple times, but they never responded. Very disappointed.", "rating": 1, "sentiment": "neg", "topic": "support", "source": "app-store"},
]

def is_within_time_period(review, start_date, end_date):
    # Parse start_date and end_date strings into datetime objects
    start_datetime = datetime.strptime(start_date, "%d-%m-%Y")
    end_datetime = datetime.strptime(end_date, "%d-%m-%Y")
    
    # Parse review date into datetime object
    review_datetime = datetime(review["year"], review["month"], review["day"])
    
    return start_datetime <= review_datetime <= end_datetime    

def filter_reviews_by_features(filters, customer_reviews=customer_reviews):
    filtered_reviews = []
    for review in customer_reviews:
        remove = False  
        for key, value in filters.items():
            if review[key] != value:
                remove = True
                break
        if not remove:
            filtered_reviews.append(review)
    return filtered_reviews



# Route to get all customer reviews
# `/api/reviews?start_date=${startDate}&end_date=${endDate}`
@app.route("/api/reviews", methods=["GET"])
def get_reviews():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    filtered_reviews = customer_reviews
    if start_date and end_date:
        filtered_reviews = [review for review in customer_reviews if is_within_time_period(review, start_date, end_date)]
    elif start_date or end_date:
        return jsonify({"error": "Please provide none or both start_date and end_date parameters"}), 400
    
    filters = {
        "bank": request.args.get("bank"),
        "topic": request.args.get("topic"),
        "source": request.args.get("source"),
        "sentiment": request.args.get("sentiment")
    }
    filters = {key: value for key, value in filters.items() if value}
    filtered_reviews = filter_reviews_by_features(filters, filtered_reviews)

    return jsonify(filtered_reviews)

@app.route("/api/reviews/counts", methods=["GET"])
def get_review_count():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    filtered_reviews = customer_reviews
    if start_date and end_date:
        filtered_reviews = [review for review in customer_reviews if is_within_time_period(review, start_date, end_date)]
    elif start_date or end_date:
        return jsonify({"error": "Please provide none or both start_date and end_date parameters"}), 400
    filters = {
        "bank": request.args.get("bank"),
        "topic": request.args.get("topic"),
        "source": request.args.get("source"),
        "sentiment": request.args.get("sentiment")
    }
    filters = {key: value for key, value in filters.items() if value}

    filtered_reviews = filter_reviews_by_features(filters)
    return jsonify({"review_count": len(filtered_reviews)})

@app.route("/api/reviews/sentiment", methods=["GET"])
def get_sentiment_count():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    filtered_reviews = customer_reviews
    if start_date and end_date:
        filtered_reviews = [review for review in customer_reviews if is_within_time_period(review, start_date, end_date)]
    elif start_date or end_date:
        return jsonify({"error": "Please provide none or both start_date and end_date parameters"}), 400
    filters = {
        "bank": request.args.get("bank"),
        "topic": request.args.get("topic"),
        "source": request.args.get("source"),
    }
    filters = {key: value for key, value in filters.items() if value}
    filtered_reviews = filter_reviews_by_features(filters)
    sentiment_counts = {"pos": 0, "neg": 0, "neu": 0}

    for review in filtered_reviews:
        sentiment_counts[review["sentiment"]] += 1
    return jsonify({"sentiment_counts": sentiment_counts})

@app.route("/api/reviews/rating", methods=["GET"])
def get_average_rating():
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    filtered_reviews = customer_reviews
    if start_date and end_date:
        filtered_reviews = [review for review in customer_reviews if is_within_time_period(review, start_date, end_date)]
    elif start_date or end_date:
        return jsonify({"error": "Please provide none or both start_date and end_date parameters"}), 400
    filters = {
        "bank": request.args.get("bank"),
        "topic": request.args.get("topic"),
        "source": request.args.get("source"),
        "sentiment": request.args.get("sentiment")
    }
    filters = {key: value for key, value in filters.items() if value}
    filtered_reviews = filter_reviews_by_features(filters)
    rating_sum = 0
    for review in filtered_reviews:
        rating_sum += review["rating"]
    return jsonify({"average_rating": rating_sum/len(filtered_reviews) if len(filtered_reviews) != 0 else "nil"})


if __name__ == "__main__":
    app.run(port=5001)
