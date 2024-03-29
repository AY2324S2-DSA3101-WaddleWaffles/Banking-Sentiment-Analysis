from datetime import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import certifi

class DataManager:
    """
    A class to manage data operations for MongoDB.

    Attributes:
        uri_generator (function): A lambda function to generate MongoDB connection URI.
        client (MongoClient): MongoDB client instance.
    """

    def __init__(self, username, password):
        """
        Initialises the DataManager with a MongoDB client instance.

        Args:
            username (str): MongoDB username.
            password (str): MongoDB password.
        """

        self.uri_generator = lambda username, password: f"mongodb+srv://{username}:{password}@modellingcluster.2u0hsbw.mongodb.net/" \
                                                        "?retryWrites=true&w=majority&appName=ModellingCluster"

        self.client = MongoClient(self.uri_generator(username=username, password=password), server_api=ServerApi("1"), tlsCAFile=certifi.where())

    def upload_reviews(self, reviews):
        """
        Uploads reviews to the MongoDB database.

        Args:
            reviews (list): A list of review documents to be uploaded.
        """

        responses = self.client["reviews"]["responses"]
        responses.insert_many(reviews)
        return

    def update_miscellaneous(self, source, type, data, insert=False):
        """
        Updates or inserts miscellaneous data into the specified collection.

        Args:
            source (str): The source collection name.
            type (str): The type of data.
            data (dict): The data to be updated or inserted.
            insert (bool, optional): If True, insert data; otherwise, update existing data. Defaults to False.
        """

        collection = self.client[f"{source}misc"][type]

        if insert:
            collection.insert_one(data)
            return
        
        collection.update_one({}, data)
        return
    
    def retrieve_reviews(self, **kwargs):
        """
        Retrieves reviews from the MongoDB database based on provided query parameters.

        Keyword Args:
            **kwargs: Arbitrary keyword arguments representing query parameters.

        Returns:
            list: A list of retrieved review documents.
        """

        collection = self.client["reviews"]["responses"]
        reviews = [doc for doc in collection.find(kwargs, {"_id": 0})]
        return reviews
    
    def retrieve_periodical_reviews(self, start_date=None, end_date=None):
        """
        Retrieves reviews from a specified period.

        Args:
            start_date (str, optional): The start date in "DD-MM-YYYY" format. Defaults to None.
            end_date (str, optional): The end date in "DD-MM-YYYY" format. Defaults to None.

        Returns:
            list: A list of retrieved review documents.
        """

        collection = self.client["reviews"]["responses"]
        today = datetime.now()
        start_day, start_month, start_year = (map(int, start_date.split("-")) if start_date else (1, 1, 1900))
        end_day, end_month, end_year = (map(int, end_date.split("-")) if end_date else (today.day, today.month, today.year))

        query = {
            "$and": [{
                    "$or": [
                        {"year": {"$gt": start_year}},
                        {"year": start_year, "month": {"$gt": start_month}},
                        {"year": start_year, "month": start_month, "day": {"$gt": start_day}},
                        {"year": start_year, "month": start_month, "day": start_day}
                    ]
                },
                {
                    "$or": [
                        {"year": {"$lt": end_year}},
                        {"year": end_year, "month": {"$lt": end_month}},
                        {"year": end_year, "month": end_month, "day": {"$lt": end_day}},
                        {"year": end_year, "month": end_month, "day": end_day}
                    ]
                }
            ]
        }

        reviews = [doc for doc in collection.find(query, {"_id": 0})]
        return reviews
 
    def retrieve_miscellaneous(self, source, type):
        """
        Retrieves miscellaneous data from the specified source collection and type.

        Args:
            source (str): The source collection name.
            type (str): The type of data.

        Returns:
            dict: Retrieved miscellaneous data.
        """

        collection = self.client[f"{source}misc"][type]
        return collection.find_one({}, {"_id": 0})

    def close_connection(self):
        """Closes the MongoDB client connection."""

        self.client.close()
        return
