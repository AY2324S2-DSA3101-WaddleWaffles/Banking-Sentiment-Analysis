import calendar

class DataProcessor:
    """
    A class for processing review data.
    """

    def get_topics(self, data):
        """
        Extracts unique topics from the provided data.

        Args:
            data (list): List of dictionaries containing review data.

        Returns:
            dict: A dictionary containing unique topics extracted from the data.
        """
        topics = {"topics": list(set(map(lambda x: x["topic"], data)))}
        return topics
    
    def get_topic_sentiments(self, data, start_date, end_date, bank):
        """
        Calculates sentiment distribution for each topic within a specified date range.

        Args:
            data (list): List of dictionaries containing review data.
            start_date (datetime.date): Start date of the analysis period.
            end_date (datetime.date): End date of the analysis period.
            bank (str): Name of the bank.

        Returns:
            dict: A dictionary containing sentiment distribution for each topic.
        """
        result = {}
        topic_sentiments = {}
        for review in data:
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

        return result
    
    def get_monthly_avg_rating(self, data, start_date, end_date, bank, topic):
        """
        Calculates the monthly average rating for reviews within a specified date range.

        Args:
            data (list): List of dictionaries containing review data.
            start_date (datetime.date): Start date of the analysis period.
            end_date (datetime.date): End date of the analysis period.
            bank (str): Name of the bank.
            topic (str): Optional topic to filter the analysis.

        Returns:
            dict: A dictionary containing the monthly average rating.
        """
        result = {}
        avg_ratings = {"total": [0, 0]}
        for review in data:
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
        for year in range(start_date.year, end_date.year + 1):
            for month in range(1, 13):
                if year == start_date.year and month < start_date.month:
                    continue
                if year == end_date.year and month > end_date.month:
                    continue
                month_year = f"{calendar.month_name[month]} {year}"
                avg_rating = avg_ratings.get(month_year, None)
                sorted_ratings.append({"period": month_year, "rating": avg_rating})

        result["bank"] = bank
        result["ratings"] = sorted_ratings
        result["total_rating"] = avg_ratings["total"]
        if topic:
            result["topic"] = topic
        
        return result
    
    def aggregate_weekly_avg_rating(self, data, monday_date, tracked_date):
        """
        Aggregates weekly average rating from the provided data.

        Args:
            data (list): List of dictionaries containing review data.
            monday_date (datetime.date): Monday date of the week.
            tracked_date (datetime.date): Tracked date of the week.

        Returns:
            tuple: A tuple containing aggregated weekly average rating and total ratings.
        """
        total_ratings = [0, 0]
        date_string = f"{monday_date.strftime("%d %B %Y")} - {tracked_date.strftime("%d %B %Y")}"
        for review in data:
            total_ratings[0] += review["rating"]
            total_ratings[1] += 1
        
        weekly_rating = round(total_ratings[0] / total_ratings[1], 3) if total_ratings[1] != 0 else None
        result = {"period": date_string, "rating": weekly_rating}
        return result, total_ratings

    def get_monthly_avg_sentiment(self, data, start_date, end_date, bank, topic):
        """
        Calculates the monthly average sentiment for reviews within a specified date range.

        Args:
            data (list): List of dictionaries containing review data.
            start_date (datetime.date): Start date of the analysis period.
            end_date (datetime.date): End date of the analysis period.
            bank (str): Name of the bank.
            topic (str): Optional topic to filter the analysis.

        Returns:
            dict: A dictionary containing the monthly average sentiment.
        """
        result = {}
        sentiments = {"total": {"Positive": 0, "Neutral": 0, "Negative": 0}}
        for review in data:
            month_year = f"{calendar.month_name[review["month"]]} {review["year"]}"
            sentiments[month_year] = sentiments.get(month_year, {"Positive": 0, "Neutral": 0, "Negative": 0})
            sentiments[month_year][review["sentiment"]] += 1
            sentiments["total"][review["sentiment"]] += 1

        for sentiment_period in sentiments:
            count = sum(sentiments[sentiment_period].values())
            sentiments[sentiment_period] = {period: round(amount / count, 3) if count != 0 else None for period, amount in sentiments[sentiment_period].items()}

        sorted_sentiments = []
        for year in range(start_date.year, end_date.year + 1):
            for month in range(1, 13):
                if year == start_date.year and month < start_date.month:
                    continue
                if year == end_date.year and month > end_date.month:
                    continue
                month_year = f"{calendar.month_name[month]} {year}"
                sentiment = sentiments.get(month_year, {"Positive": 0, "Neutral": 0, "Negative": 0})
                sorted_sentiments.append({"period": month_year, "sentiment": sentiment})

        result["bank"] = bank
        result["sentiments"] = sorted_sentiments
        result["total_sentiments"] = sentiments["total"]
        if topic:
            result["topic"] = topic

        return result
    
    def aggregate_weekly_avg_sentiment(self, data, monday_date, tracked_date):
        """
        Aggregates weekly average sentiment from the provided data.

        Args:
            data (list): List of dictionaries containing review data.
            monday_date (datetime.date): Monday date of the week.
            tracked_date (datetime.date): Tracked date of the week.

        Returns:
            tuple: A tuple containing aggregated weekly average sentiment and total sentiment.
        """
        total_sentiment = {"Positive": 0, "Neutral": 0, "Negative": 0}
        date_string = f"{monday_date.strftime("%d %B %Y")} - {tracked_date.strftime("%d %B %Y")}"
        for review in data:
            total_sentiment[review["sentiment"]] += 1

        count = sum(total_sentiment.values())
        total_sentiment = {period: round(amount / count, 3) if count != 0 else None for period, amount in total_sentiment.items()} if count != 0 else total_sentiment
        result = {"period": date_string, "sentiment": total_sentiment}
        return result, total_sentiment

    def get_weekly_avg_sentiment(self, sorted_sentiments, all_summed_sentiments, bank, topic):
        """
        Calculates the weekly average sentiment for reviews.

        Args:
            sorted_sentiments (list): List of sorted sentiments.
            all_summed_sentiments (list): List of dictionaries containing summed sentiments.
            bank (str): Name of the bank.
            topic (str): Optional topic to filter the analysis.

        Returns:
            dict: A dictionary containing the weekly average sentiment.
        """
        result = {}
        total_sentiment = {"Positive": 0, "Neutral": 0, "Negative": 0}
        for summed_sentiments in all_summed_sentiments:
            for sentiment, value in summed_sentiments.items():
                total_sentiment[sentiment] += value

        total_count = sum(total_sentiment.values())
        total_sentiment = {period: round(amount / total_count, 3) if total_count != 0 else None for period, amount in total_sentiment.items()} if total_count != 0 else total_sentiment
        result["bank"] = bank
        result["sentiments"] = sorted_sentiments[::-1]
        result["total_sentiments"] = total_sentiment
        if topic:
            result["topic"] = topic
        return result
    
    def get_word_associations(self, data, start_date, end_date, bank):
        """
        Extracts top association words for each topic.

        Args:
            data (list): List of dictionaries containing review data.
            start_date (datetime.date): Start date of the analysis period.
            end_date (datetime.date): End date of the analysis period.
            bank (str): Name of the bank.

        Returns:
            dict: A dictionary containing top association words for each topic.
        """
        result = {}
        associations = {}
        for review in data:
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
        return result
    
    def get_review_counts(self, data, start_date, end_date, bank):
        """
        Calculates the total count of reviews within a specified date range.

        Args:
            data (list): List of dictionaries containing review data.
            start_date (datetime.date): Start date of the analysis period.
            end_date (datetime.date): End date of the analysis period.
            bank (str): Name of the bank.

        Returns:
            dict: A dictionary containing the total count of reviews.
        """
        review_counts = len(data)
        result = {"start_date": start_date, "end_date": end_date, "bank": bank, "count":review_counts}
        return result
    
    def get_donut_data(self, data, start_date, end_date):
        """
        Prepares data for creating a donut chart based on sentiment distribution.

        Args:
            data (list): List of dictionaries containing review data.
            start_date (datetime.date): Start date of the analysis period.
            end_date (datetime.date): End date of the analysis period.

        Returns:
            list: A list containing data for creating a donut chart.
        """
        sentiments = {"Positive": 0, "Neutral": 0, "Negative": 0}
        for review in data:
            sentiment = review["sentiment"]
            sentiments[sentiment] += 1

        total_count = sum(sentiments.values())
        for sentiment in sentiments:
            sentiments[sentiment] = round(sentiments[sentiment] / total_count, 3)  if total_count != 0 else None

        colour = {"Positive": "teal.6", "Neutral": "yellow.6", "Negative": "red.6"}
        data = []
        for sentiment, percentage in sentiments.items():
            data.append({"name": sentiment, "value": percentage, "color": colour[sentiment], "start_date": start_date, "end_date": end_date})
        
        return data
    