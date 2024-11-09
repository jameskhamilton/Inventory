from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data
users = []

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/users', methods=['POST'])
def add_user():
    user_data = request.json
    users.append(user_data)
    return jsonify(user_data), 201

@app.route('/')
def home():
    return "Flask backend running!"

if __name__ == '__main__':
    app.run(debug=True)
