from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from config import Config  # Import the Config class

app = Flask(__name__)

# Load the configuration from config.py
app.config.from_object(Config)

# Initialize the database
db = SQLAlchemy(app)

# Define a simple User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'

# Create the database tables before the first request
@app.before_first_request
def create_tables():
    db.create_all()

# Route to get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email} for user in users])

# Route to add a new user
@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User added successfully!'}), 201

# Basic route to check the app
@app.route('/')
def index():
    return 'Welcome to the Flask + PostgreSQL App!'

if __name__ == '__main__':
    app.run(debug=True)
