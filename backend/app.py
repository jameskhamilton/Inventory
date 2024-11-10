from flask import Flask, jsonify, request
from flask_cors import CORS
from mongoengine import connect
from models import Stock
from dotenv import load_dotenv
import os

app = Flask(__name__)

if os.getenv("FLASK_ENV") == "production":
    CORS(app, origins=["http://localhost:3000/"])
else:
    CORS(app)

# Load .env file
load_dotenv()

# Get MongoDB URI from environment variables
mongo_uri = os.getenv('MONGO_URI')  # Make sure the .env file is correctly set

# Connect to MongoDB
connect(host=mongo_uri)

@app.route('/api/add_stock', methods=['POST'])
def add_stock():
    data = request.json
    try:
        # Create a new stock entry based on request data
        stock = Stock(
            item_name=data['item_name'],
            supplier=data['supplier'],
            quantity=data['quantity'],
            cost=data['cost']
        )
        stock.save()
        return jsonify({"message": "Stock added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/')
def home():
    return "Flask backend running!"

if __name__ == '__main__':
    app.run(debug=True)
