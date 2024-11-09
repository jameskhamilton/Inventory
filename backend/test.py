from mongoengine import connect
from models import Stock  # Assuming Stock is your MongoEngine model
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Get MongoDB URI from environment variables
mongo_uri = os.getenv('MONGO_URI')  # Make sure the .env file is correctly set

# Connect to MongoDB
connect(host=mongo_uri)

# Manually create and save a document to the database
stock = Stock(
    item_name="Item A",
    supplier="Supplier A",
    quantity=100,
    cost=15.50
)
stock.save()

# If successful, the stock document will be saved to MongoDB
print("Stock saved to MongoDB!")
