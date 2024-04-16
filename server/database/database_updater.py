from explainer.explainer import Explainer
from models.sentiment_analysis_model import SentimentAnalysisModel
from models.topic_model import TopicModel
from scraper.scrape_pipeline import ScrapePipeline

class DatabaseUpdater:
    """Class for updating the database with new reviews and metadata.

    Attributes:
        data_manager (DataManager): An instance of DataManager to manage database interactions.
        scrape_pipeline (ScrapePipeline): An instance of ScrapePipeline to scrape new reviews.
        sentiment_model (SentimentAnalysisModel): An instance of SentimentAnalysisModel for sentiment analysis.
        explainer (Explainer): An instance of Explainer for explaining sentiment predictions.
        topic_model (TopicModel): An instance of TopicModel for topic modeling.
    """

    def __init__(self, data_manager):
        """Initialise the DatabaseUpdater with a DataManager instance."""

        self.data_manager = data_manager
        self.scrape_pipeline = ScrapePipeline(data_manager)
        self.sentiment_model = SentimentAnalysisModel()
        self.explainer = Explainer(self.sentiment_model.pipe)
        self.topic_model = TopicModel(["login", "interface", "stability", "update", "notifications", "speed", "service", "functions", "security"])

    def update_database(self):
        """Update the database with new reviews and metadata.

        Returns:
            bool: True if the database is successfully updated, False otherwise.
        """

        print(".............SCRAPING NEW REVIEWS..............")
        new_reviews, playstore_datetime, appstore_datetime = self.scrape_pipeline.scrape_new_reviews()

        if new_reviews.empty:
            return False

        print(".............RUNNING SENTIMENT MODEL..............")
        sentiments = self.sentiment_model.get_sentiment(new_reviews["review"].to_list())
        new_reviews["sentiment"] = [max(sentiment, key=sentiment.get) for sentiment in sentiments]

        print(".............RUNNING TOPIC MODEL..............")
        print(new_reviews["review"].to_list())
        topics = self.topic_model.get_topic(new_reviews["review"].to_list())
        print(topics["Predicted Topic"])
        new_reviews["topic"] = topics["Predicted Topic"]
        print(new_reviews["topic"])
        return True
        print(".............RUNNING EXPLAINER MODEL..............")
        associations = [list(dict.fromkeys(self.explainer.get_keywords(new_reviews.iloc[i]["review"], new_reviews.iloc[i]["sentiment"])))[:3] for i in range(new_reviews.shape[0])]
        new_reviews["associations"] = associations

        new_reviews['bank'] = new_reviews['bank'].replace('MARIBANK', 'MariBank')
        new_reviews['bank'] = new_reviews['bank'].replace('TRUST', 'Trust')
        print(playstore_datetime, appstore_datetime)
        print(new_reviews)
        # self.data_manager.upload_reviews(new_reviews.to_dict(orient='records'))
        # self.data_manager.update_misc("playstore", "datetime", {"$set": {"latestdate": playstore_datetime.strftime("%Y-%m-%d %H:%M:%S")}})
        # self.data_manager.update_misc("appstore", "datetime", {"$set": {"latestdate": appstore_datetime.strftime("%Y-%m-%d %H:%M:%S")}})

        return True

