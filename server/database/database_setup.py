"""
Script for initialising a MongoDB database with customer banking feedback.
Please note: This code should not be run again and is kept for tracking purposes.
"""

from datasets import load_dataset
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import certifi
import os
import pandas as pd

def initialise_database():
    """
    Downloads customer banking feedback from HuggingFace,
    saves it as a CSV file, and initialises the MongoDB database.
    """
    # Download customer banking feedback from HuggingFace
    customer_feedback = pd.DataFrame(load_dataset("TrainingDataPro/customers-reviews-on-banks")["train"])

    # Save a copy of the dataset as a CSV file
    customer_feedback.to_csv("customer_feedback.csv", index=False)

    # Load variables from .env file
    load_dotenv()

    # Access the loaded variables
    username, password = os.getenv("DATABASE_USERNAME"), os.getenv("DATABASE_PASSWORD")

    # Set resource identifier to connect to MongoDB Atlas
    uri = f"mongodb+srv://{username}:{password}@modellingcluster.2u0hsbw.mongodb.net/" \
          "?retryWrites=true&w=majority&appName=ModellingCluster"

    # Connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())

    # Access the database and collection
    db = client["customerfeedback"]
    collection = db["responses"]

    # Insert data into MongoDB
    records_to_insert = customer_feedback.to_dict(orient='records')
    collection.insert_many(records_to_insert)

    print("Database has been successfully initialised with the customer feedback.")

    # Close the MongoDB connection
    client.close()

# Execute the database initialization process
if __name__ == "__main__":
    initialise_database()
